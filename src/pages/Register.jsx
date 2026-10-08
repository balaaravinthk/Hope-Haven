import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  HandHeart,
  ArrowLeft,
  Eye,
  EyeOff,
  Upload,
  ImagePlus,
  X,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import logoBest from "../assets/logoisthebest.png";

const roles = [
  {
    id: "supporter",
    title: "Donor & Volunteer",
    text: "Give support or share your time — one account for both.",
    icon: HandHeart,
  },
  {
    id: "orphanage",
    title: "Orphanage",
    text: "Register your home and connect with helpers.",
    icon: Building2,
  },
];

const organizationTypes = [
  "Children’s Home / CCI",
  "Adoption Agency",
  "NGO / Trust",
  "Government Home",
  "Other",
];

const MAX_PHOTO_MB = 2;
const MAX_DOC_MB = 5;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DOC_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const inputClass =
  "w-full rounded-xl border border-line bg-mist/40 px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/60 focus:border-leaf focus:bg-white focus:ring-2 focus:ring-leaf/20";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  city: "",
  organizationName: "",
  registrationNumber: "",
  organizationType: "",
  address: "",
  contactNumber: "",
  orgEmail: "",
  panNumber: "",
  cciJjNumber: "",
  authorizedPersonName: "",
  aadhaarNumber: "",
  agree: false,
};

/** Verhoeff checksum — used to check Aadhaar number format. */
function isValidAadhaar(aadhaar) {
  const digits = aadhaar.replace(/\s/g, "");
  if (!/^[2-9]\d{11}$/.test(digits)) return false;

  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  let c = 0;
  const reversed = digits.split("").reverse().map(Number);
  for (let i = 0; i < reversed.length; i += 1) {
    c = d[c][p[i % 8][reversed[i]]];
  }
  return c === 0;
}

function maskMobile(mobile) {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 4) return "****";
  return `******${digits.slice(-4)}`;
}

