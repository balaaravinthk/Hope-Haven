import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import logoBest from "../assets/logoisthebest.png";

// Data & shared
import { DEFAULT_PROFILE, navItems, initialRequirements, initialDonations, initialVolunteers, initialVolunteerRoles, initialNotifications } from "./dashboard/constants";
import { StatusBadge, formatInr } from "./dashboard/shared";

// Sections
import DashboardOverview from "./dashboard/sections/DashboardOverview";
import RequirementsSection from "./dashboard/sections/RequirementsSection";
import DonationsSection from "./dashboard/sections/DonationsSection";
import VolunteersSection from "./dashboard/sections/VolunteersSection";
import NotificationsSection from "./dashboard/sections/NotificationsSection";
import ProfileSection from "./dashboard/sections/ProfileSection";
import SettingsSection from "./dashboard/sections/SettingsSection";

// Modals
import RequirementModal from "./dashboard/modals/RequirementModal";
import VolunteerRoleModal from "./dashboard/modals/VolunteerRoleModal";
import ReceiptModal from "./dashboard/modals/ReceiptModal";
import ProfileModal from "./dashboard/modals/ProfileModal";

function OrphanageDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);

  // Profile loaded from localStorage if registered earlier
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("orphanageProfile");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed, documents: DEFAULT_PROFILE.documents };
      }
    } catch (e) {
      console.warn("Could not load saved orphanage profile", e);
    }
    return DEFAULT_PROFILE;
  });

  const [verificationStatus, setVerificationStatus] = useState(profile.verificationStatus || "Pending");

  // Requirements state
  const [requirements, setRequirements] = useState(initialRequirements);
  const [reqFilter, setReqFilter] = useState("all");
  const [showReqModal, setShowReqModal] = useState(false);
  const [editingReqId, setEditingReqId] = useState(null);
  const [reqForm, setReqForm] = useState({ title: "", category: "Food & Nutrition", amountNeeded: "" });

  // Donations state
  const [donations] = useState(initialDonations);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Volunteers state
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [volunteerRoles, setVolunteerRoles] = useState(initialVolunteerRoles);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleForm, setRoleForm] = useState({ roleTitle: "", needed: "1", days: "Weekends" });

  // Notifications state
  const [notifications, setNotifications] = useState(initialNotifications);

  // Settings state
  const [settings, setSettings] = useState({ publicVisible: true, allowAnonymous: true, emailOnDonation: true, emailOnVolunteer: true, weeklyDigest: false });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Profile Edit modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({ ...profile });

  // Sync verification status changes
  useEffect(() => { setProfile((prev) => ({ ...prev, verificationStatus })); }, [verificationStatus]);

  // Key totals
  const totalDonations = useMemo(() => donations.reduce((sum, d) => sum + (d.status === "Completed" ? d.amount : 0), 0), [donations]);
  const activeRequirements = requirements.filter((r) => r.status === "active").length;
  const volunteerRequests = volunteers.filter((v) => v.status === "pending").length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // ── Requirement Actions ──────────────────────────────────────────────
  const handleSaveRequirement = (e) => {
    e.preventDefault();
    const needed = Number(reqForm.amountNeeded);
    if (!reqForm.title.trim() || !needed) return;
    if (editingReqId) {
      setRequirements((prev) => prev.map((item) => item.id === editingReqId ? { ...item, title: reqForm.title.trim(), category: reqForm.category, amountNeeded: needed, status: item.amountRaised >= needed ? "fulfilled" : item.status } : item));
    } else {
      setRequirements((prev) => [{ id: Date.now(), title: reqForm.title.trim(), category: reqForm.category, amountNeeded: needed, amountRaised: 0, status: "active" }, ...prev]);
      setNotifications((prev) => [{ id: Date.now(), title: "New requirement published", text: `You posted a new requirement: "${reqForm.title.trim()}" (Needed: ${formatInr(needed)})`, time: "Just now", type: "requirement", read: false }, ...prev]);
    }
    setReqForm({ title: "", category: "Food & Nutrition", amountNeeded: "" });
    setEditingReqId(null);
    setShowReqModal(false);
  };

  const startEditRequirement = (item) => { setEditingReqId(item.id); setReqForm({ title: item.title, category: item.category || "Food & Nutrition", amountNeeded: String(item.amountNeeded) }); setShowReqModal(true); };
  const deleteRequirement = (id) => setRequirements((prev) => prev.filter((item) => item.id !== id));

  const markFulfilled = (id) => {
    setRequirements((prev) => prev.map((item) => item.id === id ? { ...item, status: "fulfilled", amountRaised: item.amountNeeded } : item));
    const item = requirements.find((r) => r.id === id);
    if (item) setNotifications((prev) => [{ id: Date.now(), title: "Requirement fulfilled", text: `Requirement "${item.title}" has been marked as 100% fulfilled.`, time: "Just now", type: "requirement", read: false }, ...prev]);
  };

  // ── Volunteer Actions ────────────────────────────────────────────────
  const setVolunteerStatus = (id, newStatus) => {
    setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
    const vol = volunteers.find((v) => v.id === id);
    if (vol) setNotifications((prev) => [{ id: Date.now(), title: `Volunteer application ${newStatus}`, text: `Application for ${vol.name} was marked as ${newStatus}.`, time: "Just now", type: "volunteer", read: false }, ...prev]);
  };

  const handleSaveVolunteerRole = (e) => {
    e.preventDefault();
    if (!roleForm.roleTitle.trim()) return;
    setVolunteerRoles((prev) => [{ id: Date.now(), roleTitle: roleForm.roleTitle.trim(), needed: Number(roleForm.needed) || 1, filled: 0, days: roleForm.days, status: "Open" }, ...prev]);
    setRoleForm({ roleTitle: "", needed: "1", days: "Weekends" });
    setShowRoleModal(false);
  };

  // ── Profile & Settings Save ──────────────────────────────────────────
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editProfileForm);
    try { localStorage.setItem("orphanageProfile", JSON.stringify(editProfileForm)); } catch (err) { console.warn("Error saving profile to localStorage", err); }
    setShowProfileModal(false);
  };

  const handleSaveSettings = (e) => { e.preventDefault(); setSettingsSavedToast(true); setTimeout(() => setSettingsSavedToast(false), 3000); };

  // ── Section Router ───────────────────────────────────────────────────
  const renderContent = () => {
    switch (section) {
      case "dashboard":
        return <DashboardOverview profile={profile} verificationStatus={verificationStatus} setVerificationStatus={setVerificationStatus} requirements={requirements} donations={donations} totalDonations={totalDonations} activeRequirements={activeRequirements} volunteerRequests={volunteerRequests} setSection={setSection} setEditingReqId={setEditingReqId} setReqForm={setReqForm} setShowReqModal={setShowReqModal} />;
      case "requirements":
        return <RequirementsSection requirements={requirements} reqFilter={reqFilter} setReqFilter={setReqFilter} setEditingReqId={setEditingReqId} setReqForm={setReqForm} setShowReqModal={setShowReqModal} startEditRequirement={startEditRequirement} markFulfilled={markFulfilled} deleteRequirement={deleteRequirement} />;
      case "donations":
        return <DonationsSection donations={donations} totalDonations={totalDonations} setActiveReceipt={setActiveReceipt} />;
      case "volunteers":
        return <VolunteersSection volunteers={volunteers} volunteerRequests={volunteerRequests} volunteerRoles={volunteerRoles} setVolunteerStatus={setVolunteerStatus} setShowRoleModal={setShowRoleModal} />;
      case "notifications":
        return <NotificationsSection notifications={notifications} setNotifications={setNotifications} unreadNotifications={unreadNotifications} />;
      case "profile":
        return <ProfileSection profile={profile} verificationStatus={verificationStatus} setEditProfileForm={setEditProfileForm} setShowProfileModal={setShowProfileModal} />;
      case "settings":
        return <SettingsSection settings={settings} setSettings={setSettings} settingsSavedToast={settingsSavedToast} handleSaveSettings={handleSaveSettings} />;
      default:
        return null;
    }
  };

  // ── Sidebar Nav Item ─────────────────────────────────────────────────
  const NavButton = ({ id, label, emoji, active, onClick }) => (
    <button type="button" onClick={onClick} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${active ? "bg-leaf-soft text-leaf-deep font-bold shadow-xs" : "text-navy/75 hover:bg-mist hover:text-navy"}`}>
      <div className="flex items-center gap-3"><span className="text-base" aria-hidden="true">{emoji}</span><span>{label}</span></div>
      {id === "notifications" && unreadNotifications > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-heart text-[10px] font-bold text-white">{unreadNotifications}</span>}
    </button>
  );

  return (
    <div className="min-h-screen bg-haven">
      <div className="flex min-h-screen">
        {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
        <aside className="hidden w-64 shrink-0 border-r border-line bg-white/95 backdrop-blur-md lg:flex lg:flex-col shadow-xs">
          <div className="border-b border-line px-5 py-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logoBest} alt="" className="h-9 w-9 object-contain" />
              <span className="font-display text-xl font-extrabold tracking-tight"><span className="text-navy">Hope</span><span className="text-leaf">Haven</span></span>
            </Link>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">🏠 Orphanage Dashboard</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map(({ id, label, emoji }) => <NavButton key={id} id={id} label={label} emoji={emoji} active={section === id} onClick={() => setSection(id)} />)}
          </nav>
          <div className="border-t border-line p-3">
            <button type="button" onClick={() => { if (window.confirm("Are you sure you want to log out?")) navigate("/login"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-muted transition-colors hover:bg-mist hover:text-heart"><LogOut size={18} /> 🚪 Logout</button>
          </div>
        </aside>

        {/* ── MAIN BODY ───────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur-md lg:px-8">
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg border border-line p-2 text-navy lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={18} /></button>
              <div>
                <p className="font-display text-sm font-bold text-navy lg:text-base">{profile.name}</p>
                <p className="text-xs text-muted hidden sm:block">Orphanage Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <StatusBadge status={verificationStatus} />
              <button type="button" onClick={() => setSection("notifications")} className="relative rounded-lg border border-line p-2 text-navy transition-colors hover:border-leaf/40 hover:bg-mist" aria-label="Notifications">
                <Bell size={18} />
                {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-heart text-[10px] font-bold text-white">{unreadNotifications}</span>}
              </button>
              <button type="button" onClick={() => setSection("profile")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-soft text-leaf font-display font-extrabold text-xs" title="View Profile">{profile.name.slice(0, 2).toUpperCase()}</button>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{renderContent()}</main>
        </div>
      </div>

      {/* ── MOBILE NAV DRAWER ───────────────────────────────────────── */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy/40" aria-label="Close menu" onClick={() => setMobileNav(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <span className="font-display font-bold text-navy">🏠 Orphanage Menu</span>
              <button type="button" onClick={() => setMobileNav(false)} className="rounded-lg p-2 text-navy" aria-label="Close"><X size={18} /></button>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {navItems.map(({ id, label, emoji }) => (
                <button key={id} type="button" onClick={() => { setSection(id); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold ${section === id ? "bg-leaf-soft text-leaf-deep font-bold" : "text-navy/75 hover:bg-mist"}`}><span>{emoji}</span><span>{label}</span></button>
              ))}
            </nav>
            <div className="border-t border-line p-3">
              <button type="button" onClick={() => { setMobileNav(false); navigate("/login"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-muted hover:text-heart"><LogOut size={18} /> 🚪 Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ──────────────────────────────────────────────────── */}
      <RequirementModal show={showReqModal} editingReqId={editingReqId} reqForm={reqForm} setReqForm={setReqForm} onClose={() => setShowReqModal(false)} onSave={handleSaveRequirement} />
      <VolunteerRoleModal show={showRoleModal} roleForm={roleForm} setRoleForm={setRoleForm} onClose={() => setShowRoleModal(false)} onSave={handleSaveVolunteerRole} />
      <ReceiptModal receipt={activeReceipt} profile={profile} onClose={() => setActiveReceipt(null)} />
      <ProfileModal show={showProfileModal} form={editProfileForm} setForm={setEditProfileForm} onClose={() => setShowProfileModal(false)} onSave={handleSaveProfile} />
    </div>
  );
}

export default OrphanageDashboard;
