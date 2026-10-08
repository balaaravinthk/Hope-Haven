function Stats() {
  const stats = [
    { number: "12,500+", title: "Successful donations" },
    { number: "320+", title: "Verified orphanages" },
    { number: "4,800+", title: "Active volunteers" },
    { number: "2,100+", title: "Needs fulfilled" },
  ];

  return (
    <section className="border-y border-line bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((item) => (
            <div key={item.title} className="text-center lg:text-left">
              <p className="font-display text-3xl font-extrabold text-navy md:text-4xl">
                {item.number}
              </p>
              <p className="mt-2 text-sm font-medium text-muted md:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
