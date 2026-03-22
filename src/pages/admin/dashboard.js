import ProtectedRoute from "@/components/ProtectedRoute";
import AdminHeader from "@/components/AdminHeader";
import { useEffect, useState, useMemo } from "react";
import {
  Users, GraduationCap, Download, Images,
  Calendar, TrendingUp, CheckCircle2, Clock,
  Search, Filter, ChevronLeft, ChevronRight,
  CheckCheck, Hourglass,
} from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 10;

// ── Confirmation Modal ───────────────────────────────────────────────────
function ConfirmModal({ open, record, newStatus, onConfirm, onCancel }) {
  if (!open || !record) return null;
  const toDone = newStatus === "done";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-[fadeIn_0.15s_ease]">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4
          ${toDone ? "bg-green-100" : "bg-amber-100"}`}>
          {toDone
            ? <CheckCircle2 size={28} className="text-green-600" />
            : <Clock size={28} className="text-amber-600" />}
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
          {toDone ? "Mark as Enquired Done?" : "Mark as Pending?"}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-1">
          {toDone
            ? "This will mark the enquiry as completed."
            : "This will move the enquiry back to pending."}
        </p>
        {/* Name chip */}
        <p className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {record.childName || record.parentName || "This record"}
          </span>
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all
              ${toDone
                ? "bg-green-600 hover:bg-green-700"
                : "bg-amber-500 hover:bg-amber-600"}`}
          >
            {toDone ? "Yes, mark Done" : "Yes, mark Pending"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        <CheckCircle2 size={12} /> Enquired Done
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
      <Clock size={12} /> Pending
    </span>
  );
}

