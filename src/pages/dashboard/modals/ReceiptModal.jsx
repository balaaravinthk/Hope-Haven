import { X, HandCoins, Printer } from "lucide-react";
import { StatusBadge, formatInr } from "../shared";

export default function ReceiptModal({ receipt, profile, onClose }) {
  if (!receipt) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl animate-rise md:p-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-leaf-soft text-leaf"><HandCoins size={16} /></div>
            <h3 className="font-display text-lg font-bold text-navy">Donation Receipt</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:text-navy"><X size={18} /></button>
        </div>

        <div className="mt-5 rounded-2xl border border-line/80 bg-mist/20 p-6 space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-line/60 pb-3">
            <div>
              <p className="font-display font-extrabold text-navy text-base">{profile.name}</p>
              <p className="text-xs text-muted">Reg. No: {profile.registrationNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs font-bold text-navy">{receipt.id}</p>
              <p className="text-xs text-muted">{receipt.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-muted block">Donor Name:</span><strong className="text-navy text-sm font-display">{receipt.showDonor ? receipt.donor : "Anonymous Donor"}</strong></div>
            <div><span className="text-muted block">Payment Method:</span><strong className="text-navy">{receipt.paymentMethod}</strong></div>
            <div><span className="text-muted block">Tax Exemption:</span><strong className="text-leaf-deep font-semibold">80G Approved (AAATC1234F20261)</strong></div>
            <div><span className="text-muted block">Status:</span><StatusBadge status={receipt.status} /></div>
          </div>
          <div className="rounded-xl border border-leaf/30 bg-leaf-soft p-4 text-center">
            <span className="text-xs font-semibold text-leaf-deep block uppercase tracking-wider">Total Amount Received</span>
            <span className="font-display text-3xl font-extrabold text-navy block mt-1">{formatInr(receipt.amount)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 font-display text-sm font-bold text-navy hover:bg-mist"><Printer size={15} /> Print Receipt</button>
          <button type="button" onClick={onClose} className="rounded-xl bg-leaf px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep">Done</button>
        </div>
      </div>
    </div>
  );
}
