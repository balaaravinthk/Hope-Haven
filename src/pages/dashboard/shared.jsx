export function formatInr(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

export function percent(raised, needed) {
  if (!needed) return 0;
  return Math.min(100, Math.round((raised / needed) * 100));
}

export function StatusBadge({ status }) {
  const map = {
    Pending: "bg-glow text-navy border-amber-300/40",
    Verified: "bg-leaf-soft text-leaf-deep border-leaf/30",
    Rejected: "bg-red-50 text-heart border-heart/25",
    active: "bg-leaf-soft text-leaf-deep border-leaf/30",
    fulfilled: "bg-mist text-muted border-line",
    Completed: "bg-leaf-soft text-leaf-deep border-leaf/30",
    pending: "bg-glow text-navy border-amber-300/40",
    accepted: "bg-leaf-soft text-leaf-deep border-leaf/30",
    rejected: "bg-red-50 text-heart border-heart/25",
    Open: "bg-leaf-soft text-leaf-deep border-leaf/30",
    Filled: "bg-mist text-muted border-line",
  };
  const labels = { active: "Active", fulfilled: "Fulfilled", pending: "Pending", accepted: "Accepted", rejected: "Rejected" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-display font-bold ${map[status] || "bg-mist text-muted border-line"}`}>
      {labels[status] || status}
    </span>
  );
}
