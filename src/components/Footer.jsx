import logoBest from "../assets/logoisthebest.png";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logoBest}
              alt="Hope Haven"
              className="w-12 h-12 object-contain"
            />

            <h2 className="text-3xl font-bold">
              Hope<span className="text-green-500">Haven</span>
            </h2>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-gray-300 font-medium">
            <a href="#about" className="hover:text-green-400 transition">
              About
            </a>

            <a href="#services" className="hover:text-green-400 transition">
              Services
            </a>

            <a href="#contact" className="hover:text-green-400 transition">
              Contact
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">

          <p>© 2026 Hope Haven. All Rights Reserved.</p>

          <p>Made with ❤️ for a better future.</p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;