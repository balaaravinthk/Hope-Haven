import { Link } from "react-router-dom";
import logoBest from "../assets/logoisthebest.png";

function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-haven pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(26,54,84,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        <div className="max-w-xl">
          <p className="animate-rise font-display text-sm font-bold uppercase tracking-[0.28em] text-leaf">
            Hope Haven
          </p>

          <h1 className="animate-rise-delay mt-4 font-display text-5xl font-extrabold leading-[1.08] text-navy text-balance sm:text-6xl lg:text-[4rem]">
            Every child deserves a brighter tomorrow.
          </h1>

          <p className="animate-rise-delay-2 mt-6 max-w-lg text-lg leading-8 text-muted">
            Connect donors, volunteers, and verified orphanages in one trusted
            place — simple support that reaches children who need it most.
          </p>

          <div className="animate-rise-delay-2 mt-9 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-xl bg-leaf px-7 py-3.5 font-display text-base font-bold text-white transition-colors hover:bg-leaf-deep"
            >
              Become a Volunteer
            </Link>
            <button
              type="button"
              onClick={scrollToAbout}
              className="rounded-xl border border-navy/20 bg-white/70 px-7 py-3.5 font-display text-base font-bold text-navy transition-colors hover:border-navy/40 hover:bg-white"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            className="absolute h-64 w-64 rounded-full bg-glow/80 blur-3xl sm:h-80 sm:w-80"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 bottom-8 h-40 w-40 rounded-full bg-leaf/15 blur-2xl"
            aria-hidden="true"
          />
          <img
            src={logoBest}
            alt="Hope Haven — Care. Love. Support. Together."
            className="animate-float relative z-10 w-full max-w-[340px] object-contain drop-shadow-sm sm:max-w-[400px]"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default Hero;
