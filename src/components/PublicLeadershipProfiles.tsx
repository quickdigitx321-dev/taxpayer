import { getServerLeadershipProfiles, ServerLeadershipProfile } from "@/lib/serverContent";

function ProfileCard({ profile }: { profile: ServerLeadershipProfile }) {
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <article className="group flex flex-col border border-charcoal-100 bg-white p-7 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.10)]">
      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-950 ring-2 ring-forest-900 ring-offset-2 ring-offset-white transition-all duration-200 group-hover:ring-forest-500">
          {profile.image_url ? (
            <img
              alt={`${profile.name}, ${profile.designation}, TPAP`}
              className="h-full w-full object-cover"
              src={profile.image_url}
            />
          ) : (
            <span className="font-display text-lg font-semibold text-gold-300">{initials}</span>
          )}
        </div>
        <div>
          <h2 className="font-display text-xl leading-snug text-charcoal-950">{profile.name}</h2>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-600">
            {profile.designation}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-5 h-px bg-charcoal-100 transition-colors duration-200 group-hover:bg-forest-100" />

      {/* Bio */}
      <p className="flex-1 text-sm leading-[1.8] text-charcoal-500">
        {profile.bio || "Official leadership profile."}
      </p>
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="h-px w-8 bg-gold-400" />
      <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">{children}</h2>
      <span className="h-px flex-1 bg-charcoal-100" />
    </div>
  );
}

export async function PublicLeadershipProfiles() {
  const profiles = await getServerLeadershipProfiles();
  const currentProfiles = profiles.filter((p) => p.profile_type === "current");
  const formerProfiles = profiles.filter((p) => p.profile_type === "former");

  if (profiles.length === 0) {
    return (
      <p className="mt-12 text-center text-charcoal-400">
        No leadership profiles have been published yet.
      </p>
    );
  }

  return (
    <div className="mt-14 grid gap-14">
      <div>
        <SectionLabel>Current Leadership</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {currentProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>

      {formerProfiles.length > 0 && (
        <div>
          <SectionLabel>Former Leaders</SectionLabel>
          <div className="grid gap-5 md:grid-cols-3">
            {formerProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
