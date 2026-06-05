import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/site";

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Our Services"
      title="Practical support backed by national advocacy."
      description="TPAP combines taxpayer representation, policy research, public education, complaint support, and institutional engagement."
    >
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Service Areas"
            title="How TPAP serves taxpayers and advances reform."
            description="Each service helps taxpayers participate, stay informed, seek support, or contribute to a stronger and more accountable fiscal system."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
              Join the Movement
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              A stronger taxpayer voice begins with participation.
            </h2>
          </div>
          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950"
          >
            Become a Member <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
