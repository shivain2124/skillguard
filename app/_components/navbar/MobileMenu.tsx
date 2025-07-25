"use client";

import { X, LogOut } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{
    name: string;
    href: string;
  }>;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems,
  onSignOut,
}: MobileMenuProps) {
  if (!isOpen) return null;

  const additionalMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 py-4">
              <nav className="space-y-1 px-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              <div className="mt-8 px-4">
                <div className="space-y-1">
                  {additionalMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="flex items-center w-full px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
