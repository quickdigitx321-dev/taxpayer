import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { objectives, values } from "@/data/site";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="A professional alliance platform for taxpayers across Pakistan."
      description="TPAP provides an organized platform for taxpayer representation, membership engagement, public communication, and institutional updates."
    >
      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Organization"
            title="Built to communicate with clarity, authority, and public trust."
            description="The organization works to strengthen public engagement, support taxpayer awareness, and create structured channels for membership and submissions."
          />
          <div className="grid gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="border border-charcoal-100 bg-white p-6">
                  <Icon className="text-forest-700" size={25} />
                  <h3 className="mt-5 font-display text-3xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell grid gap-10 md:grid-cols-3">
          {["Mission", "Vision", "History"].map((title) => (
            <article key={title} className="border-l-2 border-gold-300 pl-6">
              <h2 className="font-display text-4xl">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal-600">
                TPAP is committed to credible representation, transparent communication,
                and accessible services for taxpayers and affiliated organizations.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Objectives"
            title="What the website needs to support."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {objectives.map((objective) => (
              <div key={objective} className="flex gap-4 bg-white p-5 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={21} />
                <p className="text-sm leading-7 text-charcoal-600">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
