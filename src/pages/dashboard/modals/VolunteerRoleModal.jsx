import { X } from "lucide-react";

export default function VolunteerRoleModal({ show, roleForm, setRoleForm, onClose, onSave }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-rise">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h3 className="font-display text-lg font-bold text-navy">Post Volunteer Need</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:text-navy"><X size={18} /></button>
        </div>
        <form onSubmit={onSave} className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Role Title *</span>
            <input required value={roleForm.roleTitle} onChange={(e) => setRoleForm((p) => ({ ...p, roleTitle: e.target.value }))} placeholder="e.g. Science Tutor, Sports Coach, Cook Helper" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Volunteers Needed</span>
            <input required type="number" min="1" value={roleForm.needed} onChange={(e) => setRoleForm((p) => ({ ...p, needed: e.target.value }))} className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Expected Days & Time</span>
            <input required value={roleForm.days} onChange={(e) => setRoleForm((p) => ({ ...p, days: e.target.value }))} placeholder="e.g. Saturdays 10am - 12pm" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button type="button" onClick={onClose} className="rounded-xl border border-line px-4 py-2.5 font-display text-sm font-bold text-muted hover:text-navy">Cancel</button>
            <button type="submit" className="rounded-xl bg-leaf px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep">Post Role</button>
          </div>
        </form>
      </div>
    </div>
  );
}
