import { signOut, useSession } from "next-auth/react";
import { LogOut, User, LayoutDashboard, Images, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/admin/login", redirect: true });
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/gallery",   label: "Gallery",   icon: Images },
  ];

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900 hidden sm:block">KidzStar Admin</span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${active
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {session?.user?.email && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium max-w-[180px] truncate">
                  {session.user.email}
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold
                bg-red-50 text-red-600 border border-red-100
                hover:bg-red-600 hover:text-white hover:border-red-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              <LogOut size={15} />
              <span className="hidden sm:block">
                {isLoggingOut ? "Logging out…" : "Logout"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
