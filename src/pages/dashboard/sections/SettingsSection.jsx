import { CheckCircle2 } from "lucide-react";

export default function SettingsSection({ settings, setSettings, settingsSavedToast, handleSaveSettings }) {
  const Toggle = ({ label, desc, field, borderTop }) => (
    <label className={`flex items-center justify-between gap-4 cursor-pointer ${borderTop ? "border-t border-line/60 pt-4" : ""}`}>
      <div>
        <p className="font-bold text-navy text-sm">{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <input type="checkbox" checked={settings[field]} onChange={(e) => setSettings((prev) => ({ ...prev, [field]: e.target.checked }))} className="h-5 w-5 rounded border-line accent-leaf" />
    </label>
  );

  return (
    <div className="space-y-6 animate-rise">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-navy">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your organization preferences, notification alerts, and account security.</p>
      </div>

      {settingsSavedToast && (
        <div className="flex items-center gap-2 rounded-xl border border-leaf/30 bg-leaf-soft px-4 py-3 text-sm font-bold text-leaf-deep animate-rise">
          <CheckCircle2 size={18} /> Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Directory & Donations */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-navy">Directory & Donations</h2>
          <div className="mt-4 space-y-4">
            <Toggle label="Public Profile Listing" desc="Allow donors and volunteers to find your home in public search results." field="publicVisible" />
            <Toggle label="Accept Anonymous Donations" desc="Permit donors to contribute without revealing their personal profile." field="allowAnonymous" borderTop />
          </div>
        </div>

        {/* Notification Alerts */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-navy">Notification Alerts</h2>
          <div className="mt-4 space-y-4">
            <Toggle label="Email alerts on new donation" desc="Receive instant email receipt when someone donates to your home." field="emailOnDonation" />
            <Toggle label="Email alerts on volunteer applications" desc="Notify you immediately when a new volunteer applies." field="emailOnVolunteer" borderTop />
            <Toggle label="Weekly Activity Summary" desc="Receive a consolidated weekly report of donations and volunteer hours." field="weeklyDigest" borderTop />
          </div>
        </div>

        {/* Account Security */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-navy">Account Security</h2>
          <p className="mt-1 text-xs text-muted">Update your shelter login password and credentials.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-navy">Current Password</span>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-navy">New Password</span>
              <input type="password" placeholder="New password (min 6 chars)" className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="rounded-xl bg-leaf px-6 py-3 font-display font-bold text-white shadow-xs transition-colors hover:bg-leaf-deep">Save Settings</button>
        </div>
      </form>
    </div>
  );
}
