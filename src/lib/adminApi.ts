import { apiFetch } from "./api";

export type AdminLoginResponse = {
  message: string;
  token: string;
  admin: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export type DashboardStats = {
  membershipApplications: number;
  pendingApprovals: number;
  approvedMemberships: number;
  complaints: number;
  contactInquiries: number;
  blogs: number;
};

export type MembershipRecord = {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  ntn: string;
  organization_name: string;
  phone: string;
  email: string;
  office_address: string;
  status: "pending" | "approved" | "rejected";
  membership_id: string | null;
  admin_notes: string | null;
  created_at: string;
};

export type ComplaintRecord = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "pending" | "in_process" | "resolved";
  admin_notes: string | null;
  created_at: string;
};

export type ContactRecord = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type BlogRecord = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

export type BlogPayload = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
};

export type LeadershipRecord = {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  profile_type: "current" | "former";
  sort_order: number;
  created_at: string;
};

export type LeadershipPayload = {
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  profileType: "current" | "former";
  sortOrder: number;
};

export type WebsiteSettings = {
  siteTitle: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  analyticsCode: string;
};

async function request<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "API request failed.");
  }

  return data as T;
}

export function loginAdmin(email: string, password: string) {
  return request<AdminLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function getDashboard(token: string) {
  return request<{ stats: DashboardStats }>("/admin/dashboard", { token });
}

export function getMembershipApplications(token: string) {
  return request<{ records: MembershipRecord[] }>("/admin/membership-applications", {
    token
  });
}

export function updateMembershipStatus(
  token: string,
  id: number,
  status: MembershipRecord["status"],
  adminNotes = ""
) {
  return request<{ message: string; customerNotificationSent: boolean }>(`/admin/membership-applications/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status, adminNotes })
  });
}

export function getComplaints(token: string) {
  return request<{ records: ComplaintRecord[] }>("/admin/complaints", { token });
}

export function updateComplaintStatus(
  token: string,
  id: number,
  status: ComplaintRecord["status"],
  adminNotes = ""
) {
  return request<{ message: string; customerNotificationSent: boolean }>(`/admin/complaints/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status, adminNotes })
  });
}

export function getContactInquiries(token: string) {
  return request<{ records: ContactRecord[] }>("/admin/contact-inquiries", {
    token
  });
}

export function updateContactStatus(
  token: string,
  id: number,
  status: ContactRecord["status"]
) {
  return request<{ message: string }>(`/admin/contact-inquiries/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status })
  });
}

export function deleteContactInquiry(token: string, id: number) {
  return request<{ message: string }>(`/admin/contact-inquiries/${id}`, {
    method: "DELETE",
    token
  });
}

export function getBlogs(token: string) {
  return request<{ records: BlogRecord[] }>("/admin/blogs", { token });
}

export function createBlog(token: string, payload: BlogPayload) {
  return request<{ message: string; id: number }>("/admin/blogs", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}

export function updateBlog(token: string, id: number, payload: BlogPayload) {
  return request<{ message: string }>(`/admin/blogs/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload)
  });
}

export function deleteBlog(token: string, id: number) {
  return request<{ message: string }>(`/admin/blogs/${id}`, {
    method: "DELETE",
    token
  });
}

export function getLeadershipProfiles(token: string) {
  return request<{ records: LeadershipRecord[] }>("/admin/leadership-profiles", {
    token
  });
}

export function createLeadershipProfile(token: string, payload: LeadershipPayload) {
  return request<{ message: string; id: number }>("/admin/leadership-profiles", {
    method: "POST",
    token,
    body: JSON.stringify(payload)
  });
}

export function updateLeadershipProfile(
  token: string,
  id: number,
  payload: LeadershipPayload
) {
  return request<{ message: string }>(`/admin/leadership-profiles/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload)
  });
}

export function deleteLeadershipProfile(token: string, id: number) {
  return request<{ message: string }>(`/admin/leadership-profiles/${id}`, {
    method: "DELETE",
    token
  });
}

export function getWebsiteSettings(token: string) {
  return request<{ settings: WebsiteSettings }>("/admin/settings", { token });
}

export function updateWebsiteSettings(token: string, payload: WebsiteSettings) {
  return request<{ message: string; settings: WebsiteSettings }>("/admin/settings", {
    method: "PUT",
    token,
    body: JSON.stringify(payload)
  });
}

export async function uploadBlogImage(token: string, file: File) {
  const body = new FormData();
  body.append("image", file);

  const response = await apiFetch("/admin/uploads/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Image upload failed.");
  }

  return data as { message: string; url: string };
}
