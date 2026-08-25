function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-[#FAFAFA] via-[#F3F4F6] to-[#E5E7EB]"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <p className="text-green-600 font-semibold uppercase tracking-[0.25em] text-center">
          OUR SERVICES
        </p>

        <h2 className="mt-4 text-5xl font-bold text-center text-slate-800">
          How You Can
          <br />
          <span className="text-green-600">Make a Difference.</span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-lg leading-8 text-slate-600">
          Every contribution matters. Whether you donate, volunteer, or partner
          with us, your support helps create a brighter future for children.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          {/* Donate */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-4xl">
              💚
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Donate
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Support children by contributing towards education, healthcare,
              meals, and daily essentials.
            </p>

            <button className="mt-8 text-green-600 font-semibold hover:text-green-700">
              Learn More →
            </button>

          </div>

          {/* Volunteer */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl">
              🤝
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Volunteer
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Share your skills and time to mentor, teach, and inspire children
              in orphanages.
            </p>

            <button className="mt-8 text-green-600 font-semibold hover:text-green-700">
              Learn More →
            </button>

          </div>

          {/* Partner */}
          <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-4xl">
              🏠
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Partner With Us
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Register your orphanage or organization and connect with donors
              and volunteers.
            </p>

            <button className="mt-8 text-green-600 font-semibold hover:text-green-700">
              Learn More →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Services;