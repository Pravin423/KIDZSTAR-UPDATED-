import ProtectedRoute from "@/components/ProtectedRoute";
import AdminHeader from "@/components/AdminHeader";
import { useEffect, useState } from "react";
import { Users, GraduationCap, Download, Images, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [admissions, setAdmissions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/export")
      .then(res => res.json())
      .then(data => {
        setAdmissions(data.admissions);
        setTeachers(data.teachers);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Statistics data
  const stats = [
    {
      title: "Total Admissions",
      value: admissions.length,
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Teacher Applications",
      value: teachers.length,
      icon: GraduationCap,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Total Records",
      value: admissions.length + teachers.length,
      icon: TrendingUp,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600"
    }
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Export Data",
      description: "Download all records as Excel",
      icon: Download,
      color: "bg-green-500",
      href: "/api/export?download=true",
      external: true
    },
    {
      title: "Manage Gallery",
      description: "Upload and manage gallery images",
      icon: Images,
      color: "bg-blue-500",
      href: "/admin/gallery",
      external: false
    }
  ];

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="p-10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <div className="p-6 lg:p-10">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`${stat.lightColor} p-4 rounded-xl`}>
                      <Icon style={{ width: "32px", height: "32px" }} className={stat.textColor} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const Component = action.external ? 'a' : Link;
                return (
                  <Component
                    key={index}
                    href={action.href}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer block"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${action.color} p-3 rounded-lg`}>
                        <Icon style={{ width: "24px", height: "24px", color: "white" }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{action.title}</h3>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </div>
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>

          {/* Recent Admissions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Admissions</h2>
              <span className="text-sm text-gray-500">{admissions.length} total</span>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {admissions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No admission records found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Child Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Parent Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {admissions.slice(0, 5).map((admission) => (
                        <tr key={admission._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <Users style={{ width: "16px", height: "16px", color: "#3B82F6" }} />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {admission.childName || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {admission.parentName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {admission.phone || admission.email || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar style={{ width: "14px", height: "14px" }} />
                              {admission.createdAt 
                                ? new Date(admission.createdAt).toLocaleDateString()
                                : 'N/A'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Recent Teacher Applications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Teacher Applications</h2>
              <span className="text-sm text-gray-500">{teachers.length} total</span>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {teachers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No teacher applications found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {teachers.slice(0, 5).map((teacher) => (
                        <tr key={teacher._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-purple-100 rounded-full p-2 mr-3">
                                <GraduationCap style={{ width: "16px", height: "16px", color: "#9333EA" }} />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {teacher.name || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {teacher.email || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {teacher.phone || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar style={{ width: "14px", height: "14px" }} />
                              {teacher.createdAt 
                                ? new Date(teacher.createdAt).toLocaleDateString()
                                : 'N/A'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
