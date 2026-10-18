import { Plus, Pencil, CheckCircle2, Trash2, ClipboardList } from "lucide-react";
import { StatusBadge, formatInr, percent } from "../shared";

export default function RequirementsSection({ requirements, reqFilter, setReqFilter, setEditingReqId, setReqForm, setShowReqModal, startEditRequirement, markFulfilled, deleteRequirement }) {
  const filtered = requirements.filter((item) => {
    if (reqFilter === "active") return item.status === "active";
    if (reqFilter === "fulfilled") return item.status === "fulfilled";
    return true;
  });

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy">My Requirements</h1>
          <p className="mt-1 text-sm text-muted">Post urgent needs, food supplies, and materials for donors to support.</p>
        </div>
        <button type="button" onClick={() => { setEditingReqId(null); setReqForm({ title: "", category: "Food & Nutrition", amountNeeded: "" }); setShowReqModal(true); }} className="inline-flex items-center gap-2 rounded-xl bg-leaf px-4 py-2.5 font-display text-sm font-bold text-white shadow-xs transition-colors hover:bg-leaf-deep"><Plus size={16} /> Add Requirement</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
        {[{ id: "all", label: `All (${requirements.length})` }, { id: "active", label: `Active (${requirements.filter((r) => r.status === "active").length})` }, { id: "fulfilled", label: `Fulfilled (${requirements.filter((r) => r.status === "fulfilled").length})` }].map(({ id, label }) => (
          <button key={id} type="button" onClick={() => setReqFilter(id)} className={`rounded-xl px-3.5 py-1.5 text-xs font-display font-bold transition-colors ${reqFilter === id ? "bg-navy text-white" : "bg-white text-muted hover:bg-mist hover:text-navy border border-line"}`}>{label}</button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const pct = percent(item.amountRaised, item.amountNeeded);
          return (
            <article key={item.id} className="rounded-2xl border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-display text-xl font-bold text-navy">{item.title}</h2>
                    <span className="rounded-md bg-mist px-2 py-0.5 text-xs font-semibold text-muted">{item.category || "General"}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-ink"><strong className="text-navy">{formatInr(item.amountNeeded)}</strong> needed · <span className="text-leaf">{formatInr(item.amountRaised)}</span> raised · <strong className="text-leaf-deep">{pct}% fulfilled</strong></p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-mist-deep"><div className="h-full rounded-full bg-leaf transition-all duration-500" style={{ width: `${pct}%` }} /></div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => startEditRequirement(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-mist/50"><Pencil size={13} /> Edit</button>
                  {item.status !== "fulfilled" && <button type="button" onClick={() => markFulfilled(item.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-leaf/30 bg-leaf-soft px-3 py-1.5 text-xs font-semibold text-leaf-deep transition-colors hover:bg-leaf/20"><CheckCircle2 size={13} /> Mark fulfilled</button>}
                  <button type="button" onClick={() => deleteRequirement(item.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-heart/20 px-3 py-1.5 text-xs font-semibold text-heart transition-colors hover:bg-red-50"><Trash2 size={13} /> Delete</button>
                </div>
                <span className="text-xs text-muted">Requirement ID: #{item.id}</span>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-muted">
            <ClipboardList className="mx-auto h-10 w-10 text-muted/50" />
            <p className="mt-3 font-display text-base font-bold text-navy">No requirements found</p>
            <p className="text-sm">Post a new requirement to connect with donors.</p>
          </div>
        )}
      </div>
    </div>
  );
}
