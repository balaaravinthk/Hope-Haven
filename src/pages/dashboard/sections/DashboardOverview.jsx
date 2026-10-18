import {
  Sparkles, ShieldCheck, ShieldAlert, Ban, Clock,
  HandCoins, ClipboardList, Users, CheckCircle2,
  Plus, Building2, ArrowUpRight, Check,
} from "lucide-react";
import { StatusBadge, formatInr, percent } from "../shared";
import { recentActivities } from "../constants";

export default function DashboardOverview({
  profile, verificationStatus, setVerificationStatus, requirements, donations,
  totalDonations, activeRequirements, volunteerRequests,
  setSection, setEditingReqId, setReqForm, setShowReqModal,
}) {
  const alerts = {
    Pending: { border: "border-amber-300/40", bg: "bg-glow", text: "text-navy", Icon: Clock, iconCls: "text-amber-600", title: "Documents Under Verification", desc: "Your orphanage profile and documents are currently under review by our admin team. You can still set up requirements and view donations. Verification usually takes 24–48 hours." },
    Verified: { border: "border-leaf/30", bg: "bg-leaf-soft", text: "text-leaf-deep", Icon: ShieldCheck, iconCls: "text-leaf", title: "Organization Verified & Active", desc: "Your orphanage is verified! Donors and volunteers can discover your profile, donate directly, and apply to volunteer." },
    Rejected: { border: "border-heart/25", bg: "bg-red-50", text: "text-heart", Icon: Ban, iconCls: "text-heart", title: "Verification Needs Attention", desc: "Your submitted verification documents could not be verified. Please visit the Profile section to update your details and re-upload valid proofs." },
  };
  const alert = alerts[verificationStatus];

  const stats = [
    { label: "Total donations", value: formatInr(totalDonations), sub: <><span className="font-bold text-leaf">{donations.length}</span> contributions received</>, icon: HandCoins, nav: "donations" },
    { label: "Active requirements", value: activeRequirements, sub: "Needs awaiting donor fulfillment", icon: ClipboardList, nav: "requirements" },
    { label: "Volunteer requests", value: volunteerRequests, sub: "Applications pending your review", icon: Users, nav: "volunteers" },
    { label: "Fulfilled needs", value: requirements.filter((r) => r.status === "fulfilled").length, sub: "Successfully supported by community", icon: CheckCircle2, nav: "requirements" },
  ];

  return (
    <div className="space-y-8 animate-rise">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-bold text-leaf-deep">
            <Sparkles size={14} className="text-leaf" /> Orphanage Portal Active
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy md:text-4xl">Welcome, {profile.name}</h1>
          <p className="mt-1 text-sm text-muted">Overview of your home's active requirements, donations, and volunteer support.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-xs">
          <div className="text-right">
            <span className="block text-xs font-semibold text-muted">Verification status</span>
            <div className="mt-0.5 flex items-center gap-1.5">
              {verificationStatus === "Verified" ? <ShieldCheck size={16} className="text-leaf" /> : verificationStatus === "Rejected" ? <Ban size={16} className="text-heart" /> : <ShieldAlert size={16} className="text-amber-500" />}
              <StatusBadge status={verificationStatus} />
            </div>
          </div>
          <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)} className="rounded-lg border border-line bg-mist/60 px-2 py-1 text-xs font-bold text-navy outline-none focus:border-leaf" title="Test Verification States">
            <option value="Pending">Test: Pending</option>
            <option value="Verified">Test: Verified</option>
            <option value="Rejected">Test: Rejected</option>
          </select>
        </div>
      </div>

      {/* Verification Alert */}
      {alert && (
        <div className={`flex items-start gap-3.5 rounded-2xl border ${alert.border} ${alert.bg} p-4 ${alert.text}`}>
          <alert.Icon className={`mt-0.5 shrink-0 ${alert.iconCls}`} size={20} />
          <div className="text-sm"><p className="font-bold">{alert.title}</p><p className="mt-0.5 opacity-90">{alert.desc}</p></div>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, nav }) => (
          <div key={label} onClick={() => setSection(nav)} className="group cursor-pointer rounded-2xl border border-line bg-white p-5 transition-all hover:border-leaf/50 hover:shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-soft text-leaf transition-transform group-hover:scale-110"><Icon size={18} /></div>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-navy">{value}</p>
            <p className="mt-1 text-xs text-muted flex items-center gap-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => { setSection("requirements"); setEditingReqId(null); setReqForm({ title: "", category: "Food & Nutrition", amountNeeded: "" }); setShowReqModal(true); }} className="inline-flex items-center gap-2 rounded-xl bg-leaf px-4 py-2.5 font-display text-sm font-bold text-white shadow-xs transition-colors hover:bg-leaf-deep"><Plus size={16} /> Add New Requirement</button>
        <button type="button" onClick={() => setSection("volunteers")} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 font-display text-sm font-bold text-navy transition-colors hover:border-leaf/40 hover:bg-mist/40"><Users size={16} /> Review Volunteers ({volunteerRequests})</button>
        <button type="button" onClick={() => setSection("profile")} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 font-display text-sm font-bold text-navy transition-colors hover:border-leaf/40 hover:bg-mist/40"><Building2 size={16} /> View Organization Profile</button>
      </div>

      {/* Requirements Progress & Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Requirements Progress</h2>
            <button type="button" onClick={() => setSection("requirements")} className="inline-flex items-center gap-1 text-xs font-bold text-leaf hover:text-leaf-deep">View all ({requirements.length}) <ArrowUpRight size={14} /></button>
          </div>
          <div className="mt-5 space-y-4">
            {requirements.slice(0, 3).map((item) => {
              const pct = percent(item.amountRaised, item.amountNeeded);
              return (
                <div key={item.id} className="rounded-xl border border-line bg-mist/30 p-4 transition-colors hover:bg-mist/60">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div><span className="font-display font-bold text-navy">{item.title}</span><span className="ml-2 text-xs font-semibold text-muted">— {formatInr(item.amountNeeded)} needed</span></div>
                    <span className="text-xs font-extrabold text-leaf">{pct}% fulfilled</span>
                  </div>
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-mist-deep"><div className="h-full rounded-full bg-leaf transition-all duration-500" style={{ width: `${pct}%` }} /></div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted"><span>Raised: {formatInr(item.amountRaised)}</span><StatusBadge status={item.status} /></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Recent Activities</h2>
            <button type="button" onClick={() => setSection("notifications")} className="inline-flex items-center gap-1 text-xs font-bold text-leaf hover:text-leaf-deep">All notifications <ArrowUpRight size={14} /></button>
          </div>
          <ul className="mt-5 divide-y divide-line">
            {recentActivities.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-leaf-soft text-leaf"><Check size={14} /></div>
                  <span className="text-ink">{item.text}</span>
                </div>
                <span className="shrink-0 text-xs font-medium text-muted">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