function formatAadhaarDisplay(value) {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

const initialFiles = {
  idProof: null,
  registrationCertificate: null,
  addressProof: null,
  frontPicture: null,
};

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Register() {
  const [role, setRole] = useState("supporter");
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState(initialFiles);
  const [photoPreview, setPhotoPreview] = useState("");
  const [fileError, setFileError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarError, setAadhaarError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [demoOtpHint, setDemoOtpHint] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "aadhaarNumber" || field === "contactNumber") {
      setAadhaarVerified(false);
      setOtpSent(false);
      setAadhaarOtp("");
      setGeneratedOtp("");
      setDemoOtpHint("");
      setAadhaarError("");
    }
  };

  useEffect(() => {
    if (otpTimer <= 0) return undefined;
    const id = setTimeout(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [otpTimer]);

  const resetAadhaarFlow = () => {
    setAadhaarOtp("");
    setGeneratedOtp("");
    setOtpSent(false);
    setAadhaarVerified(false);
    setAadhaarError("");
    setOtpTimer(0);
    setDemoOtpHint("");
  };

  const resetAll = () => {
    setSubmitted(false);
    setForm(initialForm);
    setFiles(initialFiles);
    setPhotoPreview("");
    setFileError("");
    resetAadhaarFlow();
  };

  const sendAadhaarOtp = () => {
    const aadhaarDigits = form.aadhaarNumber.replace(/\s/g, "");
    const mobileDigits = form.contactNumber.replace(/\D/g, "");

    if (!form.contactNumber.trim() || mobileDigits.length < 10) {
      setAadhaarError("Enter a valid Contact Number first to receive the OTP.");
      return;
    }
    if (!isValidAadhaar(aadhaarDigits)) {
      setAadhaarError(
        "Enter a valid 12-digit Aadhaar number. Please check and try again."
      );
      return;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpSent(true);
    setAadhaarVerified(false);
    setAadhaarOtp("");
    setOtpTimer(60);
    setAadhaarError("");
    // Frontend demo only — real SMS / UIDAI Aadhaar OTP needs a backend + KYC API later.
    setDemoOtpHint(otp);
  };

  const verifyAadhaarOtp = () => {
    if (!otpSent || !generatedOtp) {
      setAadhaarError("Send OTP to your registered mobile number first.");
      return;
    }
    if (aadhaarOtp.trim() !== generatedOtp) {
      setAadhaarError("Invalid OTP. Please check and try again.");
      setAadhaarVerified(false);
      return;
    }
    setAadhaarVerified(true);
    setAadhaarError("");
    setDemoOtpHint("");
  };

  const handleFile = (key, file, { maxMb, acceptTypes, isPhoto = false }) => {
    if (!file) return;

    if (!acceptTypes.includes(file.type)) {
      setFileError(
        isPhoto
          ? "Front picture must be JPG, PNG, or WebP."
          : "Documents must be JPG, PNG, WebP, or PDF."
      );
      return;
    }

    if (file.size > maxMb * 1024 * 1024) {
      setFileError(
        isPhoto
          ? `Front picture must be ${maxMb} MB or smaller.`
          : `${key === "idProof" ? "ID proof" : key === "addressProof" ? "Address proof" : "Registration certificate"} must be ${maxMb} MB or smaller.`
      );
      return;
    }

    setFileError("");
    setFiles((prev) => ({ ...prev, [key]: file }));

    if (isPhoto) {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(String(reader.result || ""));
      reader.readAsDataURL(file);
    }
  };

  const clearFrontPicture = () => {
    setFiles((prev) => ({ ...prev, frontPicture: null }));
    setPhotoPreview("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // For now, allow create without full orphanage docs / Aadhaar.
    // Stricter checks can return when the backend is connected.
    setFileError("");
    setAadhaarError("");
    setSubmitted(true);
  };

  const FieldLabel = ({ children, required: isRequired = false }) => (
    <span className="mb-2 block font-display text-sm font-semibold text-navy">
      {children}
      {isRequired && (
        <span className="ml-0.5 text-heart" aria-hidden="true">
          *
        </span>
      )}
    </span>
  );

  const FileUpload = ({ label, fileKey, hint }) => (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-line bg-mist/30 px-4 py-3 transition-colors hover:border-leaf/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-leaf-soft text-leaf">
            <Upload size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-navy">
              {files[fileKey]?.name || "Choose file"}
            </p>
            <p className="text-xs text-muted">
              {files[fileKey]
                ? formatSize(files[fileKey].size)
                : hint}
            </p>
          </div>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={(e) =>
            handleFile(fileKey, e.target.files?.[0], {
              maxMb: MAX_DOC_MB,
              acceptTypes: DOC_TYPES,
            })
          }
          className="text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-leaf file:px-3 file:py-1.5 file:font-display file:text-sm file:font-semibold file:text-white hover:file:bg-leaf-deep"
        />
      </div>
    </label>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-haven">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(26,54,84,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img
              src={logoBest}
              alt=""
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-2xl font-extrabold tracking-tight">
              <span className="text-navy">Hope</span>
              <span className="text-leaf">Haven</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-navy/70 transition-colors hover:text-leaf"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        <div className="animate-rise mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-leaf">
            Join us
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-navy text-balance md:text-5xl">
            Create your Hope Haven account
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Choose how you want to help, then fill in a few details to get
            started.
          </p>
        </div>

        {submitted ? (
          <div className="animate-rise mx-auto mt-10 max-w-xl rounded-2xl border border-leaf/30 bg-white p-8 text-center md:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft text-leaf">
              {role === "orphanage" ? (
                <Building2 size={28} />
              ) : (
                <HandHeart size={28} />
              )}
            </div>
            {role === "orphanage" ? (
              <>
                <h2 className="mt-5 font-display text-2xl font-extrabold text-navy">
                  Thank you for registering
                </h2>
                <p className="mt-3 leading-7 text-muted">
                  We’ve received your orphanage details and documents. Our team
                  will review them and get back to you shortly.
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-5 font-display text-2xl font-extrabold text-navy">
                  Welcome aboard
                </h2>
                <p className="mt-3 leading-7 text-muted">
                  Your donor & volunteer registration is ready. You can log in
                  anytime to continue helping.
                </p>
              </>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={role === "orphanage" ? "/" : "/login"}
                className="rounded-xl bg-leaf px-6 py-3 font-display font-bold text-white transition-colors hover:bg-leaf-deep"
              >
                {role === "orphanage" ? "Back to home" : "Go to Login"}
              </Link>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-xl border border-navy/15 bg-white px-6 py-3 font-display font-bold text-navy transition-colors hover:border-navy/30"
              >
                Register another
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="animate-rise-delay mx-auto mt-10 max-w-3xl"
          >
            <fieldset>
              <legend className="mb-4 font-display text-base font-bold text-navy">
                I want to join as
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map(({ id, title, text, icon: Icon }) => {
                  const active = role === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setRole(id);
                        setFileError("");
                        if (id !== "orphanage") resetAadhaarFlow();
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active
                          ? "border-leaf bg-leaf-soft shadow-[0_0_0_1px_rgba(47,143,91,0.25)]"
                          : "border-line bg-white/80 hover:border-leaf/40"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          active
                            ? "bg-leaf text-white"
                            : "bg-mist text-leaf"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <p className="mt-3 font-display text-lg font-bold text-navy">
                        {title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 rounded-2xl border border-line bg-white/90 p-6 backdrop-blur-sm md:p-8">
              {role === "supporter" ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <FieldLabel required>Full name</FieldLabel>
                    <input
                      required
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <FieldLabel required>Email</FieldLabel>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <FieldLabel required>Phone</FieldLabel>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <FieldLabel required>City</FieldLabel>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Coimbatore"
                      className={inputClass}
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-lg font-bold text-navy">
                      Organization details
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Used to verify your orphanage before it goes live.
                    </p>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <label className="block md:col-span-2">
                        <FieldLabel>Organization Name</FieldLabel>
                        <input
                          type="text"
                          value={form.organizationName}
                          onChange={(e) =>
                            updateField("organizationName", e.target.value)
                          }
                          placeholder="Hope Children’s Home"
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>Registration Number</FieldLabel>
                        <input
                          type="text"
                          value={form.registrationNumber}
                          onChange={(e) =>
                            updateField("registrationNumber", e.target.value)
                          }
                          placeholder="Reg. number"
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>Organization Type</FieldLabel>
                        <select
                          value={form.organizationType}
                          onChange={(e) =>
                            updateField("organizationType", e.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {organizationTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block md:col-span-2">
                        <FieldLabel>Address</FieldLabel>
                        <textarea
                          rows={3}
                          value={form.address}
                          onChange={(e) => updateField("address", e.target.value)}
                          placeholder="Full postal address"
                          className={`${inputClass} resize-y`}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>Contact Number</FieldLabel>
                        <input
                          type="tel"
                          value={form.contactNumber}
                          onChange={(e) =>
                            updateField("contactNumber", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>Email</FieldLabel>
                        <input
                          required
                          type="email"
                          value={form.orgEmail}
                          onChange={(e) =>
                            updateField("orgEmail", e.target.value)
                          }
                          placeholder="org@email.com"
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>PAN Number</FieldLabel>
                        <input
                          required
                          type="text"
                          value={form.panNumber}
                          onChange={(e) =>
                            updateField(
                              "panNumber",
                              e.target.value.toUpperCase()
                            )
                          }
                          placeholder="ABCDE1234F"
                          maxLength={10}
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <FieldLabel>CCI/JJ Registration Number</FieldLabel>
                        <input
                          required
                          type="text"
                          value={form.cciJjNumber}
                          onChange={(e) =>
                            updateField("cciJjNumber", e.target.value)
                          }
                          placeholder="CCI / JJ Act registration no."
                          className={inputClass}
                        />
                      </label>

                      <label className="block md:col-span-2">
                        <FieldLabel>Authorized Person Name</FieldLabel>
                        <input
                          required
                          type="text"
                          value={form.authorizedPersonName}
                          onChange={(e) =>
                            updateField("authorizedPersonName", e.target.value)
                          }
                          placeholder="Name of authorized person"
                          className={inputClass}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold text-navy">
                      Aadhaar verification
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Enter the authorized person’s Aadhaar. We’ll send an OTP
                      to the Contact Number above for verification.
                    </p>

                    <div className="mt-5 space-y-4 rounded-2xl border border-line bg-mist/20 p-5">
                      <label className="block">
                        <FieldLabel>Aadhaar Number</FieldLabel>
                        <input
                          required
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          value={form.aadhaarNumber}
                          onChange={(e) =>
                            updateField(
                              "aadhaarNumber",
                              formatAadhaarDisplay(e.target.value)
                            )
                          }
                          placeholder="XXXX XXXX XXXX"
                          maxLength={14}
                          disabled={aadhaarVerified}
                          className={inputClass}
                        />
                      </label>

                      {aadhaarVerified ? (
                        <div className="flex items-center gap-2 rounded-xl border border-leaf/30 bg-leaf-soft px-4 py-3 text-sm font-medium text-leaf-deep">
                          <CheckCircle2 size={18} />
                          Aadhaar verified via OTP on {maskMobile(form.contactNumber)}
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-end gap-3">
                            <button
                              type="button"
                              onClick={sendAadhaarOtp}
                              disabled={otpTimer > 0}
                              className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:bg-navy/40"
                            >
                              <ShieldCheck size={16} />
                              {otpSent
                                ? otpTimer > 0
                                  ? `Resend OTP in ${otpTimer}s`
                                  : "Resend OTP"
                                : "Send OTP"}
                            </button>
                            <p className="pb-2 text-xs text-muted">
                              OTP goes to {form.contactNumber ? maskMobile(form.contactNumber) : "your contact number"}
                            </p>
                          </div>

                          {otpSent && (
                            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                              <label className="block">
                                <FieldLabel>Enter OTP</FieldLabel>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={aadhaarOtp}
                                  onChange={(e) => {
                                    setAadhaarOtp(
                                      e.target.value.replace(/\D/g, "").slice(0, 6)
                                    );
                                    setAadhaarError("");
                                  }}
                                  placeholder="6-digit OTP"
                                  maxLength={6}
                                  className={inputClass}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={verifyAadhaarOtp}
                                className="rounded-xl bg-leaf px-5 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-leaf-deep sm:self-end sm:py-[0.85rem]"
                              >
                                Verify OTP
                              </button>
                            </div>
                          )}

                          {demoOtpHint && (
                            <p className="rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm text-muted">
                              Demo mode (no SMS API yet): use OTP{" "}
                              <span className="font-display font-bold text-navy">
                                {demoOtpHint}
                              </span>{" "}
                              — later this will be sent to the registered mobile
                              via Aadhaar / SMS provider.
                            </p>
                          )}
                        </>
                      )}

                      {aadhaarError && (
                        <p className="text-sm font-medium text-heart">
                          {aadhaarError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold text-navy">
                      Verification documents
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      JPG, PNG, WebP, or PDF — max {MAX_DOC_MB} MB each.
                    </p>
                    <div className="mt-5 grid gap-5 md:grid-cols-1">
                      <FileUpload
                        label="ID Proof"
                        fileKey="idProof"
                        hint={`Aadhaar / PAN / Passport · max ${MAX_DOC_MB} MB`}
                      />
                      <FileUpload
                        label="Registration Certificate"
                        fileKey="registrationCertificate"
                        hint={`Official registration certificate · max ${MAX_DOC_MB} MB`}
                      />
                      <FileUpload
                        label="Address Proof"
                        fileKey="addressProof"
                        hint={`Utility bill / lease / govt. letter · max ${MAX_DOC_MB} MB`}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold text-navy">
                      Orphanage front picture
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Clear photo of the building front — JPG, PNG, or WebP ·
                      max {MAX_PHOTO_MB} MB.
                    </p>

                    <div className="mt-5">
                      {photoPreview ? (
                        <div className="relative overflow-hidden rounded-2xl border border-line">
                          <img
                            src={photoPreview}
                            alt="Orphanage front preview"
                            className="h-52 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={clearFrontPicture}
                            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm transition-colors hover:bg-white"
                            aria-label="Remove photo"
                          >
                            <X size={16} />
                          </button>
                          <p className="absolute bottom-0 left-0 right-0 bg-navy/70 px-4 py-2 text-xs text-white">
                            {files.frontPicture?.name} ·{" "}
                            {formatSize(files.frontPicture?.size || 0)}
                          </p>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-mist/30 px-6 py-10 transition-colors hover:border-leaf/40">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
                            <ImagePlus size={22} />
                          </div>
                          <div className="text-center">
                            <p className="font-display font-bold text-navy">
                              Upload front picture
                            </p>
                            <p className="mt-1 text-sm text-muted">
                              Max {MAX_PHOTO_MB} MB · JPG, PNG, WebP
                            </p>
                          </div>
                          <input
                            required
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={(e) =>
                              handleFile("frontPicture", e.target.files?.[0], {
                                maxMb: MAX_PHOTO_MB,
                                acceptTypes: PHOTO_TYPES,
                                isPhoto: true,
                              })
                            }
                            className="text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-leaf file:px-3 file:py-1.5 file:font-display file:text-sm file:font-semibold file:text-white hover:file:bg-leaf-deep"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-5 border-t border-line pt-8 md:grid-cols-2">
                <label className="block">
                  <FieldLabel required={role !== "orphanage"}>Password</FieldLabel>
                  <div className="relative">
                    <input
                      required
                      minLength={6}
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="At least 6 characters"
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted transition-colors hover:text-navy"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <label className="block">
                  <FieldLabel required={role !== "orphanage"}>
                    Confirm password
                  </FieldLabel>
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    placeholder="Repeat password"
                    className={inputClass}
                  />
                </label>
              </div>

              {form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="mt-3 text-sm font-medium text-heart">
                    Passwords do not match.
                  </p>
                )}

              {fileError && (
                <p className="mt-3 text-sm font-medium text-heart">{fileError}</p>
              )}

              <label className="mt-6 flex items-start gap-3">
                <input
                  required
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => updateField("agree", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-line accent-leaf"
                />
                <span className="text-sm leading-6 text-muted">
                  I agree to Hope Haven’s community guidelines and understand
                  that orphanage accounts may require verification.
                </span>
              </label>

              <button
                type="submit"
                disabled={
                  !form.agree ||
                  !form.password ||
                  form.password !== form.confirmPassword
                }
                className="mt-7 w-full rounded-xl bg-leaf px-6 py-3.5 font-display text-base font-bold text-white transition-all hover:bg-leaf-deep disabled:cursor-not-allowed disabled:bg-leaf/40"
              >
                Create account
              </button>

              <p className="mt-5 text-center text-sm text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-display font-bold text-leaf transition-colors hover:text-leaf-deep"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
