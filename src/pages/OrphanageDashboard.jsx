import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  HandCoins,
  Users,
  Building2,
  Bell,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Download,
  LogOut,
  Menu,
  X,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Ban,
} from "lucide-react";
import logoBest from "../assets/logoisthebest.png";

const ORPHANAGE_NAME = "Hope Children’s Home";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "requirements", label: "My Requirements", icon: ClipboardList },
  { id: "donations", label: "Donations", icon: HandCoins },
  { id: "volunteers", label: "Volunteers", icon: Users },
  { id: "profile", label: "Organization Profile", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

const initialRequirements = [
  {
    id: 1,
    title: "Food supplies",
    amountNeeded: 15000,
    amountRaised: 9000,
    status: "active",
  },
  {
    id: 2,
    title: "School uniforms",
    amountNeeded: 22000,
    amountRaised: 22000,
    status: "fulfilled",
  },
  {
    id: 3,
    title: "Medical kit restock",
    amountNeeded: 8000,
    amountRaised: 2400,
    status: "active",
  },
];

const initialDonations = [
  {
    id: 1,
    donor: "Anonymous",
    amount: 5000,
    date: "2026-03-28",
    status: "Completed",
    showDonor: false,
  },
  {
    id: 2,
    donor: "Priya Sharma",
    amount: 2500,
    date: "2026-03-25",
    status: "Completed",
    showDonor: true,
  },
  {
    id: 3,
    donor: "Ravi Kumar",
    amount: 1500,
    date: "2026-03-20",
    status: "Pending",
    showDonor: true,
  },
];

const initialVolunteers = [
  {
    id: 1,
    name: "Anitha R.",
    skill: "Teaching — weekends",
    status: "pending",
    date: "2026-03-27",
  },
  {
    id: 2,
    name: "Karthik M.",
    skill: "Sports coaching",
    status: "accepted",
    date: "2026-03-18",
  },
  {
    id: 3,
    name: "Meena S.",
    skill: "Health checkup support",
    status: "rejected",
    date: "2026-03-12",
  },
];

const upcomingActivities = [
  { id: 1, title: "Weekend tutoring", when: "Sat, 5 Apr · 10:00 AM", people: 3 },
  { id: 2, title: "Garden cleanup", when: "Sun, 13 Apr · 9:00 AM", people: 5 },
];

const initialNotifications = [
  {
    id: 1,
    text: "New donation of ₹2,500 received from Priya Sharma.",
    time: "2 hours ago",
    type: "donation",
  },
  {
    id: 2,
    text: "Volunteer application received from Anitha R.",
    time: "Yesterday",
    type: "volunteer",
  },
  {
    id: 3,
    text: "Requirement “School uniforms” marked as fulfilled.",
    time: "3 days ago",
    type: "requirement",
  },
  {
    id: 4,
    text: "Admin update: your verification is still Pending review.",
    time: "1 week ago",
    type: "admin",
  },
];

const emptyRequirementForm = {
  title: "",
  amountNeeded: "",
};

function formatInr(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function percent(raised, needed) {
  if (!needed) return 0;
  return Math.min(100, Math.round((raised / needed) * 100));
}

function StatusBadge({ status }) {
  const map = {
    Pending: "bg-glow text-navy border-navy/15",
    Verified: "bg-leaf-soft text-leaf-deep border-leaf/25",
    Rejected: "bg-red-50 text-heart border-heart/20",
    active: "bg-leaf-soft text-leaf-deep border-leaf/25",
    fulfilled: "bg-mist text-muted border-line",
    Completed: "bg-leaf-soft text-leaf-deep border-leaf/25",
    pending: "bg-glow text-navy border-navy/15",
    accepted: "bg-leaf-soft text-leaf-deep border-leaf/25",
    rejected: "bg-red-50 text-heart border-heart/20",
  };
  const label =
    status === "active"
      ? "Active"
      : status === "fulfilled"
        ? "Fulfilled"
        : status === "pending"
          ? "Pending"
          : status === "accepted"
            ? "Accepted"
            : status === "rejected"
              ? "Rejected"
              : status;

  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-display font-bold ${map[status] || "bg-mist text-muted border-line"}`}
    >
      {label}
    </span>
  );
}

function OrphanageDashboard() {
  const [section, setSection] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [verificationStatus] = useState("Pending");
  const [requirements, setRequirements] = useState(initialRequirements);
  const [donations] = useState(initialDonations);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [notifications] = useState(initialNotifications);
  const [reqForm, setReqForm] = useState(emptyRequirementForm);
  const [editingId, setEditingId] = useState(null);
  const [showReqForm, setShowReqForm] = useState(false);

  const totalDonations = useMemo(
    () => donations.reduce((sum, d) => sum + d.amount, 0),
    [donations]
  );
  const activeRequirements = requirements.filter((r) => r.status === "active").length;
  const volunteerRequests = volunteers.filter((v) => v.status === "pending").length;

  const recentActivities = [
    { text: "Food supplies requirement updated", time: "Today" },
    { text: "Donation received — ₹2,500", time: "Yesterday" },
    { text: "New volunteer application", time: "2 days ago" },
  ];

  const profile = {
    name: ORPHANAGE_NAME,
    type: "Children’s Home / CCI",
    address: "12, Green Park Road, Coimbatore, Tamil Nadu — 641001",
    contact: "+91 98765 43210",
    email: "hopehome@email.com",
    registrationNumber: "TN/CCI/2019/0842",
    pan: "ABCDE1234F",
    cciJj: "JJ/CCI/TN/0842",
    authorizedPerson: "Suresh Kumar",
    documents: [
      "ID Proof.pdf",
      "Registration Certificate.pdf",
      "Address Proof.pdf",
      "Front picture.jpg",
    ],
  };

  const saveRequirement = (event) => {
    event.preventDefault();
    const amountNeeded = Number(reqForm.amountNeeded);
    if (!reqForm.title.trim() || !amountNeeded) return;

    if (editingId) {
      setRequirements((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: reqForm.title.trim(),
                amountNeeded,
                status:
                  item.amountRaised >= amountNeeded ? "fulfilled" : item.status,
              }
            : item
        )
      );
    } else {
      setRequirements((prev) => [
        {
          id: Date.now(),
          title: reqForm.title.trim(),
          amountNeeded,
          amountRaised: 0,
          status: "active",
        },
        ...prev,
      ]);
    }
    setReqForm(emptyRequirementForm);
    setEditingId(null);
    setShowReqForm(false);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setReqForm({
      title: item.title,
      amountNeeded: String(item.amountNeeded),
    });
    setShowReqForm(true);
  };

  const deleteRequirement = (id) => {
    setRequirements((prev) => prev.filter((item) => item.id !== id));
  };

  const markFulfilled = (id) => {
    setRequirements((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "fulfilled", amountRaised: item.amountNeeded }
          : item
      )
    );
  };

  const setVolunteerStatus = (id, status) => {
    setVolunteers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const VerificationIcon =
    verificationStatus === "Verified"
      ? ShieldCheck
      : verificationStatus === "Rejected"
        ? Ban
        : ShieldAlert;

  const renderSection = () => {
    switch (section) {
      case "overview":
        return (
          <div className="space-y-8 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy md:text-4xl">
                Welcome, {ORPHANAGE_NAME}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted">Verification status</span>
                <StatusBadge status={verificationStatus} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Total donations received",
                  value: formatInr(totalDonations),
                },
                { label: "Active requirements", value: activeRequirements },
                { label: "Volunteer requests", value: volunteerRequests },
                {
                  label: "Fulfilled needs",
                  value: requirements.filter((r) => r.status === "fulfilled")
                    .length,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-navy">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-xl font-bold text-navy">
                Recent activities
              </h2>
              <ul className="mt-4 divide-y divide-line">
                {recentActivities.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <span className="text-ink">{item.text}</span>
                    <span className="shrink-0 text-muted">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "requirements":
        return (
          <div className="space-y-6 animate-rise">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl font-extrabold text-navy">
                  My Requirements
                </h1>
                <p className="mt-1 text-muted">
                  Post needs, track progress, and mark them fulfilled.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setReqForm(emptyRequirementForm);
                  setShowReqForm(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-leaf px-4 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep"
              >
                <Plus size={16} />
                Add requirement
              </button>
            </div>

            {showReqForm && (
              <form
                onSubmit={saveRequirement}
                className="rounded-2xl border border-leaf/25 bg-white p-5"
              >
                <h2 className="font-display text-lg font-bold text-navy">
                  {editingId ? "Edit requirement" : "New requirement"}
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-navy">
                      Title
                    </span>
                    <input
                      required
                      value={reqForm.title}
                      onChange={(e) =>
                        setReqForm((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="e.g. Food supplies"
                      className="w-full rounded-xl border border-line bg-mist/40 px-4 py-3 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-navy">
                      Amount needed (₹)
                    </span>
                    <input
                      required
                      type="number"
                      min="1"
                      value={reqForm.amountNeeded}
                      onChange={(e) =>
                        setReqForm((p) => ({
                          ...p,
                          amountNeeded: e.target.value,
                        }))
                      }
                      placeholder="15000"
                      className="w-full rounded-xl border border-line bg-mist/40 px-4 py-3 outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                    />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-leaf px-4 py-2.5 font-display text-sm font-bold text-white hover:bg-leaf-deep"
                  >
                    {editingId ? "Save changes" : "Add requirement"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReqForm(false);
                      setEditingId(null);
                      setReqForm(emptyRequirementForm);
                    }}
                    className="rounded-xl border border-line px-4 py-2.5 font-display text-sm font-bold text-navy"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {requirements.map((item) => {
                const pct = percent(item.amountRaised, item.amountNeeded);
                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-line bg-white p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-navy">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {formatInr(item.amountNeeded)} needed ·{" "}
                          {formatInr(item.amountRaised)} raised · {pct}% fulfilled
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist-deep">
                      <div
                        className="h-full rounded-full bg-leaf transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-navy hover:border-navy/30"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      {item.status !== "fulfilled" && (
                        <button
                          type="button"
                          onClick={() => markFulfilled(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-leaf/30 bg-leaf-soft px-3 py-2 text-sm font-semibold text-leaf-deep"
                        >
                          <CheckCircle2 size={14} /> Mark fulfilled
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteRequirement(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-heart/20 px-3 py-2 text-sm font-semibold text-heart"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        );

      case "donations":
        return (
          <div className="space-y-6 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">
                Donations
              </h1>
              <p className="mt-1 text-muted">
                Track gifts received and download receipts.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-sm text-muted">Total donations received</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-navy">
                {formatInr(totalDonations)}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-line bg-mist/60 font-display text-navy">
                  <tr>
                    <th className="px-4 py-3 font-bold">Donor</th>
                    <th className="px-4 py-3 font-bold">Amount</th>
                    <th className="px-4 py-3 font-bold">Date</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id} className="border-b border-line last:border-0">
                      <td className="px-4 py-3 text-ink">
                        {d.showDonor ? d.donor : "Anonymous"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy">
                        {formatInr(d.amount)}
                      </td>
                      <td className="px-4 py-3 text-muted">{d.date}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={d.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 font-semibold text-leaf hover:text-leaf-deep"
                        >
                          <Download size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "volunteers":
        return (
          <div className="space-y-6 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">
                Volunteers
              </h1>
              <p className="mt-1 text-muted">
                Review applications and upcoming activities.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-lg font-bold text-navy">
                Applications
              </h2>
              {volunteers.map((v) => (
                <article
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4"
                >
                  <div>
                    <p className="font-display font-bold text-navy">{v.name}</p>
                    <p className="text-sm text-muted">
                      {v.skill} · Applied {v.date}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={v.status} />
                    {v.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => setVolunteerStatus(v.id, "accepted")}
                          className="rounded-lg bg-leaf px-3 py-2 text-sm font-bold text-white hover:bg-leaf-deep"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => setVolunteerStatus(v.id, "rejected")}
                          className="rounded-lg border border-heart/25 px-3 py-2 text-sm font-bold text-heart"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <h2 className="font-display text-lg font-bold text-navy">
                Upcoming volunteer activities
              </h2>
              <ul className="mt-4 space-y-3">
                {upcomingActivities.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-semibold text-navy">{a.title}</p>
                      <p className="text-sm text-muted">{a.when}</p>
                    </div>
                    <span className="text-sm text-muted">{a.people} volunteers</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">
                Organization Profile
              </h1>
              <p className="mt-1 text-muted">
                Details and documents submitted for verification.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-center gap-3">
                <VerificationIcon
                  size={22}
                  className={
                    verificationStatus === "Verified"
                      ? "text-leaf"
                      : verificationStatus === "Rejected"
                        ? "text-heart"
                        : "text-navy"
                  }
                />
                <StatusBadge status={verificationStatus} />
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Orphanage name", profile.name],
                  ["Organization type", profile.type],
                  ["Address", profile.address],
                  ["Contact", profile.contact],
                  ["Email", profile.email],
                  ["Registration number", profile.registrationNumber],
                  ["PAN", profile.pan],
                  ["CCI/JJ number", profile.cciJj],
                  ["Authorized person", profile.authorizedPerson],
                ].map(([label, value]) => (
                  <div key={label} className={label === "Address" ? "sm:col-span-2" : ""}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {label}
                    </dt>
                    <dd className="mt-1 text-navy">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <h2 className="font-display text-lg font-bold text-navy">
                  Uploaded verification documents
                </h2>
                <ul className="mt-3 space-y-2">
                  {profile.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center justify-between rounded-xl border border-line bg-mist/40 px-4 py-3 text-sm"
                    >
                      <span className="text-ink">{doc}</span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 font-semibold text-leaf hover:text-leaf-deep"
                      >
                        <Download size={14} /> View
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">
                Notifications
              </h1>
              <p className="mt-1 text-muted">
                Updates on donations, volunteers, and verification.
              </p>
            </div>
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-4"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
                    <Bell size={16} />
                  </div>
                  <div>
                    <p className="text-ink">{n.text}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                      <Clock size={12} /> {n.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6 animate-rise">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">
                Reports
              </h1>
              <p className="mt-1 text-muted">
                Summary of donations, needs, and volunteer activity.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Donation history",
                  detail: `${donations.length} donations · ${formatInr(totalDonations)} total`,
                },
                {
                  title: "Requirement fulfillment",
                  detail: `${requirements.filter((r) => r.status === "fulfilled").length} fulfilled · ${activeRequirements} active`,
                },
                {
                  title: "Volunteer activity",
                  detail: `${volunteers.filter((v) => v.status === "accepted").length} accepted · ${volunteerRequests} pending`,
                },
                {
                  title: "Monthly / yearly summary",
                  detail: "Mar 2026: ₹9,000 · YTD: ₹9,000 (demo data)",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <h2 className="font-display text-lg font-bold text-navy">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{card.detail}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-leaf hover:text-leaf-deep"
                  >
                    <Download size={14} /> Export report
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-haven">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-line bg-white/90 backdrop-blur-md lg:flex lg:flex-col">
          <div className="border-b border-line px-5 py-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logoBest} alt="" className="h-9 w-9 object-contain" />
              <span className="font-display text-xl font-extrabold tracking-tight">
                <span className="text-navy">Hope</span>
                <span className="text-leaf">Haven</span>
              </span>
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Orphanage dashboard
            </p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = section === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSection(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${
                    active
                      ? "bg-leaf-soft text-leaf-deep"
                      : "text-navy/75 hover:bg-mist hover:text-navy"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-line p-3">
            <Link
              to="/login"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-muted transition-colors hover:bg-mist hover:text-navy"
            >
              <LogOut size={18} />
              Log out
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur-md lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-line p-2 text-navy lg:hidden"
                onClick={() => setMobileNav(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div className="lg:hidden">
                <p className="font-display text-sm font-bold text-navy">
                  {ORPHANAGE_NAME}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={verificationStatus} />
              <button
                type="button"
                onClick={() => setSection("notifications")}
                className="relative rounded-lg border border-line p-2 text-navy hover:border-leaf/40"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-heart text-[10px] font-bold text-white">
                  {notifications.length}
                </span>
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{renderSection()}</main>
        </div>
      </div>

      {mobileNav && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/40"
            aria-label="Close menu"
            onClick={() => setMobileNav(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <span className="font-display font-bold text-navy">Menu</span>
              <button
                type="button"
                onClick={() => setMobileNav(false)}
                className="rounded-lg p-2 text-navy"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSection(id);
                    setMobileNav(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold ${
                    section === id
                      ? "bg-leaf-soft text-leaf-deep"
                      : "text-navy/75"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
            <div className="border-t border-line p-3">
              <Link
                to="/login"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-muted"
              >
                <LogOut size={18} />
                Log out
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrphanageDashboard;
