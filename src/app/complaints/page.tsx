import { ComplaintForm } from "@/components/forms/ComplaintForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export default function ComplaintsPage() {
  return (
    <PageShell
      eyebrow="Complaints & Suggestions"
      title="Submit a complaint or suggestion."
      description="Use this channel to share a concern, complaint, or suggestion with TPAP."
    >
      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Public Submission"
            title="Accessible form with a serious, secure presentation."
            description="Your submission helps TPAP understand public concerns and respond through an organized review process."
          />
          <ComplaintForm />
        </div>
      </section>
    </PageShell>
  );
}
