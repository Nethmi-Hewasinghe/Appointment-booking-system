// src/pages/AdminDashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

// You can tweak these to your real services
const serviceTypes = [
 'Haircut',
  'Hair Colour',
  'Facial',
  'Grooming',
  'Bridal & Event Glam',
  'Hair Treatments',
];

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [currentBooking, setCurrentBooking] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    serviceType: serviceTypes[0],
    status: "pending",
  });

  const { logout } = useAuth();

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const query =
        filter && filter !== "all" ? `?status=${encodeURIComponent(filter)}` : "";
      const { data } = await axios.get(`/bookings${query}`);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    if (!["approved", "cancelled", "pending"].includes(status)) return;

    try {
      await axios.patch(`/bookings/${id}/status`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`/bookings/${id}`);
      toast.success("Booking deleted");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentBooking(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      serviceType: serviceTypes[0],
      status: "pending",
    });
    setModalOpen(true);
  };

  const openEditModal = (booking) => {
    setModalMode("edit");
    setCurrentBooking(booking);
    setForm({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      date: booking.date || "",
      time: booking.time || "",
      serviceType: booking.serviceType || serviceTypes[0],
      status: booking.status || "pending",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBooking(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      serviceType: form.serviceType,
      status: form.status,
    };

    try {
      if (modalMode === "add") {
        const { data } = await axios.post("/bookings", payload);
        toast.success("Booking created");
        setBookings((prev) => [...prev, data]);
      } else if (modalMode === "edit" && currentBooking) {
        const { data } = await axios.put(
          `/bookings/${currentBooking._id}`,
          payload
        );
        toast.success("Booking updated");
        setBookings((prev) =>
          prev.map((b) => (b._id === currentBooking._id ? data : b))
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error saving booking:", error);
      const message = error.response?.data?.message || "Failed to save booking";
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  const formatDateTime = (booking) => {
    if (!booking.date || !booking.time) return "-";
    try {
      const dateObj = new Date(`${booking.date}T${booking.time}`);
      return format(dateObj, "MMM d, yyyy • hh:mm a");
    } catch {
      return `${booking.date} • ${booking.time}`;
    }
  };

  // 🔎 Apply search on existing (filtered-by-status) bookings
  const filteredBookings = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return bookings;

    return bookings.filter((b) => {
      const name = b.name?.toLowerCase() || "";
      const email = b.email?.toLowerCase() || "";
      const phone = b.phone?.toLowerCase() || "";
      const service = b.serviceType?.toLowerCase() || "";
      return (
        name.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        service.includes(term)
      );
    });
  }, [bookings, searchTerm]);

  // Small stats
  const total = bookings.length;
  const approvedCount = bookings.filter((b) => b.status === "approved").length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Admin dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Appointments overview
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Review, approve and manage bookings for Salon Monarch.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, service..."
                className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 pr-8 text-xs text-slate-100 placeholder-slate-500 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                🔍
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                type="button"
                onClick={openAddModal}
                className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-amber-500/30 hover:bg-amber-300"
              >
                + Add appointment
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-100 hover:border-amber-400 hover:text-amber-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Small stats row */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-sm shadow-sm">
            <p className="text-xs text-slate-400">Total bookings</p>
            <p className="mt-1 text-xl font-semibold text-slate-50">{total}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-sm shadow-sm">
            <p className="text-xs text-slate-400">Approved</p>
            <p className="mt-1 text-xl font-semibold text-emerald-300">
              {approvedCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-sm shadow-sm">
            <p className="text-xs text-slate-400">Pending</p>
            <p className="mt-1 text-xl font-semibold text-amber-300">
              {pendingCount}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/40">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-amber-400" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No bookings found for this view.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-950/60">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Date &amp; Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-slate-900/80"
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="font-medium text-slate-50">
                          {booking.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                          {booking.serviceType}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-200">
                        {formatDateTime(booking)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        <div>{booking.email}</div>
                        <div className="text-xs text-slate-500">
                          {booking.phone}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={[
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                            booking.status === "approved"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : booking.status === "cancelled"
                              ? "bg-red-500/15 text-red-300"
                              : "bg-amber-500/15 text-amber-200",
                          ].join(" ")}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          {booking.status !== "approved" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(booking._id, "approved")
                              }
                              className="rounded-full border border-emerald-500/70 px-2.5 py-1 text-[11px] text-emerald-300 hover:bg-emerald-500/10"
                            >
                              Approve
                            </button>
                          )}
                          {booking.status !== "cancelled" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(booking._id, "cancelled")
                              }
                              className="rounded-full border border-red-500/70 px-2.5 py-1 text-[11px] text-red-300 hover:bg-red-500/10"
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status !== "pending" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(booking._id, "pending")
                              }
                              className="rounded-full border border-slate-600 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                            >
                              Mark Pending
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openEditModal(booking)}
                            className="rounded-full border border-slate-600 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(booking._id)}
                            className="rounded-full border border-red-500/70 px-2.5 py-1 text-[11px] text-red-300 hover:bg-red-500/10"
                          >
                            Delete
                          </button>
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

      {/* Add/Edit booking modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-50">
                {modalMode === "add" ? "Add appointment" : "Edit appointment"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Phone *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Service *
                  </label>
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleFormChange}
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  >
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-amber-400 px-5 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-amber-500/30 hover:bg-amber-300"
                >
                  {modalMode === "add" ? "Create" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
