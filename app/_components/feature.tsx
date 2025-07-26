import { Shield, TrendingUp, Target, Clock, BarChart3 } from "lucide-react";

export default function feature() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            SkillGuard: Your Personal Skill Protector
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced analytics meet proven learning science to keep your skills
            sharp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-8">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  SkillGuard Dashboard
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
          </div>

          <div className="space-y-8">
            {rightFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 flex-row-reverse text-right"
              >
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const leftFeatures = [
  {
    icon: Target,
    title: "Personalized Practice",
    description:
      "Custom exercises and challenges tailored to your specific skill gaps",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Clock,
    title: "Smart Reminders",
    description: "Science-based notifications when your skills need attention",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const rightFeatures = [
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Detailed insights showing your skill growth and maintenance trends",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Career Impact Tracking",
    description:
      "See how maintaining skills translates to career opportunities",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];
