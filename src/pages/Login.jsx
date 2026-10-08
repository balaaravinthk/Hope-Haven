import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logoBest from "../assets/logoisthebest.png";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Demo: orphanage accounts open the organization dashboard.
    // Later, redirect by role from the backend (orphanage / donor / volunteer).
    navigate("/orphanage/dashboard");
  };

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
            Welcome back
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-navy text-balance md:text-5xl">
            Log in to Hope Haven
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Orphanage accounts open your organization dashboard. Donor and
            volunteer dashboards will connect next.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate-rise-delay mx-auto mt-10 max-w-xl"
        >
          <div className="rounded-2xl border border-line bg-white/90 p-6 backdrop-blur-sm md:p-8">
            <div className="grid gap-5">
              <label className="block">
                <span className="mb-2 block font-display text-sm font-semibold text-navy">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-line bg-mist/40 px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/60 focus:border-leaf focus:bg-white focus:ring-2 focus:ring-leaf/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-display text-sm font-semibold text-navy">
                  Password
                </span>
                <div className="relative">
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Your password"
                    className="w-full rounded-xl border border-line bg-mist/40 px-4 py-3 pr-12 text-ink outline-none transition-all placeholder:text-muted/60 focus:border-leaf focus:bg-white focus:ring-2 focus:ring-leaf/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted transition-colors hover:text-navy"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => updateField("remember", e.target.checked)}
                  className="h-4 w-4 rounded border-line accent-leaf"
                />
                <span className="text-sm text-muted">Remember me</span>
              </label>
              <span className="text-sm font-medium text-muted/70">
                Forgot password? Coming soon
              </span>
            </div>

            <button
              type="submit"
              disabled={!form.email || !form.password}
              className="mt-7 w-full rounded-xl bg-leaf px-6 py-3.5 font-display text-base font-bold text-white transition-all hover:bg-leaf-deep disabled:cursor-not-allowed disabled:bg-leaf/40"
            >
              Log in
            </button>

            <p className="mt-5 text-center text-sm text-muted">
              New here?{" "}
              <Link
                to="/register"
                className="font-display font-bold text-leaf transition-colors hover:text-leaf-deep"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
