import { PageShell } from "@/components/PageShell";

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Privacy Policy"
      title="Your information deserves careful protection."
      description="TPAP handles membership, complaint, and inquiry information confidentially and uses it only for the purpose for which it was submitted."
    >
      <section className="py-24">
        <div className="container-shell max-w-3xl space-y-7 text-sm leading-7 text-charcoal-700">
          <p>Member information is kept strictly confidential and used only for communication, engagement, and advocacy purposes. TPAP does not share member data with third parties, including government bodies.</p>
          <p>Complaint information is never shared with government authorities or any third party without explicit written consent. Complaint data used in policy research is anonymised and aggregated.</p>
          <p>Contact TPAP through the official Contact page with any privacy-related question.</p>
        </div>
      </section>
    </PageShell>
  );
}
