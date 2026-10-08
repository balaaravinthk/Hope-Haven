import { HeartHandshake, ShieldCheck, Users } from "lucide-react";

function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trusted platform",
      text: "Transparent connections between donors, volunteers, and orphanages — so every act of kindness is clear and accountable.",
    },
    {
      icon: HeartHandshake,
      title: "Verified orphanages",
      text: "Homes are verified before they appear on Hope Haven, helping support reach children safely and meaningfully.",
    },
    {
      icon: Users,
      title: "Community driven",
      text: "People and partners work together — mentoring, donating, and showing up — to build brighter futures side by side.",
    },
  ];

  return (
    <section id="about" className="bg-haven-soft py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-leaf">
            About us
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-navy text-balance md:text-5xl">
            Together, we create brighter futures.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Hope Haven brings orphanages, donors, and volunteers onto one calm,
            trusted platform — making support simple, transparent, and human.
          </p>
          <div className="animate-fade-line mt-8 h-1 w-20 origin-left rounded-full bg-leaf" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
                <Icon size={24} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">
                {title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
