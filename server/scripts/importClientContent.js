require("dotenv").config();

const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");
const { pool } = require("../config/db");

const documentPath = path.join(process.cwd(), "TPAP_Website_Content.docx");

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function readParagraphs() {
  const zip = new AdmZip(documentPath);
  const xml = zip.readAsText("word/document.xml");

  return [...xml.matchAll(/<w:p\b[\s\S]*?<\/w:p>/g)]
    .map(([paragraph]) =>
      [...paragraph.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)]
        .map((match) => decodeXml(match[1]))
        .join("")
        .trim()
    )
    .filter(Boolean);
}

function valueAfterPrefix(lines, prefix) {
  return lines.find((line) => line.startsWith(prefix))?.slice(prefix.length).trim() || "";
}

function articleCategory(title) {
  const value = title.toLowerCase();
  if (value.includes("sme") || value.includes("entrepreneur")) return "SME Development";
  if (value.includes("spending") || value.includes("inefficiency")) return "Government Accountability";
  if (value.includes("transparency")) return "Fiscal Transparency";
  if (value.includes("investment") || value.includes("growth")) return "Investment Climate";
  if (value.includes("business")) return "Ease of Doing Business";
  if (value.includes("rights")) return "Taxpayer Rights";
  return "Tax Reforms";
}

function toMarkdown(lines) {
  return lines
    .map((line, index) => {
      if (line.startsWith("TPAP Membership CTA:")) {
        return `> ${line}`;
      }

      const looksLikeHeading =
        index > 0 &&
        line.length < 90 &&
        !/[.!?:]$/.test(line) &&
        !line.startsWith("[");

      return looksLikeHeading ? `## ${line}` : line;
    })
    .join("\n\n");
}

function parseArticles(paragraphs) {
  const start = paragraphs.findIndex((line) => line.startsWith("SECTION 12"));
  const articleLines = paragraphs.slice(start + 1);
  const starts = articleLines
    .map((line, index) => (/^Article \d+$/.test(line) ? index : -1))
    .filter((index) => index >= 0);

  return starts.map((articleStart, index) => {
    const block = articleLines.slice(articleStart + 1, starts[index + 1] ?? articleLines.length);
    const seoTitle = valueAfterPrefix(block, "SEO Title:");
    const seoDescription = valueAfterPrefix(block, "Meta Description:");
    const focusKeyword = valueAfterPrefix(block, "Focus Keyword:");
    const slug = valueAfterPrefix(block, "URL Slug:").replace(/^\/blog\//, "");
    const excerpt = valueAfterPrefix(block, "Excerpt:");
    const titleIndex = block.findIndex((line) => line === seoTitle);
    const contentLines = block.slice(titleIndex + 1);

    return {
      title: seoTitle,
      slug,
      excerpt,
      content: toMarkdown(contentLines),
      category: articleCategory(seoTitle),
      seoTitle,
      seoDescription,
      focusKeyword
    };
  });
}

function sqlValue(value) {
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function appendArticlesToSchema(articles) {
  const schemaPath = path.join(process.cwd(), "database", "schema.sql");
  const startMarker = "-- CLIENT ARTICLE CONTENT START";
  const endMarker = "-- CLIENT ARTICLE CONTENT END";
  const current = fs.readFileSync(schemaPath, "utf8");
  const withoutExisting = current.includes(startMarker)
    ? current.slice(0, current.indexOf(startMarker)).trimEnd()
    : current.trimEnd();
  const statements = articles
    .map(
      (article) => `INSERT INTO blogs
  (title, slug, excerpt, content, category, seo_title, seo_description, focus_keyword, status, published_at)
VALUES
  (${sqlValue(article.title)}, ${sqlValue(article.slug)}, ${sqlValue(article.excerpt)}, ${sqlValue(article.content)}, ${sqlValue(article.category)}, ${sqlValue(article.seoTitle)}, ${sqlValue(article.seoDescription)}, ${sqlValue(article.focusKeyword)}, 'published', NOW())
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  excerpt = VALUES(excerpt),
  content = VALUES(content),
  category = VALUES(category),
  seo_title = VALUES(seo_title),
  seo_description = VALUES(seo_description),
  focus_keyword = VALUES(focus_keyword),
  status = 'published';`
    )
    .join("\n\n");

  fs.writeFileSync(
    schemaPath,
    `${withoutExisting}\n\n${startMarker}\n${statements}\n${endMarker}\n`,
    "utf8"
  );
}

async function ensureFocusKeywordColumn() {
  try {
    await pool.execute("ALTER TABLE blogs ADD COLUMN focus_keyword VARCHAR(220) NULL AFTER seo_description");
  } catch (error) {
    if (error.code !== "ER_DUP_FIELDNAME") throw error;
  }
}

async function importArticles() {
  const articles = parseArticles(readParagraphs());

  if (articles.length !== 15) {
    throw new Error(`Expected 15 client articles but found ${articles.length}.`);
  }

  if (process.argv.includes("--append-schema")) {
    appendArticlesToSchema(articles);
    console.log(`Embedded ${articles.length} client-approved articles in database/schema.sql.`);
    await pool.end();
    return;
  }

  if (process.argv.includes("--dry-run")) {
    console.log(`Validated ${articles.length} client-approved articles.`);
    console.log(articles.map((article) => `${article.slug}: ${article.title}`).join("\n"));
    await pool.end();
    return;
  }

  await ensureFocusKeywordColumn();

  for (const article of articles) {
    await pool.execute(
      `INSERT INTO blogs
        (title, slug, excerpt, content, category, seo_title, seo_description, focus_keyword, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', NOW())
       ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        excerpt = VALUES(excerpt),
        content = VALUES(content),
        category = VALUES(category),
        seo_title = VALUES(seo_title),
        seo_description = VALUES(seo_description),
        focus_keyword = VALUES(focus_keyword),
        status = 'published'`,
      [
        article.title,
        article.slug,
        article.excerpt,
        article.content,
        article.category,
        article.seoTitle,
        article.seoDescription,
        article.focusKeyword
      ]
    );
  }

  console.log(`Imported ${articles.length} client-approved articles.`);
  await pool.end();
}

importArticles().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
