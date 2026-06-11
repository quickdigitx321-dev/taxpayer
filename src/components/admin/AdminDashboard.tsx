"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  Bold,
  ClipboardList,
  FileText,
  Heading1,
  Heading2,
  ImageUp,
  Inbox,
  Italic,
  List,
  LogOut,
  Download,
  Plus,
  Quote,
  RefreshCcw,
  Search,
  UsersRound,
  X
} from "lucide-react";
import {
  BlogPayload,
  BlogRecord,
  ComplaintRecord,
  ContactRecord,
  createBlog,
  createLeadershipProfile,
  DashboardStats,
  deleteBlog,
  deleteContactInquiry,
  deleteLeadershipProfile,
  getBlogs,
  getComplaints,
  getContactInquiries,
  getDashboard,
  getLeadershipProfiles,
  getMembershipApplications,
  getWebsiteSettings,
  LeadershipPayload,
  LeadershipRecord,
  MembershipRecord,
  updateComplaintStatus,
  updateContactStatus,
  updateBlog,
  updateLeadershipProfile,
  updateMembershipStatus,
  updateWebsiteSettings,
  uploadBlogImage
  ,
  WebsiteSettings
} from "@/lib/adminApi";
import { StatusBadge } from "./StatusBadge";

type AdminTab =
  | "memberships"
  | "complaints"
  | "contacts"
  | "blogs"
  | "leadership"
  | "settings";

type LoadDataOptions = {
  silent?: boolean;
  checkForNew?: boolean;
};

const emptyBlogForm: BlogPayload = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  featuredImage: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft"
};

const emptyLeadershipForm: LeadershipPayload = {
  name: "",
  designation: "",
  bio: "",
  imageUrl: "",
  profileType: "current",
  sortOrder: 0
};

const emptySettings: WebsiteSettings = {
  siteTitle: "",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "",
  phone: "",
  address: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  whatsapp: "",
  footerText: "",
  seoTitle: "",
  seoDescription: "",
  analyticsCode: ""
};

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) {
    return;
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function playNotificationTone() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.35);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.36);
    window.setTimeout(() => audioContext.close(), 500);
  } catch {
    // Browsers can block audio until the page has user interaction.
  }
}

