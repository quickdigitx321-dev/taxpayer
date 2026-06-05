import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function MediaPressPage() {
  return (
    <PageShell
      eyebrow="Media & Press"
      title="Expert commentary on taxation and fiscal policy."
      description="For press statements, interview requests, expert commentary, or media partnership inquiries, contact TPAP's communications team."
    >
      <section className="py-24">
        <div className="container-shell max-w-3xl">
          <p className="text-sm leading-7 text-charcoal-700">TPAP aims to respond to media queries within 4 business hours. Our policy and research team contributes evidence-based perspectives on tax reform, public finance, business regulation, fiscal transparency, and government accountability.</p>
          <a href="mailto:media@tpap.org.pk" className="mt-7 inline-block text-sm font-bold text-forest-800">media@tpap.org.pk</a>
          <div className="mt-8"><Link href="/blogs" className="rounded-full bg-forest-950 px-6 py-3 text-sm font-bold text-white">Read TPAP Insights</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
