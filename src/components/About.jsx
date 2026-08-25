function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-[#FAFAFA] via-[#F3F4F6] to-[#E5E7EB]"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Tag */}
        <p className="text-green-600 font-semibold uppercase tracking-[0.25em]">
          ABOUT US
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-5xl font-bold text-slate-800 leading-tight">
          Together, We Create
          <br />
          <span className="text-green-600">Brighter Futures.</span>
        </h2>

        {/* Paragraph */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
          Hope Haven connects orphanages, donors, and volunteers through one
          trusted platform. We believe every act of kindness can transform a
          child's future by making support simple, transparent, and meaningful.
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-green-600 rounded-full mt-12 mb-12"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-4xl">
              🤝
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Trusted Platform
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              A secure platform connecting donors, volunteers and orphanages
              with complete transparency.
            </p>

          </div>

          {/* Card 2 */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl">
              🏠
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Verified Orphanages
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Every registered orphanage is verified to ensure trust, safety
              and meaningful support.
            </p>

          </div>

          {/* Card 3 */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-4xl">
              ❤️
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Community Driven
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Together, we build brighter futures through kindness,
              volunteering and collective action.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;