export function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [activeTab, setActiveTab] = useState<AdminTab>("memberships");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [memberships, setMemberships] = useState<MembershipRecord[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [blogForm, setBlogForm] = useState<BlogPayload>(emptyBlogForm);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [leadership, setLeadership] = useState<LeadershipRecord[]>([]);
  const [leadershipForm, setLeadershipForm] =
    useState<LeadershipPayload>(emptyLeadershipForm);
  const [editingLeadershipId, setEditingLeadershipId] = useState<number | null>(null);
  const [leadershipEditorOpen, setLeadershipEditorOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>(emptySettings);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dashboardAlert, setDashboardAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const latestStatsRef = useRef<DashboardStats | null>(null);

  const statCards = useMemo(
    () => [
      {
        label: "Applications",
        value: stats?.membershipApplications ?? 0,
        icon: ClipboardList
      },
      {
        label: "Pending",
        value: stats?.pendingApprovals ?? 0,
        icon: UsersRound
      },
      {
        label: "Approved",
        value: stats?.approvedMemberships ?? 0,
        icon: BadgeCheck
      },
      {
        label: "Complaints",
        value: stats?.complaints ?? 0,
        icon: Inbox
      },
      {
        label: "Contacts",
        value: stats?.contactInquiries ?? 0,
        icon: FileText
      },
      {
        label: "Blogs",
        value: stats?.blogs ?? 0,
        icon: FileText
      }
    ],
    [stats]
  );

  async function loadData(authToken = token, options: LoadDataOptions = {}) {
    if (!authToken) {
      return;
    }

    if (!options.silent) {
      setIsLoading(true);
    }
    setError("");

    try {
      const [
        dashboardData,
        membershipData,
        complaintData,
        contactData,
        blogData,
        leadershipData,
        settingsData
      ] =
        await Promise.all([
          getDashboard(authToken),
          getMembershipApplications(authToken),
          getComplaints(authToken),
          getContactInquiries(authToken),
          getBlogs(authToken),
          getLeadershipProfiles(authToken),
          getWebsiteSettings(authToken)
        ]);

      const previousStats = latestStatsRef.current;
      const nextStats = dashboardData.stats;

      if (options.checkForNew && previousStats) {
        const alerts = [
          nextStats.membershipApplications > previousStats.membershipApplications
            ? "New membership application received."
            : "",
          nextStats.complaints > previousStats.complaints
            ? "New complaint or suggestion received."
            : "",
          nextStats.contactInquiries > previousStats.contactInquiries
            ? "New contact inquiry received."
            : ""
        ].filter(Boolean);

        if (alerts.length > 0) {
          setDashboardAlert(alerts.join(" "));
          playNotificationTone();
        }
      }

      latestStatsRef.current = nextStats;
      setStats(nextStats);
      setMemberships(membershipData.records);
      setComplaints(complaintData.records);
      setContacts(contactData.records);
      setBlogs(blogData.records);
      setLeadership(leadershipData.records);
      setSettingsForm(settingsData.settings);
    } catch (err) {
      if (!options.silent) {
        setError(err instanceof Error ? err.message : "Could not load admin data.");
      }
    } finally {
      if (!options.silent) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("tpap_admin_token");
    const savedName = localStorage.getItem("tpap_admin_name");

    if (!savedToken) {
      router.push("/admin/login");
      return;
    }

    setToken(savedToken);
    setAdminName(savedName || "Admin");
    loadData(savedToken);

    const intervalId = window.setInterval(() => {
      loadData(savedToken, { silent: true, checkForNew: true });
    }, 45000);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function logout() {
    localStorage.removeItem("tpap_admin_token");
    localStorage.removeItem("tpap_admin_name");
    router.push("/admin/login");
  }

  async function setMembershipStatus(
    id: number,
    status: MembershipRecord["status"]
  ) {
    setActionId(`membership-${id}-${status}`);
    setError("");
    setNotice("");

    try {
      const response = await updateMembershipStatus(
        token,
        id,
        status,
        `Marked ${status} from dashboard.`
      );
      await loadData();
      setNotice(
        `Membership application marked ${status}.${
          response.customerNotificationSent
            ? " The applicant was notified by email."
            : " No applicant email was sent because the status was unchanged or SMTP delivery was not accepted."
        }`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update membership.");
    } finally {
      setActionId("");
    }
  }

  async function setComplaintStatus(id: number, status: ComplaintRecord["status"]) {
    setActionId(`complaint-${id}-${status}`);
    setError("");
    setNotice("");

    try {
      await updateComplaintStatus(token, id, status, `Marked ${status} from dashboard.`);
      await loadData();
      setNotice(`Complaint marked ${status.replace("_", " ")}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update complaint.");
    } finally {
      setActionId("");
    }
  }

  async function setContactStatus(id: number, status: ContactRecord["status"]) {
    setActionId(`contact-${id}-${status}`);
    setError("");
    setNotice("");

    try {
      await updateContactStatus(token, id, status);
      await loadData();
      setNotice(`Contact inquiry marked ${status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update contact inquiry.");
    } finally {
      setActionId("");
    }
  }

  async function removeContactInquiry(id: number) {
    const confirmed = window.confirm("Delete this contact inquiry?");
    if (!confirmed) {
      return;
    }

    setActionId(`contact-${id}-delete`);
    setError("");
    setNotice("");

    try {
      await deleteContactInquiry(token, id);
      await loadData();
      setNotice("Contact inquiry deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete contact inquiry.");
    } finally {
      setActionId("");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f2ec] text-charcoal-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-charcoal-100 bg-white p-6 lg:block">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center bg-forest-950 text-sm font-bold text-gold-200">
            TP
          </span>
          <div>
            <p className="font-semibold tracking-[0.18em]">TPAP</p>
            <p className="text-xs text-charcoal-500">Admin Panel</p>
          </div>
        </div>

        <nav className="mt-10 grid gap-2">
          {[
            ["memberships", "Memberships"],
            ["complaints", "Complaints"],
            ["contacts", "Contact Inquiries"],
            ["blogs", "Blogs"],
            ["leadership", "Leadership"],
            ["settings", "Settings"]
          ].map(([key, label]) => (
            <button
              key={key}
              className={`rounded-lg px-4 py-3 text-left text-sm font-semibold ${
                activeTab === key
                  ? "bg-forest-800 text-white"
                  : "text-charcoal-600 hover:bg-charcoal-50"
              }`}
              onClick={() => setActiveTab(key as AdminTab)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="absolute bottom-6 left-6 right-6 inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-100 px-5 py-3 text-sm font-bold"
          onClick={logout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      <section className="lg:pl-72">
        <header className="border-b border-charcoal-100 bg-white">
          <div className="flex flex-col justify-between gap-4 px-5 py-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-700">
                Welcome, {adminName}
              </p>
              <h1 className="mt-2 font-display text-4xl">Dashboard</h1>
            </div>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 bg-white px-5 py-3 text-sm font-bold"
                onClick={() => loadData()}
              >
                <RefreshCcw size={16} />
                Refresh
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white lg:hidden"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {dashboardAlert ? (
            <div className="fixed right-5 top-5 z-50 max-w-sm border border-forest-200 bg-white p-4 shadow-premium">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-800">
                  <Bell size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-charcoal-950">New dashboard activity</p>
                  <p className="mt-1 text-sm leading-6 text-charcoal-600">{dashboardAlert}</p>
                </div>
                <button
                  aria-label="Dismiss notification"
                  className="text-charcoal-400 hover:text-charcoal-800"
                  onClick={() => setDashboardAlert("")}
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          {notice ? (
            <div className="mb-6 border border-forest-200 bg-forest-50 px-4 py-3 text-sm font-semibold text-forest-800">
              {notice}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="rounded-lg bg-white p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-full bg-forest-50 text-forest-800">
                      <Icon size={20} />
                    </span>
                    <p className="font-display text-4xl">{card.value}</p>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-charcoal-500">
                    {card.label}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg bg-white p-5 shadow-soft">
            <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
              {[
                ["memberships", "Memberships"],
                ["complaints", "Complaints"],
                ["contacts", "Contacts"],
                ["blogs", "Blogs"],
                ["leadership", "Leadership"],
                ["settings", "Settings"]
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    activeTab === key
                      ? "bg-forest-800 text-white"
                      : "bg-charcoal-50 text-charcoal-600"
                  }`}
                  onClick={() => setActiveTab(key as AdminTab)}
                >
                  {label}
                </button>
              ))}
            </div>

            {isLoading ? <p className="py-12 text-center text-charcoal-500">Loading...</p> : null}
            {!isLoading && activeTab === "memberships" ? (
              <MembershipTable records={memberships} onStatusChange={setMembershipStatus} />
            ) : null}
            {!isLoading && activeTab === "complaints" ? (
              <ComplaintsTable
                actionId={actionId}
                records={complaints}
                onStatusChange={setComplaintStatus}
              />
            ) : null}
            {!isLoading && activeTab === "contacts" ? (
              <ContactsTable
                actionId={actionId}
                onDelete={removeContactInquiry}
                onStatusChange={setContactStatus}
                records={contacts}
              />
            ) : null}
            {!isLoading && activeTab === "blogs" ? (
              <BlogsPanel
                actionId={actionId}
                editingBlogId={editingBlogId}
                form={blogForm}
                onCancelEdit={() => {
                  setEditingBlogId(null);
                  setBlogForm(emptyBlogForm);
                  setBlogEditorOpen(false);
                }}
                onDelete={async (id) => {
                  const confirmed = window.confirm("Delete this blog?");
                  if (!confirmed) {
                    return;
                  }

                  setActionId(`blog-${id}-delete`);
                  setError("");
                  setNotice("");

                  try {
                    await deleteBlog(token, id);
                    await loadData();
                    if (editingBlogId === id) {
                      setEditingBlogId(null);
                      setBlogForm(emptyBlogForm);
                      setBlogEditorOpen(false);
                    }
                    setNotice("Blog deleted successfully.");
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Could not delete blog.");
                  } finally {
                    setActionId("");
                  }
                }}
                onEdit={(blog) => {
                  setEditingBlogId(blog.id);
                  setBlogEditorOpen(true);
                  setBlogForm({
                    title: blog.title,
                    slug: blog.slug,
                    excerpt: blog.excerpt || "",
                    content: blog.content,
                    category: blog.category || "",
                    featuredImage: blog.featured_image || "",
                    seoTitle: blog.seo_title || "",
                    seoDescription: blog.seo_description || "",
                    status: blog.status
                  });
                }}
                onFormChange={setBlogForm}
                onAddNew={() => {
                  setEditingBlogId(null);
                  setBlogForm(emptyBlogForm);
                  setBlogEditorOpen(true);
                }}
                onSubmit={async () => {
                  setActionId(editingBlogId ? `blog-${editingBlogId}-save` : "blog-create");
                  setError("");
                  setNotice("");

                  try {
                    if (editingBlogId) {
                      await updateBlog(token, editingBlogId, blogForm);
                      setNotice("Blog updated successfully.");
                    } else {
                      await createBlog(token, blogForm);
                      setNotice("Blog created successfully.");
                    }

                    setEditingBlogId(null);
                    setBlogForm(emptyBlogForm);
                    setBlogEditorOpen(false);
                    await loadData();
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Could not save blog.");
                  } finally {
                    setActionId("");
                  }
                }}
                onUploadImage={async (file) => {
                  setActionId("blog-image-upload");
                  setError("");
                  setNotice("");

                  try {
                    const result = await uploadBlogImage(token, file);
                    setBlogForm((current) => ({
                      ...current,
                      featuredImage: result.url
                    }));
                    setNotice("Featured image uploaded successfully.");
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Image upload failed.");
                  } finally {
                    setActionId("");
                  }
                }}
                records={blogs}
                isEditorOpen={blogEditorOpen}
              />
            ) : null}
            {!isLoading && activeTab === "leadership" ? (
              <LeadershipPanel
                actionId={actionId}
                editingId={editingLeadershipId}
                form={leadershipForm}
                isEditorOpen={leadershipEditorOpen}
                onAddNew={() => {
                  setEditingLeadershipId(null);
                  setLeadershipForm(emptyLeadershipForm);
                  setLeadershipEditorOpen(true);
                }}
                onCancelEdit={() => {
                  setEditingLeadershipId(null);
                  setLeadershipForm(emptyLeadershipForm);
                  setLeadershipEditorOpen(false);
                }}
                onDelete={async (id) => {
                  const confirmed = window.confirm("Delete this leadership profile?");
                  if (!confirmed) {
                    return;
                  }

                  setActionId(`leadership-${id}-delete`);
                  setError("");
                  setNotice("");

                  try {
                    await deleteLeadershipProfile(token, id);
                    await loadData();
                    if (editingLeadershipId === id) {
                      setEditingLeadershipId(null);
                      setLeadershipForm(emptyLeadershipForm);
                      setLeadershipEditorOpen(false);
                    }
                    setNotice("Leadership profile deleted successfully.");
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : "Could not delete leadership profile."
                    );
                  } finally {
                    setActionId("");
                  }
                }}
                onEdit={(profile) => {
                  setEditingLeadershipId(profile.id);
                  setLeadershipEditorOpen(true);
                  setLeadershipForm({
                    name: profile.name,
                    designation: profile.designation,
                    bio: profile.bio || "",
                    imageUrl: profile.image_url || "",
                    profileType: profile.profile_type,
                    sortOrder: profile.sort_order || 0
                  });
                }}
                onFormChange={setLeadershipForm}
                onSubmit={async () => {
                  setActionId(
                    editingLeadershipId
                      ? `leadership-${editingLeadershipId}-save`
                      : "leadership-create"
                  );
                  setError("");
                  setNotice("");

                  try {
                    if (editingLeadershipId) {
                      await updateLeadershipProfile(
                        token,
                        editingLeadershipId,
                        leadershipForm
                      );
                      setNotice("Leadership profile updated successfully.");
                    } else {
                      await createLeadershipProfile(token, leadershipForm);
                      setNotice("Leadership profile created successfully.");
                    }

                    setEditingLeadershipId(null);
                    setLeadershipForm(emptyLeadershipForm);
                    setLeadershipEditorOpen(false);
                    await loadData();
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : "Could not save leadership profile."
                    );
                  } finally {
                    setActionId("");
                  }
                }}
                onUploadImage={async (file) => {
                  setActionId("leadership-image-upload");
                  setError("");
                  setNotice("");

                  try {
                    const result = await uploadBlogImage(token, file);
                    setLeadershipForm((current) => ({
                      ...current,
                      imageUrl: result.url
                    }));
                    setNotice("Profile image uploaded successfully.");
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Image upload failed.");
                  } finally {
                    setActionId("");
                  }
                }}
                records={leadership}
              />
            ) : null}
            {!isLoading && activeTab === "settings" ? (
              <SettingsPanel
                actionId={actionId}
                form={settingsForm}
                onFormChange={setSettingsForm}
                onSubmit={async () => {
                  setActionId("settings-save");
                  setError("");
                  setNotice("");

                  try {
                    const result = await updateWebsiteSettings(token, settingsForm);
                    setSettingsForm(result.settings);
                    await loadData();
                    setNotice("Website settings updated successfully.");
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Could not save settings.");
                  } finally {
                    setActionId("");
                  }
                }}
                onUploadImage={async (key, file) => {
                  setActionId(`settings-${key}-upload`);
                  setError("");
                  setNotice("");

                  try {
                    const result = await uploadBlogImage(token, file);
                    setSettingsForm((current) => ({ ...current, [key]: result.url }));
                    setNotice(`${key === "logoUrl" ? "Logo" : "Favicon"} uploaded successfully.`);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Image upload failed.");
                  } finally {
                    setActionId("");
                  }
                }}
              />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function SettingsPanel({
  actionId,
  form,
  onFormChange,
  onSubmit,
  onUploadImage
}: {
  actionId: string;
  form: WebsiteSettings;
  onFormChange: (form: WebsiteSettings) => void;
  onSubmit: () => void;
  onUploadImage: (key: "logoUrl" | "faviconUrl", file: File) => Promise<void>;
}) {
  function updateField<K extends keyof WebsiteSettings>(key: K, value: WebsiteSettings[K]) {
    onFormChange({ ...form, [key]: value });
  }

  return (
    <form
      className="mx-auto grid max-w-5xl gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
            Website Settings
          </p>
          <h2 className="mt-2 font-display text-3xl">Basic Site Controls</h2>
        </div>
        <button
          className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={Boolean(actionId)}
        >
          {actionId === "settings-save" ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <section className="grid gap-4 border border-charcoal-100 bg-[#f8f6f1] p-5">
        <h3 className="font-display text-2xl">Brand</h3>
        <label className="grid gap-2 text-sm font-semibold">
          Site Title
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("siteTitle", event.target.value)}
            value={form.siteTitle}
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["logoUrl", "Logo"],
            ["faviconUrl", "Favicon"]
          ].map(([key, label]) => (
            <label className="grid gap-2 text-sm font-semibold" key={key}>
              {label}
              <div className="grid gap-3 border border-charcoal-100 bg-white p-4">
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white">
                  <ImageUp size={17} />
                  {actionId === `settings-${key}-upload` ? "Uploading..." : `Upload ${label}`}
                  <input
                    accept="image/*"
                    className="hidden"
                    disabled={Boolean(actionId)}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        onUploadImage(key as "logoUrl" | "faviconUrl", file);
                      }
                    }}
                    type="file"
                  />
                </label>
                <input
                  className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
                  onChange={(event) =>
                    updateField(key as keyof WebsiteSettings, event.target.value)
                  }
                  placeholder="Or paste image URL"
                  value={form[key as keyof WebsiteSettings]}
                />
                {form[key as keyof WebsiteSettings] ? (
                  <img
                    alt={`${label} preview`}
                    className="max-h-32 w-full object-contain"
                    src={form[key as keyof WebsiteSettings]}
                  />
                ) : null}
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-4 border border-charcoal-100 bg-[#f8f6f1] p-5">
        <h3 className="font-display text-2xl">Contact</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["contactEmail", "Contact Email"],
            ["phone", "Phone"],
            ["whatsapp", "WhatsApp"]
          ].map(([key, label]) => (
            <label className="grid gap-2 text-sm font-semibold" key={key}>
              {label}
              <input
                className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
                onChange={(event) =>
                  updateField(key as keyof WebsiteSettings, event.target.value)
                }
                value={form[key as keyof WebsiteSettings]}
              />
            </label>
          ))}
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Address
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("address", event.target.value)}
            value={form.address}
          />
        </label>
      </section>

      <section className="grid gap-4 border border-charcoal-100 bg-[#f8f6f1] p-5">
        <h3 className="font-display text-2xl">Social Links</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["facebook", "Facebook"],
            ["twitter", "X / Twitter"],
            ["linkedin", "LinkedIn"],
            ["instagram", "Instagram"]
          ].map(([key, label]) => (
            <label className="grid gap-2 text-sm font-semibold" key={key}>
              {label}
              <input
                className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
                onChange={(event) =>
                  updateField(key as keyof WebsiteSettings, event.target.value)
                }
                value={form[key as keyof WebsiteSettings]}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-4 border border-charcoal-100 bg-[#f8f6f1] p-5">
        <h3 className="font-display text-2xl">Footer & SEO</h3>
        <label className="grid gap-2 text-sm font-semibold">
          Footer Text
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("footerText", event.target.value)}
            value={form.footerText}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          SEO Title
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("seoTitle", event.target.value)}
            value={form.seoTitle}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          SEO Description
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("seoDescription", event.target.value)}
            value={form.seoDescription}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Analytics Code
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("analyticsCode", event.target.value)}
            value={form.analyticsCode}
          />
        </label>
      </section>
    </form>
  );
}

function MembershipTable({
  records,
  onStatusChange
}: {
  records: MembershipRecord[];
  onStatusChange: (id: number, status: MembershipRecord["status"]) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredRecords = records.filter((record) => {
    const haystack = [
      record.first_name,
      record.last_name,
      record.cnic,
      record.ntn,
      record.organization_name,
      record.phone,
      record.email,
      record.status,
      record.membership_id
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="overflow-x-auto">
      <TableToolbar
        exportLabel="Export CSV"
        onExport={() =>
          downloadCsv(
            "membership-applications.csv",
            filteredRecords.map((record) => ({
              id: record.id,
              name: `${record.first_name} ${record.last_name}`,
              cnic: record.cnic,
              ntn: record.ntn,
              organization: record.organization_name,
              phone: record.phone,
              email: record.email,
              address: record.office_address,
              status: record.status,
              membershipId: record.membership_id || "",
              notes: record.admin_notes || "",
              createdAt: record.created_at
            }))
          )
        }
        query={query}
        setQuery={setQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statuses={["pending", "approved", "rejected"]}
        title="Membership Applications"
      />
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-charcoal-50 text-xs uppercase tracking-[0.14em] text-charcoal-500">
          <tr>
            <th className="p-4">Applicant</th>
            <th className="p-4">Organization</th>
            <th className="p-4">CNIC / NTN</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-t border-charcoal-100">
              <td className="p-4">
                <p className="font-semibold">
                  {record.first_name} {record.last_name}
                </p>
                <p className="mt-1 text-charcoal-500">{record.email}</p>
                <p className="text-charcoal-500">{record.phone}</p>
              </td>
              <td className="p-4">{record.organization_name}</td>
              <td className="p-4">
                <p>{record.cnic}</p>
                <p className="text-charcoal-500">{record.ntn}</p>
                {record.membership_id ? (
                  <p className="mt-1 font-semibold text-forest-700">{record.membership_id}</p>
                ) : null}
              </td>
              <td className="p-4">
                <StatusBadge status={record.status} />
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {(["approved", "rejected", "pending"] as const).map((status) => (
                    <button
                      key={status}
                      className="rounded-full border border-charcoal-100 px-3 py-1.5 text-xs font-bold capitalize hover:bg-charcoal-50"
                      onClick={() => onStatusChange(record.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {filteredRecords.length === 0 ? (
            <tr>
              <td className="p-8 text-center text-charcoal-500" colSpan={5}>
                No membership applications match your search.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function ComplaintsTable({
  actionId,
  records,
  onStatusChange
}: {
  actionId: string;
  records: ComplaintRecord[];
  onStatusChange: (id: number, status: ComplaintRecord["status"]) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredRecords = records.filter((record) => {
    const haystack = [
      record.full_name,
      record.email,
      record.phone,
      record.subject,
      record.message,
      record.status
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="overflow-x-auto">
      <TableToolbar
        exportLabel="Export CSV"
        onExport={() =>
          downloadCsv(
            "complaints.csv",
            filteredRecords.map((record) => ({
              id: record.id,
              name: record.full_name,
              email: record.email,
              phone: record.phone,
              subject: record.subject,
              message: record.message,
              status: record.status,
              notes: record.admin_notes || "",
              createdAt: record.created_at
            }))
          )
        }
        query={query}
        setQuery={setQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statuses={["pending", "in_process", "resolved"]}
        title="Complaints & Suggestions"
      />
      <table className="w-full min-w-[920px] border-collapse text-left text-sm">
        <thead className="bg-charcoal-50 text-xs uppercase tracking-[0.14em] text-charcoal-500">
          <tr>
            <th className="p-4">Submitter</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Message</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-t border-charcoal-100">
              <td className="p-4">
                <p className="font-semibold">{record.full_name}</p>
                <p className="mt-1 text-charcoal-500">{record.email}</p>
                <p className="text-charcoal-500">{record.phone}</p>
              </td>
              <td className="p-4">{record.subject}</td>
              <td className="max-w-md p-4 text-charcoal-600">{record.message}</td>
              <td className="p-4">
                <StatusBadge status={record.status} />
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {(["pending", "in_process", "resolved"] as const).map((status) => (
                    <button
                      key={status}
                      className="rounded-full border border-charcoal-100 px-3 py-1.5 text-xs font-bold capitalize hover:bg-charcoal-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={Boolean(actionId)}
                      onClick={() => onStatusChange(record.id, status)}
                    >
                      {actionId === `complaint-${record.id}-${status}`
                        ? "Updating..."
                        : status.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {filteredRecords.length === 0 ? (
            <tr>
              <td className="p-8 text-center text-charcoal-500" colSpan={5}>
                No complaints match your search.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTable({
  actionId,
  records,
  onDelete,
  onStatusChange
}: {
  actionId: string;
  records: ContactRecord[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: ContactRecord["status"]) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredRecords = records.filter((record) => {
    const haystack = [record.name, record.email, record.phone, record.message, record.status]
      .join(" ")
      .toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="overflow-x-auto">
      <TableToolbar
        exportLabel="Export CSV"
        onExport={() =>
          downloadCsv(
            "contact-inquiries.csv",
            filteredRecords.map((record) => ({
              id: record.id,
              name: record.name,
              email: record.email,
              phone: record.phone,
              message: record.message,
              status: record.status,
              createdAt: record.created_at
            }))
          )
        }
        query={query}
        setQuery={setQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statuses={["new", "read", "archived"]}
        title="Contact Inquiries"
      />
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-charcoal-50 text-xs uppercase tracking-[0.14em] text-charcoal-500">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Message</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-t border-charcoal-100">
              <td className="p-4 font-semibold">{record.name}</td>
              <td className="p-4">{record.email}</td>
              <td className="p-4">{record.phone}</td>
              <td className="max-w-lg p-4 text-charcoal-600">{record.message}</td>
              <td className="p-4">
                <StatusBadge status={record.status} />
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {(["new", "read", "archived"] as const).map((status) => (
                    <button
                      key={status}
                      className="rounded-full border border-charcoal-100 px-3 py-1.5 text-xs font-bold capitalize hover:bg-charcoal-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={Boolean(actionId)}
                      onClick={() => onStatusChange(record.id, status)}
                    >
                      {actionId === `contact-${record.id}-${status}` ? "Updating..." : status}
                    </button>
                  ))}
                  <button
                    className="rounded-full border border-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={Boolean(actionId)}
                    onClick={() => onDelete(record.id)}
                  >
                    {actionId === `contact-${record.id}-delete` ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredRecords.length === 0 ? (
            <tr>
              <td className="p-8 text-center text-charcoal-500" colSpan={6}>
                No contact inquiries match your search.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function TableToolbar({
  exportLabel,
  onExport,
  query,
  setQuery,
  setStatusFilter,
  statusFilter,
  statuses,
  title
}: {
  exportLabel: string;
  onExport: () => void;
  query: string;
  setQuery: (value: string) => void;
  setStatusFilter: (value: string) => void;
  statusFilter: string;
  statuses: string[];
  title: string;
}) {
  return (
    <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <h2 className="font-display text-3xl">{title}</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-3 border border-charcoal-100 bg-white px-4 py-3">
            <Search size={17} className="shrink-0 text-charcoal-400" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records"
              value={query}
            />
          </label>
          <select
            className="border border-charcoal-100 bg-white px-4 py-3 text-sm font-semibold capitalize outline-none"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option value="all">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-100 bg-white px-5 py-3 text-sm font-bold hover:bg-charcoal-50"
        onClick={onExport}
        type="button"
      >
        <Download size={17} />
        {exportLabel}
      </button>
    </div>
  );
}

function BlogsPanel({
  actionId,
  editingBlogId,
  form,
  isEditorOpen,
  records,
  onAddNew,
  onCancelEdit,
  onDelete,
  onEdit,
  onFormChange,
  onUploadImage,
  onSubmit
}: {
  actionId: string;
  editingBlogId: number | null;
  form: BlogPayload;
  isEditorOpen: boolean;
  records: BlogRecord[];
  onAddNew: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
  onEdit: (blog: BlogRecord) => void;
  onFormChange: (form: BlogPayload) => void;
  onUploadImage: (file: File) => Promise<void>;
  onSubmit: () => void;
}) {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  function updateField<K extends keyof BlogPayload>(key: K, value: BlogPayload[K]) {
    const nextForm = { ...form, [key]: value };

    if (key === "title" && !editingBlogId) {
      nextForm.slug = String(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    onFormChange(nextForm);
  }

  function wrapSelection(prefix: string, suffix = "", placeholder = "text") {
    const textarea = contentRef.current;
    if (!textarea) {
      updateField("content", `${form.content}${prefix}${placeholder}${suffix}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.slice(start, end) || placeholder;
    const nextContent = `${form.content.slice(0, start)}${prefix}${selected}${suffix}${form.content.slice(end)}`;

    updateField("content", nextContent);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  }

  if (!isEditorOpen) {
    return (
      <div>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-3xl">Blog Records</h2>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white"
            onClick={onAddNew}
          >
            <Plus size={17} />
            Add Blog
          </button>
        </div>
        {records.length === 0 ? (
          <div className="border border-charcoal-100 bg-white p-8 text-center text-charcoal-500">
            No blogs yet. Add your first blog from the form.
          </div>
        ) : null}
        <div className="grid gap-4">
          {records.map((blog) => (
            <article key={blog.id} className="border border-charcoal-100 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl">{blog.title}</h3>
                    <StatusBadge status={blog.status} />
                  </div>
                  <p className="mt-2 text-sm text-charcoal-500">/blogs/{blog.slug}</p>
                  <p className="mt-2 text-sm text-charcoal-600">
                    {blog.category || "Uncategorized"}
                  </p>
                  {blog.excerpt ? (
                    <p className="mt-3 text-sm leading-6 text-charcoal-600">
                      {blog.excerpt}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    className="rounded-full border border-charcoal-100 px-4 py-2 text-xs font-bold hover:bg-charcoal-50"
                    onClick={() => onEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-full border border-red-100 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    disabled={Boolean(actionId)}
                    onClick={() => onDelete(blog.id)}
                  >
                    {actionId === `blog-${blog.id}-delete` ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        className="mx-auto grid max-w-5xl gap-5 border border-charcoal-100 bg-[#f8f6f1] p-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
              Blog CMS
            </p>
            <h2 className="mt-2 font-display text-3xl">
              {editingBlogId ? "Edit Blog" : "Add Blog"}
            </h2>
          </div>
          <button
            className="rounded-full border border-charcoal-100 px-4 py-2 text-xs font-bold"
            onClick={onCancelEdit}
            type="button"
          >
            Back to Blogs
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Title
            <input
              className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
              onChange={(event) => updateField("title", event.target.value)}
              required
              value={form.title}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Slug
            <input
              className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
              onChange={(event) => updateField("slug", event.target.value)}
              required
              value={form.slug}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Category
            <input
              className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
              onChange={(event) => updateField("category", event.target.value)}
              value={form.category}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Status
            <select
              className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
              onChange={(event) =>
                updateField("status", event.target.value as BlogPayload["status"])
              }
              value={form.status}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold">
          Excerpt
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("excerpt", event.target.value)}
            value={form.excerpt}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Content
          <div className="flex flex-wrap gap-2 border border-charcoal-100 bg-white p-2">
            {[
              { label: "H1", icon: Heading1, prefix: "# ", suffix: "", placeholder: "Heading" },
              { label: "H2", icon: Heading2, prefix: "## ", suffix: "", placeholder: "Heading" },
              { label: "Bold", icon: Bold, prefix: "**", suffix: "**", placeholder: "bold text" },
              { label: "Italic", icon: Italic, prefix: "_", suffix: "_", placeholder: "italic text" },
              { label: "Quote", icon: Quote, prefix: "> ", suffix: "", placeholder: "quote" },
              { label: "List", icon: List, prefix: "- ", suffix: "", placeholder: "list item" }
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  aria-label={tool.label}
                  className="grid size-9 place-items-center rounded border border-charcoal-100 text-charcoal-700 hover:bg-charcoal-50"
                  key={tool.label}
                  onClick={() => wrapSelection(tool.prefix, tool.suffix, tool.placeholder)}
                  title={tool.label}
                  type="button"
                >
                  <Icon size={17} />
                </button>
              );
            })}
          </div>
          <textarea
            ref={contentRef}
            className="min-h-44 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("content", event.target.value)}
            required
            value={form.content}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Featured Image
          <div className="grid gap-3 border border-charcoal-100 bg-white p-4">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white">
              <ImageUp size={17} />
              {actionId === "blog-image-upload" ? "Uploading..." : "Upload Image"}
              <input
                accept="image/*"
                className="hidden"
                disabled={Boolean(actionId)}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onUploadImage(file);
                  }
                }}
                type="file"
              />
            </label>
            <input
              className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
              onChange={(event) => updateField("featuredImage", event.target.value)}
              placeholder="Or paste image URL"
              value={form.featuredImage}
            />
            {form.featuredImage ? (
              <img
                alt="Featured image preview"
                className="max-h-56 w-full object-cover"
                src={form.featuredImage}
              />
            ) : null}
          </div>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          SEO Title
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("seoTitle", event.target.value)}
            value={form.seoTitle}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          SEO Description
          <textarea
            className="min-h-24 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("seoDescription", event.target.value)}
            value={form.seoDescription}
          />
        </label>

        <button
          className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={Boolean(actionId)}
        >
          {actionId.includes("blog") ? "Saving..." : editingBlogId ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

function LeadershipPanel({
  actionId,
  editingId,
  form,
  isEditorOpen,
  records,
  onAddNew,
  onCancelEdit,
  onDelete,
  onEdit,
  onFormChange,
  onSubmit,
  onUploadImage
}: {
  actionId: string;
  editingId: number | null;
  form: LeadershipPayload;
  isEditorOpen: boolean;
  records: LeadershipRecord[];
  onAddNew: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
  onEdit: (profile: LeadershipRecord) => void;
  onFormChange: (form: LeadershipPayload) => void;
  onSubmit: () => void;
  onUploadImage: (file: File) => Promise<void>;
}) {
  function updateField<K extends keyof LeadershipPayload>(
    key: K,
    value: LeadershipPayload[K]
  ) {
    onFormChange({ ...form, [key]: value });
  }

  if (!isEditorOpen) {
    return (
      <div>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-3xl">Leadership Profiles</h2>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white"
            onClick={onAddNew}
          >
            <Plus size={17} />
            Add Profile
          </button>
        </div>

        {records.length === 0 ? (
          <div className="border border-charcoal-100 bg-white p-8 text-center text-charcoal-500">
            No leadership profiles yet.
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {records.map((profile) => (
            <article key={profile.id} className="border border-charcoal-100 bg-white p-5">
              <div className="flex gap-4">
                <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-forest-950 text-gold-200">
                  {profile.image_url ? (
                    <img
                      alt={profile.name}
                      className="h-full w-full object-cover"
                      src={profile.image_url}
                    />
                  ) : (
                    <span className="font-display text-3xl">
                      {profile.name.slice(0, 1)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl">{profile.name}</h3>
                    <StatusBadge status={profile.profile_type} />
                  </div>
                  <p className="text-sm font-semibold text-forest-700">
                    {profile.designation}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-charcoal-600">
                    {profile.bio || "No bio added."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="rounded-full border border-charcoal-100 px-4 py-2 text-xs font-bold hover:bg-charcoal-50"
                      onClick={() => onEdit(profile)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-full border border-red-100 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                      disabled={Boolean(actionId)}
                      onClick={() => onDelete(profile.id)}
                    >
                      {actionId === `leadership-${profile.id}-delete`
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form
      className="mx-auto grid max-w-4xl gap-5 border border-charcoal-100 bg-[#f8f6f1] p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
            Leadership CMS
          </p>
          <h2 className="mt-2 font-display text-3xl">
            {editingId ? "Edit Profile" : "Add Profile"}
          </h2>
        </div>
        <button
          className="rounded-full border border-charcoal-100 px-4 py-2 text-xs font-bold"
          onClick={onCancelEdit}
          type="button"
        >
          Back to Profiles
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("name", event.target.value)}
            required
            value={form.name}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Designation
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("designation", event.target.value)}
            required
            value={form.designation}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Profile Type
          <select
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) =>
              updateField("profileType", event.target.value as LeadershipPayload["profileType"])
            }
            value={form.profileType}
          >
            <option value="current">Current Leader</option>
            <option value="former">Former Leader</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Sort Order
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            min={0}
            onChange={(event) => updateField("sortOrder", Number(event.target.value))}
            type="number"
            value={form.sortOrder}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Profile Image
        <div className="grid gap-3 border border-charcoal-100 bg-white p-4">
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-bold text-white">
            <ImageUp size={17} />
            {actionId === "leadership-image-upload" ? "Uploading..." : "Upload Image"}
            <input
              accept="image/*"
              className="hidden"
              disabled={Boolean(actionId)}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onUploadImage(file);
                }
              }}
              type="file"
            />
          </label>
          <input
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="Or paste image URL"
            value={form.imageUrl}
          />
          {form.imageUrl ? (
            <img
              alt="Profile preview"
              className="max-h-64 w-full object-cover"
              src={form.imageUrl}
            />
          ) : null}
        </div>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Bio
        <textarea
          className="min-h-40 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
          onChange={(event) => updateField("bio", event.target.value)}
          value={form.bio}
        />
      </label>

      <button
        className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={Boolean(actionId)}
      >
        {actionId.includes("leadership")
          ? "Saving..."
          : editingId
            ? "Update Profile"
            : "Create Profile"}
      </button>
    </form>
  );
}