// ── Toggle Button ─────────────────────────────────────────────────────────
function ToggleStatus({ record, onRequestToggle, loading }) {
  const isDone = record.status === "done";
  return (
    <button
      onClick={() => onRequestToggle(record, isDone ? "pending" : "done")}
      disabled={loading}
      title={isDone ? "Mark as Pending" : "Mark as Done"}
      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
        ${isDone
          ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
          : "bg-white border-gray-300 text-gray-300 hover:border-green-400 hover:text-green-400"
        } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <CheckCheck size={16} />
    </button>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, color, lightColor, textColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${lightColor} p-4 rounded-xl`}>
          <Icon size={28} className={textColor} />
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [admissions, setAdmissions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  // Confirmation modal state
  const [confirm, setConfirm] = useState({ open: false, record: null, newStatus: null });

  // Filters
  const [admissionFilter, setAdmissionFilter] = useState("all"); // all | pending | done
  const [admissionSearch, setAdmissionSearch] = useState("");
  const [admissionPage, setAdmissionPage] = useState(1);

  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherPage, setTeacherPage] = useState(1);

  // ── Fetch ───────────────────────────────────────────────────────────────
  const fetchData = () => {
    fetch("/api/export")
      .then((r) => r.json())
      .then((data) => {
        setAdmissions(data.admissions || []);
        setTeachers(data.teachers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Request toggle (opens modal) ─────────────────────────────────────────
  const requestToggle = (record, newStatus) => {
    setConfirm({ open: true, record, newStatus });
  };

  // ── Confirm toggle (user said yes) ───────────────────────────────────────
  const handleToggle = async () => {
    const { record, newStatus } = confirm;
    setConfirm({ open: false, record: null, newStatus: null });
    setTogglingId(record._id);
    try {
      const res = await fetch("/api/admission-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: record._id, status: newStatus }),
      });
      if (res.ok) {
        setAdmissions((prev) =>
          prev.map((a) => (a._id === record._id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (_) {}
    setTogglingId(null);
  };

  const cancelToggle = () => setConfirm({ open: false, record: null, newStatus: null });

  // ── Filtered + searched admissions ───────────────────────────────────────
  const filteredAdmissions = useMemo(() => {
    let list = [...admissions];
    if (admissionFilter !== "all") list = list.filter((a) => (a.status || "pending") === admissionFilter);
    if (admissionSearch.trim()) {
      const q = admissionSearch.toLowerCase();
      list = list.filter(
        (a) =>
          (a.childName || "").toLowerCase().includes(q) ||
          (a.parentName || "").toLowerCase().includes(q) ||
          (a.phone || "").includes(q) ||
          (a.email || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [admissions, admissionFilter, admissionSearch]);

  // Reset to page 1 when filter/search changes
  useEffect(() => { setAdmissionPage(1); }, [admissionFilter, admissionSearch]);

  const filteredTeachers = useMemo(() => {
    if (!teacherSearch.trim()) return teachers;
    const q = teacherSearch.toLowerCase();
    return teachers.filter(
      (t) =>
        (t.name || "").toLowerCase().includes(q) ||
        (t.email || "").toLowerCase().includes(q) ||
        (t.phone || "").includes(q)
    );
  }, [teachers, teacherSearch]);

  useEffect(() => { setTeacherPage(1); }, [teacherSearch]);

  // ── Stats ────────────────────────────────────────────────────────────────
  const pendingCount = admissions.filter((a) => (a.status || "pending") === "pending").length;
  const doneCount = admissions.filter((a) => a.status === "done").length;

  const stats = [
    { title: "Total Admissions", value: admissions.length, icon: Users, color: "bg-blue-500", lightColor: "bg-blue-50", textColor: "text-blue-600" },
    { title: "Pending Enquiries", value: pendingCount, icon: Hourglass, color: "bg-amber-500", lightColor: "bg-amber-50", textColor: "text-amber-600" },
    { title: "Enquiries Done", value: doneCount, icon: CheckCircle2, color: "bg-green-500", lightColor: "bg-green-50", textColor: "text-green-600" },
    { title: "Teacher Applications", value: teachers.length, icon: GraduationCap, color: "bg-purple-500", lightColor: "bg-purple-50", textColor: "text-purple-600" },
  ];

  // ── Pagination helper ─────────────────────────────────────────────────────
  const paginate = (list, page) => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = (list) => Math.max(1, Math.ceil(list.length / PAGE_SIZE));

  const Pagination = ({ list, page, setPage, color = "blue" }) => {
    if (list.length <= PAGE_SIZE) return null;
    const total = totalPages(list);
    return (
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <span className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{(page - 1) * PAGE_SIZE + 1}</span>–<span className="font-semibold text-gray-700">{Math.min(page * PAGE_SIZE, list.length)}</span> of <span className="font-semibold text-gray-700">{list.length}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all
                ${n === page
                  ? color === "blue" ? "bg-blue-600 text-white shadow-sm" : "bg-purple-600 text-white shadow-sm"
                  : "border border-gray-200 text-gray-500 hover:bg-white"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Loading dashboard…</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      {/* Confirmation Modal — renders on top of everything */}
      <ConfirmModal
        open={confirm.open}
        record={confirm.record}
        newStatus={confirm.newStatus}
        onConfirm={handleToggle}
        onCancel={cancelToggle}
      />

      <div className="min-h-screen bg-gray-50/80">
        <AdminHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage all admissions and applications</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/api/export?download=true"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all shadow-sm hover:shadow"
              >
                <Download size={16} /> Export Excel
              </a>
              <Link
                href="/admin/gallery"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow"
              >
                <Images size={16} /> Gallery
              </Link>
            </div>
          </div>

          {/* ── Stats ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* ── All Admissions ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">All Admissions</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{admissions.length} total enquiries</p>
                </div>

                {/* Controls row */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search name, phone…"
                      value={admissionSearch}
                      onChange={(e) => setAdmissionSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-gray-50 w-48 transition-all"
                    />
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                    {[
                      { key: "all", label: "All", count: admissions.length },
                      { key: "pending", label: "Pending", count: pendingCount },
                      { key: "done", label: "Done", count: doneCount },
                    ].map(({ key, label, count }) => (
                      <button
                        key={key}
                        onClick={() => setAdmissionFilter(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                          ${admissionFilter === key
                            ? key === "done"
                              ? "bg-white text-green-700 shadow-sm"
                              : key === "pending"
                                ? "bg-white text-amber-700 shadow-sm"
                                : "bg-white text-blue-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        {label}
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold
                          ${admissionFilter === key ? "bg-gray-100" : "bg-gray-200"}`}>
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            {filteredAdmissions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Filter size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No records found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filter or search</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Child Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Done</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginate(filteredAdmissions, admissionPage).map((admission, idx) => {
                        const isDone = admission.status === "done";
                        return (
                          <tr
                            key={admission._id}
                            className={`transition-colors ${isDone ? "bg-green-50/40" : "hover:bg-gray-50/70"}`}
                          >
                            <td className="px-4 py-3.5 text-xs text-gray-400 font-medium">
                              {(admissionPage - 1) * PAGE_SIZE + idx + 1}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                                  ${isDone ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                                  {(admission.childName || "?").charAt(0).toUpperCase()}
                                </div>
                                <span className={`text-sm font-semibold ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>
                                  {admission.childName || "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-sm text-gray-600">{admission.parentName || "N/A"}</td>
                            <td className="px-4 py-3.5 text-sm text-gray-600 font-medium">{admission.phone || "N/A"}</td>
                            <td className="px-4 py-3.5 text-sm text-gray-500">{admission.email || "—"}</td>
                            <td className="px-4 py-3.5 text-sm text-gray-500 max-w-[200px]">
                              {admission.message ? (
                                <span
                                  title={admission.message}
                                  className="block truncate cursor-help"
                                >
                                  {admission.message}
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar size={13} className="text-gray-400" />
                                {admission.createdAt
                                  ? new Date(admission.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                  : "N/A"}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={admission.status || "pending"} />
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              <ToggleStatus
                                record={admission}
                                onRequestToggle={requestToggle}
                                loading={togglingId === admission._id}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  list={filteredAdmissions}
                  page={admissionPage}
                  setPage={setAdmissionPage}
                  color="blue"
                />
              </>
            )}
          </div>

          {/* ── Teacher Applications ───────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Teacher Applications</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{teachers.length} total applications</p>
                </div>
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search name, email…"
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 bg-gray-50 w-48 transition-all"
                  />
                </div>
              </div>
            </div>

            {filteredTeachers.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-medium">No teacher applications found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginate(filteredTeachers, teacherPage).map((teacher, idx) => (
                        <tr key={teacher._id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-4 py-3.5 text-xs text-gray-400 font-medium">
                            {(teacherPage - 1) * PAGE_SIZE + idx + 1}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {(teacher.name || "?").charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm font-semibold text-gray-800">{teacher.name || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-sm text-gray-600">{teacher.email || "N/A"}</td>
                          <td className="px-4 py-3.5 text-sm text-gray-600 font-medium">{teacher.phone || "N/A"}</td>
                          <td className="px-4 py-3.5 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={13} className="text-gray-400" />
                              {teacher.createdAt
                                ? new Date(teacher.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                : "N/A"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  list={filteredTeachers}
                  page={teacherPage}
                  setPage={setTeacherPage}
                  color="purple"
                />
              </>
            )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
