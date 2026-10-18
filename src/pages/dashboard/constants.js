import {
  LayoutDashboard,
  ClipboardList,
  HandCoins,
  Users,
  Bell,
  Building2,
  Settings,
} from "lucide-react";

export const DEFAULT_PROFILE = {
  name: "Hope Children's Home",
  type: "Children's Home / CCI",
  address: "12, Green Park Road, Coimbatore, Tamil Nadu — 641001",
  contact: "+91 98765 43210",
  email: "hopehome@email.com",
  registrationNumber: "TN/CCI/2019/0842",
  pan: "ABCDE1234F",
  cciJj: "JJ/CCI/TN/0842",
  authorizedPerson: "Suresh Kumar",
  verificationStatus: "Pending",
  photoPreview: null,
  documents: [
    "ID_Proof_Aadhaar.pdf",
    "CCI_Registration_Certificate.pdf",
    "Address_Proof_Utility.pdf",
    "Building_Front_Photo.jpg",
  ],
};

export const navItems = [
  { id: "dashboard", label: "Dashboard", emoji: "\u{1F3E0}", icon: LayoutDashboard },
  { id: "requirements", label: "Requirements", emoji: "\u{1F4CB}", icon: ClipboardList },
  { id: "donations", label: "Donations", emoji: "\u{1F4B0}", icon: HandCoins },
  { id: "volunteers", label: "Volunteers", emoji: "\u{1F91D}", icon: Users },
  { id: "notifications", label: "Notifications", emoji: "\u{1F514}", icon: Bell },
  { id: "profile", label: "Profile", emoji: "\u{1F3E2}", icon: Building2 },
  { id: "settings", label: "Settings", emoji: "\u2699\uFE0F", icon: Settings },
];

export const initialRequirements = [
  { id: 1, title: "Food supplies", category: "Food & Nutrition", amountNeeded: 15000, amountRaised: 9000, status: "active" },
  { id: 2, title: "School uniforms", category: "Education", amountNeeded: 22000, amountRaised: 22000, status: "fulfilled" },
  { id: 3, title: "Medical kit restock", category: "Healthcare", amountNeeded: 8000, amountRaised: 2400, status: "active" },
];

export const initialDonations = [
  { id: "RCP-2026-0042", donor: "Anonymous", amount: 5000, date: "2026-03-28", status: "Completed", showDonor: false, paymentMethod: "UPI / PhonePe" },
  { id: "RCP-2026-0041", donor: "Priya Sharma", amount: 2500, date: "2026-03-25", status: "Completed", showDonor: true, paymentMethod: "Net Banking" },
  { id: "RCP-2026-0040", donor: "Ravi Kumar", amount: 1500, date: "2026-03-20", status: "Pending", showDonor: true, paymentMethod: "UPI / GPay" },
];

export const initialVolunteers = [
  { id: 1, name: "Anitha R.", skill: "Teaching \u2014 weekends", email: "anitha.r@email.com", phone: "+91 94432 10987", status: "pending", date: "2026-03-27" },
  { id: 2, name: "Karthik M.", skill: "Sports coaching", email: "karthik.m@email.com", phone: "+91 98841 55210", status: "accepted", date: "2026-03-18" },
  { id: 3, name: "Meena S.", skill: "Health checkup support", email: "meena.s@email.com", phone: "+91 97722 66330", status: "rejected", date: "2026-03-12" },
];

export const initialVolunteerRoles = [
  { id: 1, roleTitle: "Weekend Math & English Tutor", needed: 2, filled: 1, days: "Saturdays & Sundays (2 hrs)", status: "Open" },
  { id: 2, roleTitle: "Sports & Physical Activities Mentor", needed: 1, filled: 1, days: "Sunday Mornings", status: "Filled" },
  { id: 3, roleTitle: "Art & Craft Workshop Lead", needed: 2, filled: 0, days: "Alternate Weekends", status: "Open" },
];

export const upcomingActivities = [
  { id: 1, title: "Weekend Tutoring", when: "Sat, 5 Apr \u00B7 10:00 AM", people: 3 },
  { id: 2, title: "Garden Cleanup & Repairs", when: "Sun, 13 Apr \u00B7 9:00 AM", people: 5 },
  { id: 3, title: "Annual Health & Dental Checkup", when: "Sat, 19 Apr \u00B7 11:00 AM", people: 2 },
];

export const initialNotifications = [
  { id: 1, title: "New donation received", text: "New donation of \u20B92,500 received from Priya Sharma.", time: "2 hours ago", type: "donation", read: false },
  { id: 2, title: "Volunteer application received", text: "Volunteer application received from Anitha R. for weekend teaching.", time: "Yesterday", type: "volunteer", read: false },
  { id: 3, title: "Requirement fulfilled", text: "Requirement \u201CSchool uniforms\u201D reached 100% and is marked fulfilled.", time: "3 days ago", type: "requirement", read: true },
  { id: 4, title: "Admin verification update", text: "Admin update: Your submitted documents are currently under review.", time: "1 week ago", type: "admin", read: true },
];

export const recentActivities = [
  { text: "Food supplies requirement updated (\u20B99,000 / \u20B915,000 raised)", time: "Today" },
  { text: "New donation received \u2014 \u20B92,500 from Priya Sharma", time: "Yesterday" },
  { text: "Volunteer application received from Anitha R.", time: "2 days ago" },
  { text: "Admin review status: Documents verified successfully", time: "3 days ago" },
];
