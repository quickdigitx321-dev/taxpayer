import { PageShell } from "@/components/PageShell";

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Contribute to Pakistan's taxpayer advocacy movement."
      description="TPAP welcomes economists, policy analysts, legal experts, researchers, communicators, students, and professionals who share its commitment to fair taxation and accountable governance."
    >
      <section className="py-24">
        <div className="container-shell max-w-3xl text-sm leading-7 text-charcoal-700">
          <p>Opportunities may include research, policy competitions, fellowships, taxpayer education, advocacy communications, and regional chapter engagement.</p>
          <p className="mt-6">Send career and fellowship inquiries through the official Contact page.</p>
        </div>
      </section>
    </PageShell>
  );
}
