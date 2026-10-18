import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, MapPin, Phone, AlertCircle, HeartHandshake, CreditCard,
  X, CheckCircle2, LayoutDashboard, User, LogOut, Award, Menu, Users
} from "lucide-react";
import { formatInr, percent } from "./dashboard/shared";
import logoBest from "../assets/logoisthebest.png";

// Mock Data for the Donor Feed
const FEED_NEEDS = [
  {
    id: 101,
    type: "fund",
    orphanage: {
      name: "Hope Children's Home",
      address: "12, Green Park Road, Coimbatore",
      contact: "+91 98765 43210",
      verified: true,
    },
    title: "Food supplies for this month",
    category: "Food & Nutrition",
    amountNeeded: 15000,
    amountRaised: 9000,
    urgency: "High",
    description: "We are running out of basic staples like rice, lentils, and cooking oil for our 45 children.",
    datePosted: "2 days ago"
  },
  {
    id: 102,
    type: "fund",
    orphanage: {
      name: "Sunrise Orphanage",
      address: "45, Gandhi Street, Chennai",
      contact: "+91 87654 32109",
      verified: true,
    },
    title: "Emergency Medical Funds",
    category: "Healthcare",
    amountNeeded: 25000,
    amountRaised: 5000,
    urgency: "Critical",
    description: "Two of our children contracted dengue and require immediate hospitalization and medications.",
    datePosted: "5 hours ago"
  },
  {
    id: 105,
    type: "volunteer",
    orphanage: {
      name: "Little Angels Care",
      address: "8, MG Road, Madurai",
      contact: "+91 76543 21098",
      verified: true,
    },
    title: "Weekend Math & English Tutors",
    category: "Education",
    volunteersNeeded: 5,
    volunteersApplied: 2,
    urgency: "Medium",
    description: "Looking for dedicated individuals to help our high-schoolers with weekend tutoring.",
    datePosted: "1 day ago"
  },
  {
    id: 104,
    type: "fund",
    orphanage: {
      name: "Hope Children's Home",
      address: "12, Green Park Road, Coimbatore",
      contact: "+91 98765 43210",
      verified: true,
    },
    title: "Winter Blankets",
    category: "Clothing",
    amountNeeded: 8000,
    amountRaised: 1500,
    urgency: "High",
    description: "As the weather gets colder, we need warm blankets for our newly admitted toddlers.",
    datePosted: "1 day ago"
  },
  {
    id: 106,
    type: "volunteer",
    orphanage: {
      name: "Sunrise Orphanage",
      address: "45, Gandhi Street, Chennai",
      contact: "+91 87654 32109",
      verified: true,
    },
    title: "Orphanage Cleaning Drive",
    category: "Facility & Infrastructure",
    volunteersNeeded: 10,
    volunteersApplied: 4,
    urgency: "High",
    description: "We are organizing a deep cleaning and painting drive for our common areas this Sunday.",
    datePosted: "3 days ago"
  }
];

const urgencyWeight = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 };
const urgencyColors = {
  "Critical": "bg-red-100 text-red-700 border-red-200",
  "High": "bg-orange-100 text-orange-700 border-orange-200",
  "Medium": "bg-blue-100 text-blue-700 border-blue-200",
  "Low": "bg-green-100 text-green-700 border-green-200"
};

