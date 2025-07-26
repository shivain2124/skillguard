export default function Stats() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            The Silent Career Killer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your skills are constantly decaying, and you might not even realize
            it
          </p>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {problemStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.title}
              </h3>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const problemStats = [
  {
    value: "50%",
    title: "Skills Lost",
    description: "within 24 hours without practice",
  },
  {
    value: "70%",
    title: "Professionals",
    description: "report skill gaps in their field",
  },
  {
    value: "3x",
    title: "Longer",
    description: "to rebuild vs. maintain skills",
  },
];
