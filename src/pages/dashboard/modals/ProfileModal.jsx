import { X } from "lucide-react";

const inputCls = "w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2 text-sm outline-none focus:border-leaf";

export default function ProfileModal({ show, form, setForm, onClose, onSave }) {
  if (!show) return null;
  const f = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl border border-line bg-white p-6 shadow-2xl animate-rise my-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h3 className="font-display text-lg font-bold text-navy">Edit Organization Details</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:text-navy"><X size={18} /></button>
        </div>
        <form onSubmit={onSave} className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-navy">Organization Name *</span>
            <input required value={form.name} onChange={f("name")} className={inputCls} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">Organization Type</span><input value={form.type} onChange={f("type")} className={inputCls} /></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">Authorized Person Name</span><input value={form.authorizedPerson} onChange={f("authorizedPerson")} className={inputCls} /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">Contact Phone</span><input value={form.contact} onChange={f("contact")} className={inputCls} /></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">Email Address</span><input type="email" value={form.email} onChange={f("email")} className={inputCls} /></label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-navy">Postal Address</span>
            <textarea rows={2} value={form.address} onChange={f("address")} className={inputCls} />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">Registration No</span><input value={form.registrationNumber} onChange={f("registrationNumber")} className={inputCls} /></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">PAN Number</span><input value={form.pan} onChange={f("pan")} className={inputCls} /></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-navy">CCI / JJ Number</span><input value={form.cciJj} onChange={f("cciJj")} className={inputCls} /></label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button type="button" onClick={onClose} className="rounded-xl border border-line px-4 py-2 font-display text-sm font-bold text-muted hover:text-navy">Cancel</button>
            <button type="submit" className="rounded-xl bg-leaf px-5 py-2 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
