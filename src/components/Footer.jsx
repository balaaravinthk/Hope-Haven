import logoBest from "../assets/logoisthebest.png";

function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={logoBest}
              alt=""
              className="h-11 w-11 rounded-full bg-white/95 object-contain p-0.5"
            />
            <p className="font-display text-2xl font-extrabold tracking-tight">
              Hope<span className="text-leaf">Haven</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-display text-sm font-semibold text-white/75">
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#services" className="transition-colors hover:text-white">
              Services
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div className="my-8 border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/55 md:flex-row">
          <p>© 2026 Hope Haven. All rights reserved.</p>
          <p>Care. Love. Support. Together.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
