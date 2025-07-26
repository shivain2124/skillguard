export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-bold text-gray-900">SkillGuard</span>
          </div>

          <p className="text-gray-500 text-sm">
            &copy; 2025 SkillGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// const quickLinks = [
//   { name: "Dashboard", href: "/dashboard" },
//   { name: "Analytics", href: "/analytics" },
//   { name: "Why SkillGuard", href: "/why-skillguard" },
// ];

export default Footer;
