import { PageShell } from "@/components/PageShell";

export default function TermsOfUsePage() {
  return (
    <PageShell
      eyebrow="Terms of Use"
      title="Using TPAP's public information and services."
      description="TPAP provides research, public education, advocacy information, membership applications, and complaint-support channels."
    >
      <section className="py-24">
        <div className="container-shell max-w-3xl space-y-7 text-sm leading-7 text-charcoal-700">
          <p>TPAP content is provided for public education and advocacy. It should not be treated as a substitute for advice from a qualified tax lawyer, accountant, or other professional.</p>
          <p>Users submitting information must provide accurate details and must not misuse TPAP forms, publications, or public communication channels.</p>
          <p>TPAP may update these terms as its programmes and public services develop.</p>
        </div>
      </section>
    </PageShell>
  );
}
