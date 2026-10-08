function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Register",
      text: "Sign up as a donor, volunteer, or orphanage and join the Hope Haven community.",
    },
    {
      step: "02",
      title: "Connect",
      text: "Explore verified homes and find clear ways to donate, volunteer, or offer support.",
    },
    {
      step: "03",
      title: "Make an impact",
      text: "Your help goes toward education, healthcare, and everyday needs that change lives.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-leaf">
            How it works
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy text-balance md:text-5xl">
            Making a difference is simple.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Three clear steps — from joining Hope Haven to supporting children
            with care you can trust.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="pointer-events-none absolute top-7 right-[16%] left-[16%] hidden h-px bg-line md:block"
            aria-hidden="true"
          />
          {steps.map((item) => (
            <li key={item.step} className="relative text-center md:px-4">
              <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-leaf bg-white font-display text-lg font-extrabold text-leaf">
                {item.step}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