// Mock User Profile
const USER_PROFILE = {
  name: "John Doe",
  email: "johndoe@example.com",
  joined: "January 2026",
  impact: {
    donations: 12500,
    volunteerHours: 24,
    livesTouched: 15
  },
  trophies: {
    gold: 2,   // Critical needs fulfilled
    silver: 5, // High/Medium needs fulfilled
    bronze: 8  // Regular contributions
  }
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState("feed");
  const [filter, setFilter] = useState("All");
  const [donateModal, setDonateModal] = useState(null);
  const [volunteerModal, setVolunteerModal] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [hideImpact, setHideImpact] = useState(false); // Added state for hiding impact stats

  const sortedAndFilteredNeeds = useMemo(() => {
    let needs = [...FEED_NEEDS];
    if (filter !== "All") needs = needs.filter(n => n.category === filter);
    needs.sort((a, b) => {
      if (urgencyWeight[b.urgency] !== urgencyWeight[a.urgency]) {
        return urgencyWeight[b.urgency] - urgencyWeight[a.urgency];
      }
      const pctA = a.type === 'fund' ? a.amountRaised / a.amountNeeded : a.volunteersApplied / a.volunteersNeeded;
      const pctB = b.type === 'fund' ? b.amountRaised / b.amountNeeded : b.volunteersApplied / b.volunteersNeeded;
      return pctA - pctB;
    });
    return needs;
  }, [filter]);

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false); setDonateModal(null); setDonationAmount("");
    }, 3000);
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false); setVolunteerModal(null);
    }, 3000);
  };

  const renderFeed = () => (
    <div className="animate-rise max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy">Urgent Needs Feed</h1>
          <p className="text-sm text-muted mt-1">Discover verified orphanages that need your immediate support.</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["All", "Healthcare", "Food & Nutrition", "Education", "Clothing", "Facility & Infrastructure"].map(cat => (
            <button 
              key={cat} onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${filter === cat ? "bg-navy text-white" : "bg-white border border-line text-muted hover:text-navy"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {sortedAndFilteredNeeds.map(need => {
          const pct = need.type === 'fund' ? percent(need.amountRaised, need.amountNeeded) : Math.round((need.volunteersApplied / need.volunteersNeeded) * 100);
          return (
            <div key={need.id} className="bg-white rounded-2xl border border-line p-5 md:p-7 shadow-xs hover:shadow-sm transition-shadow flex flex-col md:flex-row gap-6">
              {/* Need Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${urgencyColors[need.urgency]}`}>
                        <AlertCircle size={12} /> {need.urgency} Priority
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border bg-gray-100 text-gray-700 border-gray-200">
                        {need.type === 'fund' ? 'Funding' : 'Volunteering'}
                      </span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-navy mt-2">{need.title}</h2>
                    <p className="text-sm text-muted mt-1">{need.description}</p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    {need.type === 'fund' ? (
                      <>
                        <span className="text-navy"><strong className="text-lg">{formatInr(need.amountRaised)}</strong> raised</span>
                        <span className="text-muted">Goal: {formatInr(need.amountNeeded)}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-navy"><strong className="text-lg">{need.volunteersApplied}</strong> applied</span>
                        <span className="text-muted">Goal: {need.volunteersNeeded} volunteers</span>
                      </>
                    )}
                  </div>
                  <div className="h-2.5 w-full bg-mist-deep rounded-full overflow-hidden">
                    <div className="h-full bg-leaf transition-all duration-1000" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>

              {/* Orphanage Info & Action */}
              <div className="md:w-72 shrink-0 flex flex-col justify-between bg-mist/30 rounded-xl p-4 border border-line">
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Requested By</p>
                  <h3 className="font-display font-bold text-navy text-base flex items-center gap-1.5">
                    {need.orphanage.name}
                    {need.orphanage.verified && <CheckCircle2 size={14} className="text-leaf" title="Verified" />}
                  </h3>
                  <p className="text-xs text-muted flex items-start gap-1.5 mt-2"><MapPin size={14} className="shrink-0 mt-0.5" />{need.orphanage.address}</p>
                  <p className="text-xs text-muted flex items-center gap-1.5 mt-1.5"><Phone size={14} className="shrink-0" />{need.orphanage.contact}</p>
                </div>
                
                <div className="mt-5 space-y-2.5">
                  {need.type === 'fund' ? (
                    <button onClick={() => setDonateModal(need)} className="w-full flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-deep text-white font-display font-bold text-sm py-2.5 rounded-xl transition-colors">
                      <HeartHandshake size={16} /> Donate Now
                    </button>
                  ) : (
                    <button onClick={() => setVolunteerModal(need)} className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/80 text-white font-display font-bold text-sm py-2.5 rounded-xl transition-colors">
                      <Users size={16} /> Apply to Volunteer
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {sortedAndFilteredNeeds.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-line">
            <p className="text-muted font-semibold">No needs found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-rise max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy">My Impact Profile</h1>
          <p className="text-sm text-muted mt-1">Track your contributions, volunteer hours, and earned trophies.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-line p-6 shadow-xs flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-mist rounded-full flex items-center justify-center mb-4">
            <User size={32} className="text-navy" />
          </div>
          <h2 className="font-display text-xl font-bold text-navy">{USER_PROFILE.name}</h2>
          <p className="text-sm text-muted">{USER_PROFILE.email}</p>
          <p className="text-xs text-muted mt-2">Member since {USER_PROFILE.joined}</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-line p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-navy">Lifetime Impact</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-semibold text-muted">Hide Stats</span>
              <input 
                type="checkbox" 
                checked={hideImpact}
                onChange={(e) => setHideImpact(e.target.checked)}
                className="w-4 h-4 rounded border-line accent-leaf" 
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-leaf-soft border border-leaf/30 rounded-xl p-4 text-center">
              <HeartHandshake size={24} className="mx-auto text-leaf mb-2" />
              <p className="text-2xl font-display font-extrabold text-navy">
                {hideImpact ? "***" : formatInr(USER_PROFILE.impact.donations)}
              </p>
              <p className="text-xs font-bold text-leaf-deep mt-1">Donated</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <Users size={24} className="mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-display font-extrabold text-navy">
                {hideImpact ? "***" : `${USER_PROFILE.impact.volunteerHours}h`}
              </p>
              <p className="text-xs font-bold text-blue-700 mt-1">Volunteered</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <AlertCircle size={24} className="mx-auto text-orange-500 mb-2" />
              <p className="text-2xl font-display font-extrabold text-navy">
                {hideImpact ? "***" : USER_PROFILE.impact.livesTouched}
              </p>
              <p className="text-xs font-bold text-orange-700 mt-1">Lives Touched</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line p-6 shadow-xs">
        <h3 className="font-display text-2xl font-bold text-navy mb-2 text-center">Trophy Room</h3>
        <p className="text-sm text-muted text-center mb-8">You earn trophies by fulfilling critical needs and consistent contributions.</p>
        
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Award size={64} className="text-yellow-400 drop-shadow-md" />
              <div className="absolute -bottom-2 -right-2 bg-navy text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {USER_PROFILE.trophies.gold}
              </div>
            </div>
            <h4 className="font-display font-bold text-navy mt-4">Golden Trophy</h4>
            <p className="text-xs text-muted mt-1">Awarded for fulfilling Critical emergency needs.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <Award size={64} className="text-gray-300 drop-shadow-md" />
              <div className="absolute -bottom-2 -right-2 bg-navy text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {USER_PROFILE.trophies.silver}
              </div>
            </div>
            <h4 className="font-display font-bold text-navy mt-4">Silver Trophy</h4>
            <p className="text-xs text-muted mt-1">Awarded for supporting High & Medium priority tasks.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <Award size={64} className="text-amber-600 drop-shadow-md" />
              <div className="absolute -bottom-2 -right-2 bg-navy text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {USER_PROFILE.trophies.bronze}
              </div>
            </div>
            <h4 className="font-display font-bold text-navy mt-4">Bronze Trophy</h4>
            <p className="text-xs text-muted mt-1">Awarded for ongoing standard contributions and support.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-haven font-sans flex">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line bg-white/95 backdrop-blur-md lg:flex lg:flex-col shadow-xs">
        <div className="border-b border-line px-5 py-5">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src={logoBest} alt="Logo" className="h-9 w-9 object-contain" />
            <span className="font-display text-xl font-extrabold tracking-tight">
              <span className="text-navy">Hope</span>
              <span className="text-leaf">Haven</span>
            </span>
          </Link>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">🤝 Supporter Dashboard</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          <button onClick={() => setSection("feed")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${section === "feed" ? "bg-leaf-soft text-leaf-deep font-bold shadow-xs" : "text-navy/75 hover:bg-mist hover:text-navy"}`}>
            <LayoutDashboard size={18} /> Feed
          </button>
          <button onClick={() => setSection("profile")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${section === "profile" ? "bg-leaf-soft text-leaf-deep font-bold shadow-xs" : "text-navy/75 hover:bg-mist hover:text-navy"}`}>
            <Award size={18} /> My Profile & Trophies
          </button>
        </nav>
        <div className="border-t border-line p-3">
          <button onClick={() => { if (window.confirm("Logout?")) navigate("/login"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-muted transition-colors hover:bg-mist hover:text-heart">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 border border-line rounded-lg text-navy" onClick={() => setMobileNav(true)}><Menu size={18} /></button>
            <span className="font-display font-bold text-navy">Hope Haven</span>
          </div>
          <button onClick={() => setSection("profile")} className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-navy font-bold text-sm">JD</button>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {section === "feed" ? renderFeed() : renderProfile()}
        </main>
      </div>

      {/* Mobile Nav */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-navy/40" onClick={() => setMobileNav(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-line">
              <span className="font-display font-bold text-navy">Menu</span>
              <button onClick={() => setMobileNav(false)} className="p-2 rounded-lg"><X size={18} /></button>
            </div>
            <nav className="p-3 space-y-1">
              <button onClick={() => { setSection("feed"); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold ${section === "feed" ? "bg-leaf-soft text-leaf-deep font-bold" : "text-navy/75"}`}><LayoutDashboard size={18} /> Feed</button>
              <button onClick={() => { setSection("profile"); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-sm font-semibold ${section === "profile" ? "bg-leaf-soft text-leaf-deep font-bold" : "text-navy/75"}`}><Award size={18} /> Profile & Trophies</button>
            </nav>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {donateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-rise relative">
            <button onClick={() => { setDonateModal(null); setSuccess(false); }} className="absolute top-4 right-4 text-muted hover:text-navy"><X size={20} /></button>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-leaf-soft text-leaf rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} /></div>
                <h3 className="font-display text-2xl font-bold text-navy">Thank You!</h3>
                <p className="text-muted mt-2">Your donation has been processed.</p>
                {donateModal.urgency === "Critical" && <p className="text-sm text-yellow-600 mt-2 font-bold">+ You earned progress toward a Golden Trophy!</p>}
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-navy mb-1">Make a Donation</h3>
                <p className="text-sm text-muted mb-6">Supporting: <strong className="text-navy">{donateModal.orphanage.name}</strong></p>
                <form onSubmit={handleDonateSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">Amount (₹)</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[500, 1000, 2500].map(amt => (
                        <button key={amt} type="button" onClick={() => setDonationAmount(amt)} className={`py-2 rounded-lg border text-sm font-bold transition-colors ${Number(donationAmount) === amt ? 'bg-navy border-navy text-white' : 'bg-white border-line text-navy hover:bg-mist'}`}>₹{amt}</button>
                      ))}
                    </div>
                    <input type="number" required min="1" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} placeholder="Enter custom amount" className="w-full border border-line bg-mist/30 rounded-xl px-4 py-3 text-sm focus:border-leaf outline-none" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-deep text-white font-display font-bold py-3 rounded-xl transition-colors"><CreditCard size={18} /> Proceed to Pay</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Volunteer Modal */}
      {volunteerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-rise relative">
            <button onClick={() => { setVolunteerModal(null); setSuccess(false); }} className="absolute top-4 right-4 text-muted hover:text-navy"><X size={20} /></button>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-leaf-soft text-leaf rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} /></div>
                <h3 className="font-display text-2xl font-bold text-navy">Application Sent!</h3>
                <p className="text-muted mt-2">The orphanage has received your request to volunteer.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-navy mb-1">Apply to Volunteer</h3>
                <p className="text-sm text-muted mb-6">Role: <strong className="text-navy">{volunteerModal.title}</strong> at {volunteerModal.orphanage.name}</p>
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <p className="text-sm text-ink">{volunteerModal.description}</p>
                  <label className="block mt-4">
                    <span className="block text-xs font-bold text-navy mb-1.5">Availability</span>
                    <input type="text" required placeholder="e.g. Weekends only, anytime" className="w-full border border-line bg-mist/30 rounded-xl px-4 py-3 text-sm focus:border-leaf outline-none" />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold text-navy mb-1.5">Contact Number</span>
                    <input type="text" required placeholder="+91" className="w-full border border-line bg-mist/30 rounded-xl px-4 py-3 text-sm focus:border-leaf outline-none" />
                  </label>
                  <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 bg-navy hover:bg-navy/80 text-white font-display font-bold py-3 rounded-xl transition-colors"><Users size={18} /> Send Application</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
