import WhyNeeded from "./_component/why-needed";
import Hero from "./_component/hero";
import Navbar from "@/app/_components/navbar/navbar";
import { getUser } from "@/lib/auth/getUser";

const WhySkillGuardPage = async () => {
  const userResult = await getUser();
  const user = userResult?.user || null;

  return (
    <div>
      <Navbar user={user} />
      <Hero />
      <WhyNeeded />
    </div>
  );
};

export default WhySkillGuardPage;
