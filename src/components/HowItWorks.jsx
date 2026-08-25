function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <p className="text-green-600 font-semibold uppercase tracking-[0.25em] text-center">
          HOW IT WORKS
        </p>

        <h2 className="mt-4 text-5xl font-bold text-center text-slate-800">
          Making a Difference
          <br />
          <span className="text-green-600">is Simple.</span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-lg leading-8 text-slate-600">
          Hope Haven brings together orphanages, donors, and volunteers
          through one trusted platform, making every act of kindness
          simple, transparent, and meaningful.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">

          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700">
              1
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Register
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Sign up as a donor, volunteer, or orphanage to become part of
              the Hope Haven community.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700">
              2
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Connect
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Explore verified orphanages and discover opportunities to
              donate, volunteer, or provide support.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700">
              3
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Make an Impact
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Your contributions directly help children by supporting
              education, healthcare, and everyday needs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;