import { Eye } from "lucide-react";
import { StatusBadge, formatInr } from "../shared";

export default function DonationsSection({ donations, totalDonations, setActiveReceipt }) {
  const completed = donations.filter((d) => d.status === "Completed");
  const avgGift = formatInr(totalDonations / (completed.length || 1));

  return (
    <div className="space-y-6 animate-rise">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-navy">Donations</h1>
        <p className="mt-1 text-sm text-muted">Track received donations, donor contributions, and generate 80G receipts.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total donations received", value: formatInr(totalDonations), sub: "100% directly directed to your shelter", subCls: "text-leaf font-semibold" },
          { label: "Completed contributions", value: completed.length, sub: "Verified transactions" },
          { label: "Average gift amount", value: avgGift, sub: "Per donor contribution" },
        ].map(({ label, value, sub, subCls }) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-navy">{value}</p>
            <p className={`mt-1 text-xs ${subCls || "text-muted"}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Donations Table */}
      <div className="rounded-2xl border border-line bg-white shadow-xs overflow-hidden">
        <div className="border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy">Recent Donations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-mist/60 font-display text-xs font-bold uppercase tracking-wider text-navy">
              <tr>
                <th className="px-6 py-3.5">Donor Name</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Payment Method</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {donations.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-mist/30">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy">{d.showDonor ? d.donor : "Anonymous Donor"}</div>
                    {!d.showDonor && <span className="text-[11px] text-muted">Donor requested privacy</span>}
                  </td>
                  <td className="px-6 py-4 font-display font-extrabold text-navy">{formatInr(d.amount)}</td>
                  <td className="px-6 py-4 text-muted">{d.date}</td>
                  <td className="px-6 py-4 text-ink font-medium">{d.paymentMethod}</td>
                  <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => setActiveReceipt(d)} className="inline-flex items-center gap-1.5 rounded-lg border border-leaf/30 bg-leaf-soft px-3 py-1.5 text-xs font-bold text-leaf-deep transition-colors hover:bg-leaf/20"><Eye size={13} /> View Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
