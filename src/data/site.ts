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
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Policy Advocacy", href: "/policy-advocacy" },
  { label: "Complaints", href: "/complaints" },
  { label: "Leadership", href: "/leadership" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const siteStats = [
  { value: "5M+", label: "Registered taxpayers largely unrepresented in policy dialogue" },
  { value: "50+", label: "Withholding tax categories burdening Pakistani businesses" },
  { value: "Bottom 5", label: "Pakistan ranks among the lowest tax-to-GDP ratios in Asia" },
  { value: "2020", label: "Year TPAP was founded to change this reality" }
];

export const services = [
  {
    title: "Membership Applications",
    href: "/membership",
    description:
      "Join a credible national movement representing taxpayers in policy consultations, budget hearings, and reform dialogue.",
    icon: FileCheck2
  },
  {
    title: "Taxpayer Advocacy",
    href: "/policy-advocacy",
    description:
      "Research-backed engagement with FBR, government, parliament, trade bodies, and the wider public.",
    icon: Scale
  },
  {
    title: "Complaints & Suggestions",
    href: "/complaints",
    description:
      "A confidential channel for taxpayer grievances, guidance, complaint documentation, and systemic advocacy.",
    icon: MessageSquareText
  },
  {
    title: "Articles & Updates",
    href: "/blogs",
    description:
      "Expert analysis on tax reform, fiscal governance, public spending, business regulation, and taxpayer rights.",
    icon: Newspaper
  },
  {
    title: "Leadership Profiles",
    href: "/leadership",
    description:
      "Meet the economists, policy professionals, business leaders, and advocates guiding TPAP's work.",
    icon: UsersRound
  },
  {
    title: "Contact & Outreach",
    href: "/contact",
    description:
      "Connect with TPAP for membership support, media inquiries, partnerships, and public correspondence.",
    icon: Mail
  }
];

export const values = [
  {
    title: "Credibility",
    description:
      "TPAP advances professionally researched, evidence-based positions grounded in the interests of Pakistan's taxpayers.",
    icon: ShieldCheck
  },
  {
    title: "Representation",
    description:
      "Pakistan's taxpayers deserve an organised voice in the fiscal decisions that shape their lives and businesses.",
    icon: Handshake
  },
  {
    title: "Accountability",
    description:
      "Taxation is a social contract. Public revenue must be raised fairly, spent transparently, and deliver genuine value.",
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
  "Influence public policy for lower taxes and meaningful taxation reforms.",
  "Dispel misconceptions regarding tax compliance levels in Pakistan.",
  "Create an environment that promotes ease of doing business.",
  "Reduce undue and wasteful government expenditures.",
  "Encourage transparency and accountability in public finance."
];

export const quickActions = [
  { title: "Become a Member", href: "/membership", icon: BadgeCheck },
  { title: "Submit Complaint", href: "/complaints", icon: MessageSquareText },
  { title: "Read Articles", href: "/blogs", icon: BookOpenText },
  { title: "Contact TPAP", href: "/contact", icon: Building2 }
];

export const memberBenefits = [
  "Add your voice to a credible, research-backed national advocacy organisation",
  "Ensure your interests are represented in budget hearings and policy consultations",
  "Access to exclusive tax reform research and reports",
  "Network with business leaders, economists, and policy professionals",
  "Receive early alerts on tax law changes, SRO updates, and budget developments",
  "Get support navigating taxpayer complaints and FBR grievances",
  "Participate in shaping TPAP's policy positions and advocacy agenda"
];

export const homeMemberBenefits = [
  "Collective advocacy at national policy forums",
  "Access to exclusive tax reform research and reports",
  "Representation in FBR consultations and budget hearings",
  "Legal guidance and complaint resolution support",
  "Networking with Pakistan's leading business and policy minds",
  "Priority access to TPAP events, seminars, and webinars"
];

export const strategicPriorities = [
  {
    title: "Policy Influence",
    description:
      "Research, policy submissions, budget recommendations, and stakeholder engagement that shape fiscal legislation."
  },
  {
    title: "Taxpayer Education",
    description:
      "Accessible and credible guidance on taxpayer rights, obligations, and Pakistan's broader economic context."
  },
  {
    title: "Complaint Advocacy",
    description:
      "A structured platform for taxpayers to report grievances and seek institutional support."
  },
  {
    title: "Coalition Building",
    description:
      "Partnerships with trade bodies, professional associations, civil society, and academic institutions."
  },
  {
    title: "Media & Public Discourse",
    description:
      "Evidence-led public communication on taxation, spending, accountability, and fiscal governance."
  }
];

export const membershipCategories = [
  {
    title: "Individual Membership",
    description:
      "For salaried professionals, self-employed individuals, freelancers, and any Pakistani citizen who pays taxes or cares about tax policy.",
    benefits: [
      "Full voting rights at TPAP forums",
      "Access to member newsletter and policy updates",
      "Participation in TPAP events and webinars",
      "Complaint filing support"
    ]
  },
  {
    title: "Business Membership",
    description:
      "For SMEs, partnerships, and growing businesses seeking representation in the tax policy dialogue.",
    benefits: [
      "All individual membership benefits",
      "Priority access to policy submissions and budget recommendation processes",
      "Business-specific tax advisory resources",
      "Invitation to closed-door policy briefings"
    ]
  },
  {
    title: "Student Membership",
    description:
      "For university students, researchers, and young professionals passionate about economic policy and fiscal reform.",
    benefits: [
      "Access to TPAP research library",
      "Mentorship opportunities with TPAP's policy team",
      "Participation in TPAP policy competitions and fellowships",
      "Invitation to TPAP seminars and capacity-building events"
    ]
  },
  {
    title: "Corporate Membership",
    description:
      "For large enterprises, industry groups, and institutional stakeholders seeking meaningful engagement with Pakistan's tax reform agenda.",
    benefits: [
      "All business membership benefits",
      "Dedicated policy liaison from TPAP's research team",
      "Co-branding on TPAP research and advocacy publications",
      "Representation on TPAP's Industry Advisory Panel",
      "Speaking opportunities at national TPAP forums"
    ]
  }
];

export const membershipEligibility = [
  "Pakistani citizens residing in Pakistan or abroad (NRPs)",
  "Businesses registered in Pakistan, from sole proprietorships to large corporates",
  "Students enrolled in accredited academic institutions",
  "Professionals including lawyers, accountants, consultants, and economists",
  "Any individual who supports TPAP's mission of fair taxation and fiscal transparency"
];

export const taxpayerRights = [
  "Be treated with fairness, dignity, and respect by tax authorities",
  "Receive clear, timely, and accurate information about tax obligations",
  "Appeal tax assessments, demand notices, and enforcement actions",
  "Receive refunds within legally stipulated timeframes",
  "Conduct business without harassment, arbitrary raids, or coercive pressure",
  "Have confidential financial information protected",
  "Access legal representation in proceedings",
  "Be presumed compliant unless evidence suggests otherwise"
];

export const complaintCategories = [
  {
    title: "Harassment by Tax Authorities",
    description:
      "Unannounced raids, threatening communications, coercive payment demands, and any form of intimidation by FBR or provincial tax authority officials."
  },
  {
    title: "Delayed or Rejected Refunds",
    description:
      "Income tax or sales tax refunds that have been unreasonably delayed, improperly rejected, or subjected to arbitrary conditions."
  },
  {
    title: "Unfair or Incorrect Assessments",
    description:
      "Tax demands issued without proper basis, inflated assessments, or notices that misapply the law to your specific situation."
  },
  {
    title: "Excessive Compliance Burden",
    description:
      "Cases where the volume, complexity, or cost of compliance requirements is disproportionate, particularly for small businesses and individual taxpayers."
  },
  {
    title: "Regulatory Barriers to Business",
    description:
      "Licensing, registration, or operational requirements imposed by tax authorities that unreasonably obstruct legitimate business activity."
  },
  {
    title: "Corruption and Bribery",
    description:
      "Any instance where a tax official requests or demands informal payments in exchange for fair treatment, processing, or compliance clearance."
  },
  {
    title: "Policy Grievances",
    description:
      "Concerns about specific tax laws, regulations, or SROs that you believe are unjust, impractical, or economically harmful."
  }
];

export const complaintAssistance = [
  "Documenting and recording your grievance formally",
  "Providing guidance on relevant legal provisions and appeal processes",
  "Escalating systemic issues to FBR, parliamentary committees, or public forums",
  "Preparing and submitting policy briefs based on complaint patterns",
  "Connecting members with qualified tax lawyers and consultants in our network",
  "Advocating publicly on your behalf where appropriate and with your consent"
];

export const complaintProcess = [
  "Complete the TPAP Complaint Form, available online or at any TPAP regional office.",
  "Provide all relevant documentation, including notices, correspondence, assessment orders, or supporting evidence.",
  "TPAP's support team reviews and acknowledges your submission within 48 business hours.",
  "Your case is assessed by TPAP's policy and legal team. Where appropriate, you are connected with professional support.",
  "Systemic issues are aggregated into TPAP's advocacy database and used to inform policy submissions and public campaigns."
];

export const policyWork = [
  "Annual pre-budget recommendations for the Ministry of Finance and FBR",
  "Quarterly reviews of SROs, circulars, and legislative changes",
  "Sector-specific white papers on SMEs, real estate, agriculture, and the digital economy",
  "Pakistan Tax Burden Index assessing compliance costs across sectors",
  "Government Expenditure Watch monitoring wasteful spending and fiscal accountability"
];

export const impactAreas = [
  "Federal budget advocacy and pre-budget recommendations",
  "FBR reform and digitisation support",
  "Reduction of withholding tax complexity",
  "GST simplification for SMEs",
  "Taxpayer rights documentation and legal support",
  "Government expenditure transparency campaigns",
  "Ease of doing business regulatory reform"
];

export const futureRoadmap = [
  "Establish regional TPAP chapters in all four provinces and major urban centres",
  "Launch Pakistan's first comprehensive Taxpayer Rights Charter",
  "Produce annual Pakistan Tax Burden Index",
  "Develop TPAP's digital complaint and grievance platform",
  "Engage parliamentary standing committees on finance with formal submissions",
  "Launch taxpayer education curriculum for universities and professional institutes"
];

export const policyAwareness = [
  "Digital campaigns explaining tax laws in plain language",
  "Awareness drives on taxpayer rights and complaint mechanisms",
  "Partnerships with universities and professional institutes for fiscal literacy",
  "Media collaborations to bring tax policy into mainstream public discourse"
];

export const legislativeAdvocacy = [
  "Formal written submissions to parliamentary committees",
  "Briefings for individual parliamentarians and their staff",
  "Coalition letters co-signed by allied organisations",
  "Public statements and media campaigns on specific legislative proposals"
];

export const faqs = [
  {
    question: "What is TPAP?",
    answer:
      "TPAP is a national taxpayer advocacy organisation established in 2020 under PRIME. It is a voluntary alliance dedicated to lower taxes, simpler compliance, fiscal transparency, and accountable government spending."
  },
  {
    question: "Who can join TPAP?",
    answer:
      "Anyone who supports TPAP's mission can join, including individual taxpayers, business owners, professionals, students, corporate entities, and Pakistani diaspora members."
  },
  {
    question: "How much does membership cost?",
    answer:
      "Individual membership is currently free. Business, student, and corporate membership categories are available with benefits suited to each group."
  },
  {
    question: "What are the benefits of TPAP membership?",
    answer:
      "Members receive access to exclusive research reports, policy updates, complaint support, networking opportunities, event invitations, and the ability to participate in TPAP's advocacy and policy submissions."
  },
  {
    question: "Is TPAP affiliated with a political party?",
    answer:
      "No. TPAP is non-partisan and engages governments and political stakeholders on the basis of research, policy merit, and taxpayer interests."
  },
  {
    question: "How does TPAP handle member information?",
    answer:
      "Member information is kept strictly confidential and used only for communication, engagement, and advocacy purposes. We do not share member data with any third parties, including government bodies."
  },
  {
    question: "How do I know if I must file a tax return?",
    answer:
      "Any individual whose annual income exceeds the taxable threshold is required to file. Individuals owning property, vehicles, or foreign accounts above certain thresholds must also file regardless of income. Consult FBR's website or a qualified tax advisor for current requirements."
  },
  {
    question: "What is withholding tax and why does it affect my business?",
    answer:
      "Withholding tax is collected at source from payments made by one party to another. Pakistan has over 50 withholding categories covering salaries, rent, contracts, imports, exports, banking transactions, and more, creating significant compliance burdens, particularly for SMEs."
  },
  {
    question: "What is the difference between direct and indirect taxes?",
    answer:
      "Direct taxes, including income and corporate tax, are levied on income and profits. Indirect taxes, including GST and FED, are levied on transactions, goods, and services. Pakistan's structure is heavily weighted toward indirect taxes, which tend to be regressive."
  },
  {
    question: "Why does Pakistan have a low tax-to-GDP ratio?",
    answer:
      "Pakistan's ratio reflects a large informal economy, complex compliance requirements, weak enforcement, tax exemptions for influential sectors, and limited public trust in how revenues are spent. TPAP advocates for reforms addressing all of these simultaneously."
  },
  {
    question: "Can TPAP help with an FBR dispute?",
    answer:
      "TPAP can guide taxpayers on rights, appeal processes, and available remedies, escalate systemic issues, and connect members with qualified professionals. TPAP is not a law firm."
  },
  {
    question: "What types of complaints does TPAP accept?",
    answer:
      "Tax authority harassment, delayed refunds, unfair assessments, excessive compliance burdens, regulatory barriers, corruption concerns, and policy grievances."
  },
  {
    question: "Is complaint information confidential?",
    answer:
      "Yes. Complaint information is handled confidentially and is not shared with government authorities or third parties without explicit written consent."
  },
  {
    question: "How long does TPAP take to respond to a complaint?",
    answer:
      "TPAP acknowledges all complaints within 48 business hours. The timeline for substantive guidance or escalation depends on the nature and complexity of the issue."
  },
  {
    question: "How does TPAP engage with the government on tax policy?",
    answer:
      "TPAP submits formal policy recommendations to the Ministry of Finance and FBR, participates in pre-budget consultations, provides testimony to parliamentary standing committees, and engages directly with senior policymakers."
  },
  {
    question: "Can I contribute to TPAP's research or advocacy campaigns?",
    answer:
      "Absolutely. Members can contribute insights, data, case studies, and professional expertise to TPAP's research process. Guest contributions to the TPAP Blog from qualified professionals are also welcome."
  },
  {
    question: "Does TPAP oppose all taxation?",
    answer:
      "No. TPAP supports fair, simple, and proportionate taxation alongside transparent and effective government spending."
  },
  {
    question: "What events does TPAP organise?",
    answer:
      "TPAP organises national conferences, policy roundtables, budget analysis sessions, taxpayer rights workshops, webinars, and regional chapter events throughout the year. Members receive priority access and advance notice for all events."
  },
  {
    question: "Can my organisation partner with TPAP?",
    answer:
      "Yes. TPAP actively seeks partnerships with trade bodies, professional associations, chambers of commerce, academic institutions, media organisations, and civil society groups."
  },
  {
    question: "How can I stay updated on TPAP's activities?",
    answer:
      "Subscribe to the TPAP Bulletin, follow TPAP on LinkedIn, Facebook, Instagram, and X at @tpap_prime, or visit the website for the latest research, news, and events."
  }
];
