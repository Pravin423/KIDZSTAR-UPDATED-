import ProtectedRoute from "@/components/ProtectedRoute";
import AdminHeader from "@/components/AdminHeader";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [admissions, setAdmissions] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/api/export")
      .then(res => res.json())
      .then(data => {
        setAdmissions(data.admissions);
        setTeachers(data.teachers);
      });
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <div className="p-10">
          <a
            href="/api/export?download=true"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-block"
          >
            Export Excel
          </a>

          <h2 className="mt-6 text-xl font-semibold">Admissions</h2>
          {admissions.map(a => (
            <div key={a._id} className="border p-2 mt-2 bg-white rounded">
              {a.childName} - {a.parentName}
            </div>
          ))}

          <h2 className="mt-6 text-xl font-semibold">Teacher Applications</h2>
          {teachers.map(t => (
            <div key={t._id} className="border p-2 mt-2 bg-white rounded">
              {t.name} - {t.email}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
