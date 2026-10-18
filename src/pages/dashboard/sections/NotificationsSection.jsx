import { Bell, Clock } from "lucide-react";

export default function NotificationsSection({ notifications, setNotifications, unreadNotifications }) {
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const iconColors = { donation: "bg-leaf-soft text-leaf", volunteer: "bg-blue-50 text-blue-600", admin: "bg-amber-50 text-amber-600" };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy">Notifications</h1>
          <p className="mt-1 text-sm text-muted">Stay updated on new donations, volunteer sign-ups, requirements, and admin alerts.</p>
        </div>
        {unreadNotifications > 0 && (
          <button type="button" onClick={markAllRead} className="rounded-xl border border-leaf/30 bg-leaf-soft px-4 py-2 text-xs font-bold text-leaf-deep transition-colors hover:bg-leaf/20">Mark all as read</button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)))}
            className={`flex cursor-pointer gap-4 rounded-2xl border p-4.5 transition-all ${n.read ? "border-line bg-white/70" : "border-leaf/30 bg-leaf-soft/30 shadow-xs"}`}
          >
            <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconColors[n.type] || "bg-mist text-navy"}`}>
              <Bell size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-base font-bold text-navy">{n.title}</p>
                <span className="flex items-center gap-1 text-xs text-muted"><Clock size={12} /> {n.time}</span>
              </div>
              <p className="mt-1 text-sm text-ink leading-relaxed">{n.text}</p>
              {!n.read && <span className="mt-2 inline-block rounded-full bg-leaf px-2 py-0.5 text-[10px] font-bold text-white">New</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
