function Stats() {
  const stats = [
    {
      number: "12,500+",
      title: "Successful Donations",
      icon: "❤️",
    },
    {
      number: "320+",
      title: "Verified Orphanages",
      icon: "🏠",
    },
    {
      number: "4,800+",
      title: "Active Volunteers",
      icon: "🙋",
    },
    {
      number: "2,100+",
      title: "Requirements Fulfilled",
      icon: "🎁",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-8 text-center shadow hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold text-blue-700">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-600">
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