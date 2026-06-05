import { PageShell } from "@/components/PageShell";
import { PublicBlogDetail } from "@/components/PublicBlogDetail";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PageShell
      eyebrow="Article"
      title="TPAP Insights"
      description="Research, analysis, and commentary on taxation, public finance, taxpayer rights, and Pakistan's economic policy."
    >
      <PublicBlogDetail slug={slug} />
    </PageShell>
  );
}
