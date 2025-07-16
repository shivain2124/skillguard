import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="md:py-20 py-10 bg-gradient-to-br from-white via-orange-50 to-orange-100 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              SkillGuard - Stop Skills from Fading Away
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Get personalized alerts and data-driven insights to stay sharp and
              competitive. Your skills are investments - protect them.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/sign-up?plan=byos">
                <Button className="bg-orange-500 text-white rounded-3xl hover:bg-orange-500/90 hover:scale-105 transition-all duration-300 font-medium shadow-lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-72 sm:h-80 md:h-88 lg:h-[26rem]">
              <Image
                src="/images/fox.svg"
                alt="Vizz Platform Visualization"
                fill
                className="object-contain rounded-2xl"
                priority={true}
              />
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/15 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features: string[] = [
  "Track Your Skills. Master Your Growth.",
  "Stop Losing Skills You Worked Hard to Build",
];

export default Hero;
