import { signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ 
      callbackUrl: "/admin/login",
      redirect: true 
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <User style={{ width: "20px", height: "20px", color: "#6B7280" }} />
              <span className="text-sm text-gray-600">{session.user.email}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            <LogOut style={{ width: "20px", height: "20px" }} />
            <span className="font-medium">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
