import {
  BadgeCheck,
  BookOpenText,
  Building2,
  FileCheck2,
  Handshake,
  Landmark,
  Mail,
  MessageSquareText,
  Newspaper,
  Scale,
  ShieldCheck,
  UsersRound
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "/leadership" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" }
];

export const siteStats = [
  { value: "01", label: "National platform" },
  { value: "24/7", label: "Digital submissions" },
  { value: "03", label: "Core public channels" },
  { value: "100%", label: "Responsive experience" }
];

export const services = [
  {
    title: "Membership Applications",
    href: "/membership",
    description:
      "Structured membership intake with identity, organization, and contact information for admin review.",
    icon: FileCheck2
  },
  {
    title: "Taxpayer Advocacy",
    href: "/services",
    description:
      "A professional platform for representation, awareness, and communication around taxpayer concerns.",
    icon: Scale
  },
  {
    title: "Complaints & Suggestions",
    href: "/complaints",
    description:
      "Dedicated public submission channel for issues, suggestions, and follow-up through admin status tracking.",
    icon: MessageSquareText
  },
  {
    title: "Articles & Updates",
    href: "/blogs",
    description:
      "SEO-friendly articles, notices, and public education content for members and wider audiences.",
    icon: Newspaper
  },
  {
    title: "Leadership Profiles",
    href: "/leadership",
    description:
      "Current and former leadership profiles presented with a polished institutional layout.",
    icon: UsersRound
  },
  {
    title: "Contact & Outreach",
    href: "/contact",
    description:
      "Accessible contact details and inquiry channels for members, taxpayers, and partner organizations.",
    icon: Mail
  }
];

export const values = [
  {
    title: "Credibility",
    description:
      "Every section should build trust with clear language, formal presentation, and careful handling of sensitive submissions.",
    icon: ShieldCheck
  },
  {
    title: "Representation",
    description:
      "TPAP needs a digital platform that can support members, leadership, and taxpayer-facing communication.",
    icon: Handshake
  },
  {
    title: "Public Access",
    description:
      "Membership, complaints, contact, and updates are kept easy to find across desktop and mobile screens.",
    icon: Landmark
  }
];

export const blogs = [
  {
    slug: "strengthening-taxpayer-representation",
    title: "Strengthening Taxpayer Representation in Pakistan",
    category: "Advocacy",
    date: "June 01, 2026",
    readTime: "4 min read",
    excerpt:
      "Why organized representation matters for taxpayers, businesses, and public-sector confidence.",
    body: [
      "Effective taxpayer representation begins with clear communication, organized membership, and accessible public channels.",
      "Tax Payer Alliance Pakistan provides a platform where members and the wider public can follow updates, understand priorities, and connect with the organization.",
      "By bringing applications, articles, leadership profiles, and submissions into one official location, TPAP can strengthen trust and improve engagement."
    ]
  },
  {
    slug: "digital-membership-workflows",
    title: "Designing a Better Digital Membership Workflow",
    category: "Membership",
    date: "June 01, 2026",
    readTime: "5 min read",
    excerpt:
      "A practical look at application review, duplicate prevention, and status-based membership handling.",
    body: [
      "A membership application is often the first formal step between an applicant and an organization.",
      "For TPAP, the process should be clear, respectful, and structured so applicants can provide the information required for proper review.",
      "A reliable membership workflow supports transparency, organized decision-making, and stronger communication with approved members."
    ]
  },
  {
    slug: "secure-public-submissions",
    title: "Making Public Submissions Secure and Manageable",
    category: "Complaints",
    date: "June 01, 2026",
    readTime: "3 min read",
    excerpt:
      "How complaint and suggestion forms can stay accessible while still protecting data and reducing spam.",
    body: [
      "Public complaints and suggestions should be easy to submit and handled with care.",
      "A dedicated submission channel helps TPAP receive concerns in a structured way and review them through a consistent process.",
      "This approach gives the public a clear way to communicate while helping the organization respond with accountability."
    ]
  }
];

export const leaders = [
  {
    name: "Ahsan Qureshi",
    role: "Chairman",
    bio: "Official leadership profile prepared for TPAP's public-facing executive section."
  },
  {
    name: "Sara Malik",
    role: "General Secretary",
    bio: "Official profile details can be updated by TPAP through the leadership management panel."
  },
  {
    name: "Hamza Farooq",
    role: "Member Executive Council",
    bio: "Leadership profile prepared for current and former representatives of the organization."
  }
];

export const objectives = [
  "Establish a trusted official digital presence for TPAP.",
  "Support membership applications and admin approval workflows.",
  "Publish articles, updates, leadership profiles, and public resources.",
  "Receive contact inquiries, complaints, and suggestions through structured forms.",
  "Support clear communication for members, taxpayers, and the wider public."
];

export const quickActions = [
  { title: "Become a Member", href: "/membership", icon: BadgeCheck },
  { title: "Submit Complaint", href: "/complaints", icon: MessageSquareText },
  { title: "Read Articles", href: "/blogs", icon: BookOpenText },
  { title: "Contact TPAP", href: "/contact", icon: Building2 }
];
