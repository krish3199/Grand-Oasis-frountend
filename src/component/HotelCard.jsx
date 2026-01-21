"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

// --- Premium SVG Icons (Replacing Emojis for Realism) ---
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
const ArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ LOGIC PRESERVED: Auth state
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  const viewDetailsHandler = () => {
    navigate(`/hotels/${hotel._id}`);
  };

  const bookNowHandler = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!isAuthenticated) {
      toast.info("Please login or register to book hotel");
      navigate("/login");
    } else {
      navigate(`/hotels/${hotel._id}`);
    }
  };

  // ✅ LOGIC PRESERVED: Fallback & Price
  const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop";
  const displayImage = imageError || !hotel.image ? fallbackImage : hotel.image;

  const startingPrice = hotel.rooms && hotel.rooms.length > 0 
    ? Math.min(...hotel.rooms.map(room => room.price))
    : null;

  return (
    <div 
      onClick={viewDetailsHandler}
      className="group relative bg-[#0a0a0a] rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/10 border border-white/5 hover:border-[#D4AF37]/30 cursor-pointer flex flex-col h-full"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-72 w-full overflow-hidden">
        {/* Image with Slow Zoom Animation */}
        <img
          src={displayImage}
          alt={hotel.name}
          onError={() => setImageError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Skeleton Loading / Placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse z-0"></div>
        )}

        {/* Premium Gradient Overlay (Bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Floating Rating Badge - Glassmorphism */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#D4AF37]/20 px-3 py-1.5 rounded-full group-hover:border-[#D4AF37]/50 transition-colors duration-300">
            <StarIcon />
            <span className="text-white font-medium text-xs tracking-wide">{hotel.rating?.toFixed(1) || "4.5"}</span>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative p-6 flex flex-col flex-grow bg-[#0a0a0a]">
        {/* Top Section: Location & Amenities */}
        <div className="mb-auto">
          <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium tracking-wider uppercase mb-3">
            <MapPinIcon />
            <span>{hotel.city}</span>
          </div>

          {/* Hotel Name */}
          <h3 className="text-2xl font-serif text-white font-medium mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
            {hotel.name}
          </h3>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-2">
            {hotel.amenities && hotel.amenities.length > 0 && hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-[10px] uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-1 rounded hover:border-[#D4AF37]/40 hover:text-[#D4AF37]/80 transition-all duration-300"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Bottom Section: Price & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Price Info */}
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[#D4AF37] font-serif text-2xl">
                {startingPrice ? `₹${startingPrice}` : "Call"}
              </span>
              {startingPrice && <span className="text-gray-600 text-sm">/ night</span>}
            </div>
          </div>

          {/* Button Group */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                viewDetailsHandler();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              title="View Details"
            >
              <EyeIcon />
              <span className="hidden sm:inline">View</span>
            </button>

            <button
              onClick={bookNowHandler}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black font-bold text-sm rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Book Now
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Shine Effect (Premium Hover Polish) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none z-30"></div>
    </div>
  )
}

export default HotelCard