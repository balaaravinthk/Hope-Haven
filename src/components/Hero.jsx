function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 bg-gradient-to-br from-[#FAFAFA] via-[#F3F4F6] to-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-8">

        <h1 className="text-6xl font-extrabold leading-tight text-slate-800">
  Every Child
  <br />
  Deserves a
  <br />
  <span className="text-green-600">Brighter Tomorrow.</span>
</h1>

        <p className="mt-6 text-xl max-w-2xl text-slate-600 leading-8">
  Hope Haven brings together donors, volunteers, NGOs, and orphanages
  to create brighter futures through compassion, support, and community.
</p>

        <div className="mt-10 flex gap-5">

  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
  Become a Volunteer →
</button>

  <button className="bg-white border border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 hover:scale-105 transition-all duration-300">
  Learn More
</button>

</div>

      </div>
    </section>
  );
}

export default Hero;