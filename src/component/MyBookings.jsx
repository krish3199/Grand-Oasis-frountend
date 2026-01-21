"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMyBookings, cancelBooking } from "../Redux/Reducers/bookingReducer"
import { toast } from "react-toastify"

// ================= PREMIUM SVG ICONS =================
const Icons = {
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  MapPin: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Star: () => <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Wifi: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>,
  Swimming: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M2 12h20M2 16c0 5 4 6 9 6s9-1 9-6"/></svg>,
  Spa: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a6 6 0 00-9 9 9 9 0 0018 0 9 9 0 00-6 9 9 9 0 00-9-9z"/></svg>,
  Food: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm16 16H5V5h14v14z"/></svg>,
  Bed: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4v16h20V4H2zm2 2h16v12H4V6zm2 2h2v2H6V8zm0 4h2v2H6v-2z"/></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  XCircle: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Clock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  Building: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
}

// Helper to map facility string to SVG
const getFacilityIcon = (name) => {
  const lower = name?.toLowerCase() || ""
  if (lower.includes("wifi")) return <Icons.Wifi />
  if (lower.includes("pool") || lower.includes("swim")) return <Icons.Swimming />
  if (lower.includes("spa") || lower.includes("wellness")) return <Icons.Spa />
  if (lower.includes("gym") || lower.includes("fitness")) return <Icons.Bed /> 
  if (lower.includes("restaurant") || lower.includes("food")) return <Icons.Food />
  return <Icons.Bed /> // Default fallback
}

const MyBookings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookings, loading, error } = useSelector((state) => state.booking)
  const { user } = useSelector((state) => state.user)
  const [cancellingId, setCancellingId] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch(getMyBookings())
    } else {
      navigate("/login")
    }
  }, [dispatch, user, navigate])

  // ✅ LOGIC PRESERVED: Check if booking can be cancelled (within 24 hours)
  const canCancelBooking = (booking) => {
    if (booking.status === "Cancelled") return false
    
    const bookingTime = new Date(booking.createdAt || booking.updatedAt)
    const now = new Date()
    const hoursDiff = (now - bookingTime) / (1000 * 60 * 60)
    
    return hoursDiff <= 24
  }

  // ✅ LOGIC PRESERVED: Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  // ✅ LOGIC PRESERVED: Handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      return
    }

    setCancellingId(bookingId)
    try {
      await dispatch(cancelBooking(bookingId)).unwrap()
      toast.success("Booking cancelled successfully")
      dispatch(getMyBookings()) // Refresh bookings
    } catch (error) {
      toast.error(error || "Failed to cancel booking")
    } finally {
      setCancellingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#D4AF37] mt-6 tracking-[0.2em] text-xs uppercase animate-pulse">Loading Itineraries</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20">
        <div className="text-center max-w-md p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
          <Icons.XCircle />
          <p className="text-red-400 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">My Reservations</h1>
          <p className="text-gray-400 font-light">Manage your upcoming stays and travel history.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-32 bg-[#0a0a0a] border border-white/5 rounded-sm">
            <div className="w-20 h-20 border border-white/10 rounded-full mx-auto flex items-center justify-center mb-6">
               <Icons.Building />
            </div>
            <h2 className="text-2xl text-white font-serif mb-3">No Reservations Found</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your journey begins here. Explore our exclusive collection of properties.</p>
            <button
              onClick={() => navigate("/hotels")}
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors duration-300 border-b border-[#D4AF37]/50 pb-1"
            >
              Explore Hotels <Icons.ArrowRight />
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking, index) => {
              const canCancel = canCancelBooking(booking)
              const hoursRemaining = booking.createdAt 
                ? Math.max(0, Math.floor(24 - (new Date() - new Date(booking.createdAt)) / (1000 * 60 * 60)))
                : 0

              return (
                <div
                  key={booking._id}
                  className="bg-[#0f0f0f] border border-white/5 rounded-sm overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500 animate-fade-in-up flex flex-col lg:flex-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Left: Image */}
                  <div className="lg:w-1/4 relative group">
                    {booking.hotelId?.image ? (
                      <img
                        src={booking.hotelId.image}
                        alt={booking.hotelId.name}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-64 lg:h-full bg-[#050505] flex items-center justify-center">
                        <Icons.Building />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border
                        ${booking.status === "Booked" 
                          ? "bg-green-500/20 text-green-400 border-green-500/40" 
                          : "bg-red-500/20 text-red-400 border-red-500/40"}
                      `}>
                        {booking.status === "Booked" ? <Icons.CheckCircle /> : <Icons.XCircle />}
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="lg:w-2/4 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
                        <Icons.MapPin /> {booking.hotelId?.city || "Unknown Location"}
                      </div>
                      <h2 className="text-2xl font-serif text-white mb-4 leading-tight">
                        {booking.hotelId?.name || "Hotel Name"}
                      </h2>
                      
                      {/* Date Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Icons.Calendar /> Check In
                          </p>
                          <p className="text-white font-medium">{formatDate(booking.checkIn)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Icons.Calendar /> Check Out
                          </p>
                          <p className="text-white font-medium">{formatDate(booking.checkOut)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities Mini */}
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Room Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.hotelId?.amenities && booking.hotelId.amenities.slice(0, 4).map((amenity, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 px-2 py-1 rounded-sm">
                            {getFacilityIcon(amenity)}
                            {amenity}
                          </span>
                        ))}
                        {booking.hotelId?.amenities && booking.hotelId.amenities.length > 4 && (
                          <span className="text-xs text-gray-600 px-2">+{booking.hotelId.amenities.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="lg:w-1/4 bg-[#0a0a0a] border-l border-white/5 p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Total Price</p>
                      <p className="text-3xl font-serif text-[#D4AF37] mb-1">
                        ₹{booking.totalPrice?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mb-6">
                        {booking.days} {booking.days > 1 ? 'Nights' : 'Night'} @ Room: {booking.roomType}
                      </p>

                      {/* Cancellation Warning */}
                      {booking.status === "Booked" && (
                         <div className={`p-3 rounded-sm border text-xs mb-6 flex items-start gap-2 ${
                            canCancel ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                         }`}>
                            <Icons.Clock />
                            <div>
                              <span className="block font-semibold">{canCancel ? `${hoursRemaining} hrs left` : "Expired"}</span>
                              <span className="block opacity-70">Free cancellation window</span>
                            </div>
                         </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Cancel Button */}
                      {canCancel && booking.status === "Booked" ? (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="w-full bg-white/5 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/30 hover:border-red-500 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === booking._id ? "Cancelling..." : "Cancel Reservation"}
                        </button>
                      ) : (
                        <button 
                          disabled 
                          className="w-full bg-white/5 text-gray-600 border border-white/5 py-3 rounded-sm text-xs font-bold uppercase tracking-widest cursor-not-allowed"
                        >
                          Non-Cancellable
                        </button>
                      )}

                      {/* View Details */}
                      <button
                        onClick={() => navigate(`/hotels/${booking.hotelId?._id}`)}
                        className="w-full bg-transparent hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#D4AF37] py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        View Hotel <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default MyBookings