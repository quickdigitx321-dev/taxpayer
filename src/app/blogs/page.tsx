import { PageShell } from "@/components/PageShell";
import { PublicBlogsList } from "@/components/PublicBlogsList";
import { SectionHeading } from "@/components/SectionHeading";

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs & Articles"
      title="Insights and updates for members, taxpayers, and the public."
      description="Published articles are managed from the TPAP admin dashboard."
    >
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest Articles"
            title="Published updates, insights, and public information."
          />
          <PublicBlogsList />
        </div>
      </section>
    </PageShell>
  );
}
