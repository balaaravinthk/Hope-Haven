import { Plus, Clock } from "lucide-react";
import { StatusBadge } from "../shared";
import { upcomingActivities } from "../constants";

export default function VolunteersSection({ volunteers, volunteerRequests, volunteerRoles, setVolunteerStatus, setShowRoleModal }) {
  return (
    <div className="space-y-8 animate-rise">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy">Volunteers</h1>
          <p className="mt-1 text-sm text-muted">Review volunteer applications, manage upcoming activities, and define volunteer needs.</p>
        </div>
        <button type="button" onClick={() => setShowRoleModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-leaf px-4 py-2.5 font-display text-sm font-bold text-white shadow-xs transition-colors hover:bg-leaf-deep"><Plus size={16} /> Post Volunteer Need</button>
      </div>

      {/* Volunteer Applications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-navy">Volunteer Applications ({volunteers.length})</h2>
          <span className="text-xs font-semibold text-muted">{volunteerRequests} pending review</span>
        </div>
        <div className="space-y-3">
          {volunteers.map((v) => (
            <article key={v.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-xs">
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="font-display text-lg font-bold text-navy">{v.name}</p>
                  <StatusBadge status={v.status} />
                </div>
                <p className="mt-1 text-sm text-ink font-medium">Skill: <span className="text-leaf-deep font-semibold">{v.skill}</span></p>
                <p className="mt-0.5 text-xs text-muted">Applied: {v.date} · Contact: {v.phone} ({v.email})</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {v.status === "pending" ? (
                  <>
                    <button type="button" onClick={() => setVolunteerStatus(v.id, "accepted")} className="rounded-xl bg-leaf px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-leaf-deep">Accept</button>
                    <button type="button" onClick={() => setVolunteerStatus(v.id, "rejected")} className="rounded-xl border border-heart/25 px-4 py-2 text-xs font-bold text-heart transition-colors hover:bg-red-50">Reject</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setVolunteerStatus(v.id, "pending")} className="rounded-xl border border-line px-3 py-1.5 text-xs font-semibold text-muted hover:text-navy">Reset status</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Upcoming Activities & Volunteer Roles */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-navy">Upcoming Volunteer Activities</h2>
          <ul className="mt-4 divide-y divide-line">
            {upcomingActivities.map((a) => (
              <li key={a.id} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{a.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><Clock size={12} /> {a.when}</p>
                  </div>
                  <span className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-bold text-leaf-deep">{a.people} volunteers confirmed</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Manage Volunteer Roles</h2>
            <button type="button" onClick={() => setShowRoleModal(true)} className="inline-flex items-center gap-1 text-xs font-bold text-leaf hover:text-leaf-deep"><Plus size={14} /> Add Role</button>
          </div>
          <div className="mt-4 space-y-3">
            {volunteerRoles.map((role) => (
              <div key={role.id} className="rounded-xl border border-line bg-mist/30 p-3.5">
                <div className="flex items-center justify-between">
                  <p className="font-display font-bold text-navy text-sm">{role.roleTitle}</p>
                  <StatusBadge status={role.status} />
                </div>
                <p className="mt-1 text-xs text-muted">Schedule: {role.days} · {role.filled} of {role.needed} filled</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
