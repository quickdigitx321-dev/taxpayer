import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function PartnerWithUsPage() {
  return (
    <PageShell
      eyebrow="Partner With Us"
      title="Build a broader coalition for meaningful reform."
      description="TPAP actively seeks partnerships with trade bodies, professional associations, chambers of commerce, academic institutions, media organisations, and civil society groups."
    >
      <section className="py-24">
        <div className="container-shell max-w-3xl">
          <p className="text-sm leading-7 text-charcoal-700">Partnership opportunities include research collaboration, joint events, advocacy coalitions, co-publications, fiscal literacy programmes, public awareness campaigns, and shared policy submissions.</p>
          <a href="mailto:partners@tpap.org.pk" className="mt-7 inline-block text-sm font-bold text-forest-800">partners@tpap.org.pk</a>
          <div className="mt-8"><Link href="/contact" className="rounded-full bg-forest-950 px-6 py-3 text-sm font-bold text-white">Start a Partnership Conversation</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
