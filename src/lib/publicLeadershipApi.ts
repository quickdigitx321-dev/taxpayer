import { apiFetch } from "./api";

export type PublicLeadershipProfile = {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  profile_type: "current" | "former";
  sort_order: number;
  created_at: string;
};

export async function getPublicLeadershipProfiles() {
  const response = await apiFetch("/leadership-profiles");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Could not load leadership profiles.");
  }

  return data.records as PublicLeadershipProfile[];
}
