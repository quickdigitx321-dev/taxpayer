"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPublicLeadershipProfiles,
  PublicLeadershipProfile
} from "@/lib/publicLeadershipApi";

function ProfileCard({ profile }: { profile: PublicLeadershipProfile }) {
  return (
    <article className="bg-white p-6 text-center shadow-soft">
      <div className="mx-auto grid aspect-square max-w-64 place-items-center overflow-hidden rounded-full bg-forest-950 text-gold-200">
        {profile.image_url ? (
          <img
            alt={profile.name}
            className="h-full w-full object-cover"
            src={profile.image_url}
          />
        ) : (
          <span className="font-display text-7xl">{profile.name.slice(0, 1)}</span>
        )}
      </div>
      <h2 className="mt-7 font-display text-3xl">{profile.name}</h2>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
        {profile.designation}
      </p>
      <p className="mt-4 text-sm leading-7 text-charcoal-600">
        {profile.bio || "Official leadership profile."}
      </p>
    </article>
  );
}

export function PublicLeadershipProfiles() {
  const [profiles, setProfiles] = useState<PublicLeadershipProfile[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicLeadershipProfiles()
      .then(setProfiles)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Could not load leadership profiles.")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const currentProfiles = useMemo(
    () => profiles.filter((profile) => profile.profile_type === "current"),
    [profiles]
  );
  const formerProfiles = useMemo(
    () => profiles.filter((profile) => profile.profile_type === "former"),
    [profiles]
  );

  if (isLoading) {
    return <p className="mt-12 text-center text-charcoal-500">Loading leadership...</p>;
  }

  if (error) {
    return (
      <div className="mt-12 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <p className="mt-12 text-center text-charcoal-500">
        No leadership profiles have been published yet.
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-16">
      <div>
        <h2 className="text-center font-display text-4xl">Current Leadership</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {currentProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>

      {formerProfiles.length > 0 ? (
        <div>
          <h2 className="text-center font-display text-4xl">Former Leaders</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {formerProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
