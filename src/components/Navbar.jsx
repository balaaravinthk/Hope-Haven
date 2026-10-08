import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoBest from "../assets/logoisthebest.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5"
          aria-label="Hope Haven home"
        >
          <img
            src={logoBest}
            alt=""
            className="h-11 w-11 object-contain md:h-12 md:w-12"
          />
          <span className="font-display text-2xl font-extrabold tracking-tight md:text-[1.7rem]">
            <span className="text-navy">Hope</span>
            <span className="text-leaf">Haven</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="font-display text-[0.95rem] font-semibold text-navy/80 transition-colors hover:text-leaf"
            >
              {link.label}
            </button>
          ))}

          <Link
            to="/login"
            className="font-display text-[0.95rem] font-semibold text-navy/80 transition-colors hover:text-leaf"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-leaf px-5 py-2.5 font-display text-[0.95rem] font-bold text-white transition-colors hover:bg-leaf-deep"
          >
            Join Us
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="rounded-lg px-3 py-2 text-left font-display font-semibold text-navy hover:bg-leaf-soft"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-display font-semibold text-navy hover:bg-leaf-soft"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-leaf px-4 py-3 text-center font-display font-bold text-white hover:bg-leaf-deep"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
