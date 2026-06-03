import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/PageShell";
import { PublicContactDetails } from "@/components/PublicContactDetails";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact Us"
      title="Get in touch with Tax Payer Alliance Pakistan."
      description="Reach TPAP for membership support, public inquiries, organizational communication, and official correspondence."
    >
      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Reach TPAP"
              title="Contact details and public inquiry form."
            />
            <PublicContactDetails />
          </div>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
