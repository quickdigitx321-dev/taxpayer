const statusStyles: Record<string, string> = {
  approved: "bg-forest-50 text-forest-800",
  pending: "bg-gold-50 text-gold-700",
  rejected: "bg-red-50 text-red-700",
  in_process: "bg-blue-50 text-blue-700",
  resolved: "bg-forest-50 text-forest-800",
  new: "bg-gold-50 text-gold-700",
  read: "bg-forest-50 text-forest-800",
  archived: "bg-charcoal-100 text-charcoal-700",
  draft: "bg-charcoal-100 text-charcoal-700",
  published: "bg-forest-50 text-forest-800",
  current: "bg-forest-50 text-forest-800",
  former: "bg-gold-50 text-gold-700"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
        statusStyles[status] || "bg-charcoal-100 text-charcoal-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
