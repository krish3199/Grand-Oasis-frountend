"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getHotelById } from "../Redux/Reducers/hotelReducer"
import { toast } from "react-toastify"
import axios from "axios"

// ================= PREMIUM SVG ICONS =================
const Icons = {
  Map: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Star: () => <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Wifi: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>,
  Pool: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12h20M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10M2 12l2-6h16l2 6"/></svg>,
  Spa: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Gym: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.5 6.5h11M6.5 17.5h11M6 20v-2a6 6 0 1 1 12 0v2M6 4v2a6 6 0 1 0-12 0V4"/></svg>,
  Restaurant: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 21h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3v-2a2 2 0 0 0-4 0v2H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11v4"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 13h8"/></svg>,
  Bed: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 4v16"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 8h18a2 2 0 0 1 2 2v10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 17h20"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8v9"/></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>,
  ChevronLeft: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>,
  ChevronRight: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  User: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  Lock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
  Shield: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  Default: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
}

const getIcon = (name) => {
  const lower = name?.toLowerCase() || ""
  if (lower.includes("wifi")) return <Icons.Wifi />
  if (lower.includes("pool")) return <Icons.Pool />
  if (lower.includes("spa") || lower.includes("wellness")) return <Icons.Spa />
  if (lower.includes("gym") || lower.includes("fitness")) return <Icons.Gym />
  if (lower.includes("restaurant") || lower.includes("food")) return <Icons.Restaurant />
  if (lower.includes("bed") || lower.includes("room")) return <Icons.Bed />
  if (lower.includes("parking")) return <Icons.Default />
  return <Icons.Default />
}

const HotelDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { selectedHotel: hotel, loading, error } = useSelector((state) => state.hotel)
  const { user } = useSelector((state) => state.user)

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [showTerms, setShowTerms] = useState(false)
  const [roomImageIndex, setRoomImageIndex] = useState({}) 
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [step, setStep] = useState(1) 

  const today = new Date().toISOString().split('T')[0]
  const minCheckOut = checkIn || today
  
  const nextRoomImage = (roomIndex, totalImages) => {
    setRoomImageIndex({
      ...roomImageIndex,
      [roomIndex]: ((roomImageIndex[roomIndex] || 0) + 1) % totalImages
    })
  }

  const prevRoomImage = (roomIndex, totalImages) => {
    setRoomImageIndex({
      ...roomImageIndex,
      [roomIndex]: ((roomImageIndex[roomIndex] || 0) - 1 + totalImages) % totalImages
    })
  }

  useEffect(() => {
    if (id) dispatch(getHotelById(id))
  }, [dispatch, id])

  const days =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0

  const pricePerDay = selectedRoom ? selectedRoom.price : 0
  const totalPrice = pricePerDay * days

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve(true)
      }
      const script = document.createElement("script")
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const proceedToPaymentStep = () => {
    if (!user) {
      toast.info("Please login to book hotel")
      navigate("/login")
      return
    }
    if (!selectedRoom) {
      toast.error("Please select a room")
      return
    }
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in & check-out dates")
      return
    }
    if (days <= 0) {
      toast.error("Invalid booking dates")
      return
    }
    
    const todayObj = new Date()
    todayObj.setHours(0, 0, 0, 0)
    const checkInDate = new Date(checkIn)
    checkInDate.setHours(0, 0, 0, 0)

    if (checkInDate < todayObj) {
      toast.error("Check-in date cannot be in the past")
      return
    }
    const checkOutDate = new Date(checkOut)
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date")
      return
    }
    
    setStep(2)
  }

  const bookingHandler = async () => {
    try {
      setPaymentLoading(true)

      const razorpayLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!razorpayLoaded) {
        toast.error("Unable to load Razorpay. Please check your internet connection.")
        return
      }

      const { data } = await axios.post(
        "https://grand-oasis-backend.onrender.com/api/payment/order",
        { amount: totalPrice },
        { withCredentials: true }
      )

      if (!data?.success) {
        toast.error(data?.message || "Unable to initiate payment")
        return
      }

      const options = {
        key: data.keyId,
        amount: data.amount.toString(),
        currency: data.currency,
        name: hotel.name,
        description: `Booking for ${hotel.name}`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            await axios.post(
              "https://grand-oasis-backend.onrender.com/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  hotelId: hotel._id,
                  roomType: selectedRoom.type,
                  checkIn,
                  checkOut,
                },
              },
              { withCredentials: true }
            )

            toast.success("🎉 Payment successful! Booking confirmed. Check your email.")
            setTimeout(() => {
              navigate("/my-bookings")
            }, 1500)
          } catch (err) {
            console.error("PAYMENT VERIFY ERROR", err)
            toast.error(
              err?.response?.data?.message || "Payment verified but booking failed. Please contact support."
            )
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#D4AF37",
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.on("payment.failed", function () {
        toast.error("Payment failed. Please try again.")
      })

      rzp.open()
    } catch (error) {
      console.error("PAYMENT INIT ERROR", error)
      toast.error(error?.response?.data?.message || "Payment failed. Please try again.")
    } finally {
      setPaymentLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#D4AF37] mt-6 tracking-[0.2em] text-xs uppercase animate-pulse">Loading Experience</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-400 font-serif">
        {error}
      </div>
    )
  }

  if (!hotel && !loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">
        No hotel data available
      </div>
    )
  }

  const rawGalleryImages = hotel.images && hotel.images.length > 0 ? hotel.images : [hotel.image]
  const galleryImages = (rawGalleryImages || []).filter(Boolean)

  if (galleryImages.length === 0 && hotel.image) {
    galleryImages.push(hotel.image)
  }

  return (
    <section className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-10 border-b border-white/5 pb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 border border-[#D4AF37]/20 rounded-full">
                  <Icons.Map />
                  {hotel.city}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Icons.Star /> <span className="text-white font-medium">{hotel.rating?.toFixed(1)}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                {hotel.name}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 font-light">
               <span className="flex items-center gap-2"><Icons.Calendar /> Check Availability</span>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px] mb-16 animate-fade-in-up">
          <div className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden rounded-sm group">
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          {[0, 1, 2, 3].map((idx) => {
            const imgIndex = (idx + 1) % galleryImages.length; 
            const imgSrc = galleryImages[imgIndex];
            
            return (
             <div key={idx} className="relative overflow-hidden rounded-sm group">
                <img src={imgSrc} alt={`View ${idx}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Description */}
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                About The Property
              </h2>
              <p className="text-gray-400 leading-7 font-light text-lg">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities && hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300 text-sm group cursor-default">
                    <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                      {getIcon(amenity)}
                    </span>
                    <span className="group-hover:text-white transition-colors">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROOMS LIST */}
            <div>
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                Select Your Room
              </h2>
              
              <div className="space-y-8">
                {hotel.rooms.map((room, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedRoom(room)}
                    className={`
                      relative bg-[#0a0a0a] rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer
                      ${selectedRoom?.type === room.type 
                        ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] z-10' 
                        : 'border-white/5 hover:border-[#D4AF37]/30'
                      }
                    `}
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif text-white mb-2">{room.type}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                           <span className="flex items-center gap-1.5"><Icons.User /> Max Guests: 2</span>
                           <span className="flex items-center gap-1.5"><Icons.Bed /> Bedding: King</span>
                           <span>{room.availableRooms} Rooms Left</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          Experience pure luxury in our {room.type} featuring premium amenities, stunning views, and dedicated concierge service.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {room.facilities && room.facilities.slice(0, 4).map((f, idx) => (
                            <span key={idx} className="text-xs text-gray-300 flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                              <span className="text-[10px]"><Icons.Check /></span> {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:text-right">
                        <div className="text-3xl font-serif text-[#D4AF37] mb-1">
                          ₹{room.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Per Night</div>
                        <div className={`inline-block px-6 py-2 text-sm font-medium tracking-wide transition-colors rounded-full border
                          ${selectedRoom?.type === room.type 
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                            : 'bg-transparent text-white border-white/20 hover:border-[#D4AF37]'
                          }
                        `}>
                          {selectedRoom?.type === room.type ? 'Selected' : 'Select Room'}
                        </div>
                      </div>
                    </div>

                    {room.images && room.images.length > 0 && (
                      <div className="relative h-[450px] w-full bg-black">
                        <img
                          src={room.images[roomImageIndex[i] || 0]}
                          alt="Room view"
                          className="w-full h-full object-cover opacity-90"
                        />
                        {room.images.length > 1 && (
                           <>
                            <button
                              onClick={(e) => { e.stopPropagation(); prevRoomImage(i, room.images.length) }}
                              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-[#D4AF37] hover:text-black text-white backdrop-blur-md transition-all duration-300 rounded-full"
                            >
                              <Icons.ChevronLeft />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); nextRoomImage(i, room.images.length) }}
                              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-[#D4AF37] hover:text-black text-white backdrop-blur-md transition-all duration-300 rounded-full"
                            >
                              <Icons.ChevronRight />
                            </button>
                          </>
                        )}
                        {room.images.length > 1 && (
                          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4">
                            {room.images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={(e) => { e.stopPropagation(); setRoomImageIndex({...roomImageIndex, [i]: imgIdx}) }}
                                className={`w-16 h-10 overflow-hidden border-2 transition-all rounded-sm
                                  ${(roomImageIndex[i] || 0) === imgIdx ? 'border-[#D4AF37] opacity-100' : 'border-white/20 opacity-50 hover:opacity-100'}
                                `}
                              >
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (Sticky Booking Card - ENHANCED UI) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#0f0f0f] border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-sm">
              
              {/* Gold decorative top line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f]"></div>

              {/* ================= STEP 1: CONFIRM DETAILS (IMPROVED UI) ================= */}
              {step === 1 && (
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-2xl font-serif text-white tracking-wide">Confirm Stay</h3>
                      <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] mt-1">Reservation Details</p>
                    </div>
                    <div className="p-2 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                      <Icons.Shield />
                    </div>
                  </div>

                  {/* Selected Room Card (More Visual) */}
                  {selectedRoom ? (
                    <div className="relative bg-gradient-to-br from-[#D4AF37]/5 to-transparent border-l-2 border-[#D4AF37] p-5 rounded-r-sm mb-8 group hover:bg-[#D4AF37]/10 transition-colors">
                      {/* Decorative background circle */}
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-400 uppercase tracking-widest">Your Selection</span>
                          <span className="text-[10px] text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded uppercase">Selected</span>
                        </div>
                        <h4 className="text-xl font-serif text-white mb-1">{selectedRoom.type}</h4>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-[10px] text-gray-500 flex items-center gap-1"><Icons.Bed/> King Bed</span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-1"><Icons.User/> 2 Guests</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8 p-6 border border-dashed border-white/10 rounded-sm text-center bg-[#050505]">
                      <p className="text-sm text-gray-500">Please select a room from the list to proceed.</p>
                    </div>
                  )}

                  {/* Date Inputs Section */}
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Check-In</label>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Check-Out</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors pointer-events-none">
                          <Icons.Calendar />
                        </div>
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={(e) => {
                            setCheckIn(e.target.value)
                            if (checkOut && e.target.value >= checkOut) setCheckOut("")
                          }}
                          className="w-full bg-[#050505] border border-white/10 text-white py-3 pl-10 pr-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all rounded-sm placeholder-gray-600"
                        />
                      </div>
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors pointer-events-none">
                          <Icons.Calendar />
                        </div>
                        <input
                          type="date"
                          value={checkOut}
                          min={minCheckOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 text-white py-3 pl-10 pr-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all rounded-sm placeholder-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown (Premium Receipt Style) */}
                  {selectedRoom && days > 0 && (
                    <div className="bg-[#050505] border border-white/5 p-6 rounded-sm mb-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-sm"></div>
                      
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-400">Rate</span>
                        <span className="text-white font-medium">₹{pricePerDay.toLocaleString()} <span className="text-[10px] text-gray-500 font-normal">/ night</span></span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white font-medium">{days} {days > 1 ? 'Nights' : 'Night'}</span>
                      </div>
                      
                      <div className="border-t border-dashed border-white/10 my-4"></div>
                      
                      <div className="flex justify-between items-end">
                        <span className="text-gray-200 text-sm font-medium uppercase tracking-wide">Total</span>
                        <div className="text-right">
                           <span className="text-3xl font-serif text-[#D4AF37] leading-none">₹{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms (Collapsible) */}
                  <div className="mb-6">
                    <button 
                      onClick={() => setShowTerms(!showTerms)}
                      className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
                    >
                      <span className={`transition-transform duration-300 ${showTerms ? 'rotate-90' : ''}`}><Icons.ChevronRight className="w-3 h-3"/></span>
                      Cancellation Policy
                    </button>
                    
                    {showTerms && (
                      <div className="mt-3 pl-5 text-[10px] text-gray-500 space-y-2 leading-relaxed border-l border-white/5">
                        <p>Free cancellation before 48 hours of check-in.</p>
                        <p>No-shows will be charged 100% of the booking amount.</p>
                        <p>Taxes are included in the displayed price.</p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={proceedToPaymentStep}
                    disabled={!selectedRoom || !checkIn || !checkOut || days <= 0}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] text-black font-bold tracking-[0.15em] uppercase py-4 rounded-sm shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Confirm Booking
                      <Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Button Hover Overlay */}
                    <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>
              )}

              {/* ================= STEP 2: PAYMENT OPTION (Kept similar but polished) ================= */}
              {step === 2 && (
                <div className="animate-fade-in-up bg-[#050505]">
                   <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                   
                   <div className="p-8">
                      <div className="flex items-center gap-3 mb-6 text-[#D4AF37]">
                         <span className="animate-pulse"><Icons.Lock /></span>
                         <span className="font-bold tracking-widest uppercase text-xs">Secure Payment</span>
                      </div>

                      <h3 className="text-xl font-serif text-white mb-6">Complete Payment</h3>

                      {/* Final Review Summary */}
                      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-sm mb-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Room</span>
                            <span className="text-white font-medium">{selectedRoom?.type}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Nights</span>
                            <span className="text-white">{days}</span>
                          </div>
                           <div className="border-t border-[#D4AF37]/20 pt-3 mt-2 flex justify-between items-center">
                            <span className="text-white font-bold text-lg">Total</span>
                            <span className="text-2xl font-serif text-[#D4AF37]">₹{totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-500 text-center mb-6">
                        You will be redirected to the payment gateway. Please do not close the window.
                      </div>

                      <button
                        onClick={bookingHandler}
                        disabled={paymentLoading}
                        className="w-full bg-[#D4AF37] text-black font-bold tracking-widest uppercase py-4 rounded-sm hover:bg-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      >
                        {paymentLoading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                      </button>
                      
                      <button 
                         onClick={() => setStep(1)}
                         className="w-full mt-4 text-[11px] text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 transition-colors"
                      >
                         &larr; Edit Booking Details
                      </button>
                   </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default HotelDetails