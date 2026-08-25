import { Link } from "react-router-dom";
import logoBest from "../assets/logoisthebest.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoBest}
            alt="Hope Haven Logo"
            className="w-12 h-12 object-contain"
          />

          <h1 className="text-3xl font-bold">
            <span className="text-slate-800">Hope</span>
            <span className="text-green-600">Haven</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10 font-semibold">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="text-slate-700 hover:text-green-600 transition duration-300"
          >
            Home
          </button>

          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="text-slate-700 hover:text-green-600 transition duration-300"
          >
            About
          </button>

          <button
  onClick={() =>
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="text-slate-700 hover:text-green-600 transition-colors"
>
  Services
</button>

          <button
  onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="text-slate-700 hover:text-green-600 transition duration-300"
>
  Contact
</button>

          <Link
            to="/login"
            className="text-slate-700 hover:text-green-600 transition duration-300"
          >
            Login
          </Link>

          <Link
  to="/register"
  className="
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    text-white
    px-6
    py-3
    rounded-full
    font-semibold
    shadow-lg
    hover:scale-105
    hover:shadow-xl
    hover:from-green-600
    hover:to-emerald-700
    transition-all
    duration-300
  "
>
  Register →
</Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;