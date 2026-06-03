import { MembershipForm } from "@/components/forms/MembershipForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export default function MembershipPage() {
  return (
    <PageShell
      eyebrow="Become a Member"
      title="Apply for TPAP membership."
      description="Submit your membership application for review by Tax Payer Alliance Pakistan."
    >
      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Application"
            title="A structured form for admin review."
            description="Please provide accurate identity, organization, and contact details so your application can be reviewed properly."
          />
          <MembershipForm />
        </div>
      </section>
    </PageShell>
  );
}
