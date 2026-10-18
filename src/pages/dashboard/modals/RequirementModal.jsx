import { X } from "lucide-react";

export default function RequirementModal({ show, editingReqId, reqForm, setReqForm, onClose, onSave }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-rise">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h3 className="font-display text-lg font-bold text-navy">{editingReqId ? "Edit Requirement" : "Add New Requirement"}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:text-navy"><X size={18} /></button>
        </div>
        <form onSubmit={onSave} className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Requirement Title *</span>
            <input required value={reqForm.title} onChange={(e) => setReqForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Food supplies, School uniforms, Medicine" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf focus:bg-white" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Category</span>
            <select value={reqForm.category} onChange={(e) => setReqForm((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf focus:bg-white">
              <option value="Food & Nutrition">Food & Nutrition</option>
              <option value="Education">Education & Books</option>
              <option value="Healthcare">Healthcare & Medicines</option>
              <option value="Clothing">Clothing & Bedding</option>
              <option value="Facility & Infrastructure">Facility Maintenance</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-navy">Amount Needed (₹) *</span>
            <input required type="number" min="1" value={reqForm.amountNeeded} onChange={(e) => setReqForm((p) => ({ ...p, amountNeeded: e.target.value }))} placeholder="15000" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf focus:bg-white" />
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button type="button" onClick={onClose} className="rounded-xl border border-line px-4 py-2.5 font-display text-sm font-bold text-muted hover:text-navy">Cancel</button>
            <button type="submit" className="rounded-xl bg-leaf px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep">{editingReqId ? "Save Changes" : "Post Requirement"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
