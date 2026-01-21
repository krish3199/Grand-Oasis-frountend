"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBookings, cancelBookingAdmin } from "../Redux/Reducers/adminReducer"
import { toast } from "react-toastify"

const AdminBookingManagement = () => {
  const dispatch = useDispatch()
  const { bookings, loading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAllBookings())
  }, [dispatch])

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return

    try {
      await dispatch(cancelBookingAdmin(bookingId)).unwrap()
      toast.success("Booking cancelled successfully!")
      dispatch(getAllBookings())
    } catch (error) {
      toast.error(error || "Cancel failed")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Booking Management</h1>
        <div className="text-gray-400">
          Total Bookings: <span className="text-amber-400 font-bold">{bookings?.length || 0}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-amber-400/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Hotel</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Check-In</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Check-Out</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-400/10">
                {bookings && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{booking.hotelId?.name || "N/A"}</div>
                        <div className="text-gray-400 text-xs">{booking.hotelId?.city || ""}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{booking.userId?.name || "N/A"}</div>
                        <div className="text-gray-400 text-xs">{booking.userId?.email || ""}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{booking.roomType}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{formatDate(booking.checkIn)}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{formatDate(booking.checkOut)}</td>
                      <td className="px-6 py-4 text-amber-400 font-semibold">
                        ₹{booking.totalPrice?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Booked"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "Booked" && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all font-semibold text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBookingManagement


