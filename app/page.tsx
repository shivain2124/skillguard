import Hero from "@/app/_components/hero";
import Navbar from "@/app/_components/navbar/navbar";
import Stats from "@/app/_components/stats";
import Feature from "@/app/_components/feature";
import CTA from "@/app/_components/cta";
import { Footer } from "@/app/_components/footer/footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Feature />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;
