import { TrendingDown, Briefcase, DollarSign, SearchX } from "lucide-react";
import Link from "next/link";

export const WhyNeeded = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-[4%] sm:px-[8%]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why You Need SkillGuard
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your Skills Are Constantly Fading - Here&apos;s Why That Matters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-12">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border p-6 md:p-8"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${problem.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <IconComponent
                      size={24}
                      className={`text-${problem.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 ml-4">
                    {problem.title}
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {problem.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span
                        className={`w-2 h-2 bg-${problem.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}
                      ></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
            The Numbers Don&apos;t Lie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-700">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-4xl mx-auto">
            Don&apos;t let your hard-earned skills become yesterday&apos;s
            achievements. SkillGuard helps you stay sharp, competitive, and
            always ready for the next opportunity.
          </p>
          <Link
            href="/login"
            className="bg-primary text-white px-8 py-3 md:px-10 md:py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          >
            Start Protecting Your Skills Today
          </Link>
        </div>
      </div>
    </section>
  );
};
const problems = [
  {
    icon: TrendingDown,
    title: "The Forgetting Curve Reality",
    color: "red",
    bgColor: "bg-red-100",
    points: [
      "Studies show we forget 50% of new information within 24 hours",
      "Without practice, technical skills decay exponentially over time",
      "What took months to learn can disappear in weeks of neglect",
    ],
  },
  {
    icon: Briefcase,
    title: "Career Impact",
    color: "orange",
    bgColor: "bg-orange-100",
    points: [
      "Outdated skills mean missed opportunities and lower earning potential",
      "Employers expect continuous skill maintenance and growth",
      "Skills gaps can cost you promotions and competitive advantage",
    ],
  },
  {
    icon: DollarSign,
    title: "The Hidden Cost",
    color: "yellow",
    bgColor: "bg-yellow-100",
    points: [
      "You've invested thousands of hours building your expertise",
      "Letting skills fade means wasting your time and money investments",
      "Rebuilding forgotten skills takes 3x longer than maintaining them",
    ],
  },
  {
    icon: SearchX,
    title: "No Awareness Problem",
    color: "blue",
    bgColor: "bg-blue-100",
    points: [
      "Most people don't realize their skills are declining until it's too late",
      "By the time you notice, significant proficiency has already been lost",
      "Without tracking, you can't optimize your practice schedule",
    ],
  },
];
const statistics = [
  {
    value: "70%",
    description: "of professionals report skill gaps in their field",
  },
  {
    value: "$13.5M",
    description: "companies lose annually due to skill decay",
  },
  {
    value: "80%",
    description: "skill decay reduction with regular practice",
  },
];

export default WhyNeeded;
