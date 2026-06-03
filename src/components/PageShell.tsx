import { ReactNode } from "react";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="relative overflow-hidden bg-forest-950 pt-20 text-white">
        <PublicHeader />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(214,176,82,.22)_1px,transparent_1px),linear-gradient(rgba(214,176,82,.16)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="container-shell relative z-10 py-24">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-200">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            {description}
          </p>
        </div>
      </section>
      {children}
      <PublicFooter />
    </main>
  );
}
