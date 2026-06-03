import { PageShell } from "@/components/PageShell";
import { PublicLeadershipProfiles } from "@/components/PublicLeadershipProfiles";
import { SectionHeading } from "@/components/SectionHeading";

export default function LeadershipPage() {
  return (
    <PageShell
      eyebrow="Leadership"
      title="Current and former leaders of TPAP."
      description="Official profiles are managed from the TPAP admin dashboard."
    >
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Leadership Profiles"
            title="Professional profile layout for official representatives."
            align="center"
          />
          <PublicLeadershipProfiles />
        </div>
      </section>
    </PageShell>
  );
}
