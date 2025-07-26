import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Don&apos;t Let Another Day of Skills Slip Away
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Every day you wait is another day your hard-earned skills fade. Start
          protecting your professional investment today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Guard My Skills Now
              <Shield className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
