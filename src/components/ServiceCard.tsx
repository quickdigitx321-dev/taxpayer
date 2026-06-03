import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site";

type ServiceCardProps = {
  service: (typeof services)[number];
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="group rounded-lg border border-charcoal-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold-300"
    >
      <div className="flex items-start justify-between gap-5">
        <span className="grid size-12 place-items-center rounded-full bg-forest-50 text-forest-800">
          <Icon size={23} />
        </span>
        <ArrowRight
          size={18}
          className="text-charcoal-300 transition group-hover:translate-x-1 group-hover:text-gold-500"
        />
      </div>
      <h3 className="mt-8 font-display text-2xl text-charcoal-950">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-charcoal-600">
        {service.description}
      </p>
    </Link>
  );
}
