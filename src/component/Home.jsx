"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllHotels } from "../Redux/Reducers/hotelReducer"
import Hero from "./Hero"
import HotelsList from "./HotelsList"

// Reusable SVG Icons for Premium Look
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
const SpaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0-9 9 9 9 0 1 1 18 0 9 9 0 0 0-9-9Z"/></svg>
const ConciergeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>

const Home = () => {
  const dispatch = useDispatch()
  const { hotels, loading, error } = useSelector((state) => state.hotel)

  const [search, setSearch] = useState("")
  const [rating, setRating] = useState("")
  const [city, setCity] = useState("")
  const [visibleCount, setVisibleCount] = useState(12) // Fixed to 12 hotels only

  useEffect(() => {
    dispatch(getAllHotels())
  }, [dispatch])

  // Get unique cities for filter
  const uniqueCities = [...new Set(hotels.map(hotel => hotel.city))].sort()

  const filteredHotels = hotels.filter((hotel) => {
    const matchSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) || 
      hotel.city.toLowerCase().includes(search.toLowerCase())

    const matchRating = rating ? hotel.rating >= Number(rating) : true
    const matchCity = city ? hotel.city === city : true

    return matchSearch && matchRating && matchCity
  })

  const visibleHotels = filteredHotels.slice(0, visibleCount)

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ================= SEARCH SECTION - PREMIUM UPGRADE ================= */}
      <section 
        id="search"
        className="relative z-20 py-32 px-4 md:px-6 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop')" // Luxury Hotel Background
        }}
      >
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-[#050505]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">Curate Your Experience</h2>
            <p className="text-gray-400 tracking-[0.2em] text-xs md:text-sm uppercase">
              Search through our exclusive collection
            </p>
          </div>

          {/* Main Search Bar Container */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-sm p-1 md:p-2 hover:border-[#D4AF37]/40 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* SEARCH INPUT (Large & Bold) */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <input
                  type="text"
                  placeholder="Destination, Hotel Name or Location"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setVisibleCount(12)
                  }}
                  className="relative w-full h-20 px-8 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none font-light tracking-wide text-lg"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37] p-2 bg-[#D4AF37]/10 rounded-full">
                  <SearchIcon />
                </div>
              </div>

              {/* CITY FILTER */}
              <div className="relative group hover:bg-white/5 transition-colors">
                <div className="relative w-full h-20 px-8 flex flex-col justify-center cursor-pointer">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">City</span>
                  <span className={city ? "text-white text-lg" : "text-gray-400 text-lg"}>
                    {city || "Select City"}
                  </span>
                </div>
                {/* Hidden Select Input */}
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value)
                    setVisibleCount(12)
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
                {/* Decorative Icon */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                   <MapPinIcon className="text-gray-500" />
                </div>
              </div>

              {/* RATING FILTER */}
              <div className="relative group hover:bg-white/5 transition-colors">
                <div className="relative w-full h-20 px-8 flex flex-col justify-center cursor-pointer">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Rating</span>
                  <span className={rating ? "text-white text-lg" : "text-gray-400 text-lg"}>
                    {rating ? `${rating}+ Stars` : "Any Rating"}
                  </span>
                </div>
                {/* Hidden Select Input */}
                <select
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value)
                    setVisibleCount(12)
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
                {/* Decorative Icon */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                   <StarIcon className="text-gray-500" />
                </div>
              </div>

            </div>
          </div>
          
          {/* Results Counter - Stylish Pill */}
          {!loading && (
            <div className="mt-8 flex justify-center animate-fade-in">
               <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold border border-[#D4AF37]/30 px-8 py-3 bg-[#D4AF37]/10 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  {filteredHotels.length} Properties Available
               </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= HOTELS SECTION - PREMIUM BG ================= */}
      <section 
        id="hotels"
        className="relative bg-[#050505] min-h-screen px-4 md:px-6 pb-24 pt-8"
      >
        {/* NEW: Background Mesh Gradient for Premium Feel */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" 
             style={{ background: "radial-gradient(circle at 50% 50%, #1a150e 0%, #000000 100%)" }}>
        </div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          {/* Section Header */}
          {!loading && !error && filteredHotels.length > 0 && (
            <div className="mb-16 text-center md:text-left border-b border-white/5 pb-8 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                Curated Collection
              </h2>
              <p className="text-gray-500 text-sm tracking-wide">Handpicked luxury for the distinguished traveler.</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-32">
              <div className="w-12 h-12 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-500 text-sm tracking-[0.2em] uppercase">Loading Collection</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
               <p className="text-red-400/80 font-serif text-xl border border-red-500/20 inline-block px-8 py-4 bg-red-500/5 rounded-sm">
                  {error}
               </p>
            </div>
          )}

          {/* Hotels Grid */}
          {!loading && !error && (
            <>
              {filteredHotels.length === 0 ? (
                <div className="text-center py-32">
                  <div className="w-20 h-20 border border-white/10 rounded-full mx-auto flex items-center justify-center mb-6">
                    <SearchIcon className="text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">No results found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <>
                  <HotelsList hotels={visibleHotels} />

                  {/* Load More Button - Minimalist Luxury */}
                  {filteredHotels.length > 12 && visibleCount < filteredHotels.length && (
                    <div className="mt-20 text-center">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 12)}
                        className="group relative px-12 py-4 border border-white/10 hover:border-[#D4AF37] bg-transparent text-white font-serif tracking-widest text-xs uppercase transition-all duration-500 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-[#D4AF37] transition-colors">
                          Explore More
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                      <p className="text-gray-600 text-xs mt-4 tracking-wider">
                        DISPLAYING {visibleCount} OF {filteredHotels.length}
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ================= NEW SECTION: IMMERSIVE EXPERIENCE (WITH IMAGE) ================= */}
      <section className="relative bg-[#080808] py-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
          
          {/* Left: Large Image */}
          <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Experience" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#080808] opacity-80"></div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
            {/* Decorative Element */}
            <div className="absolute top-10 right-10 text-[#D4AF37]/20 opacity-50">
              <SpaIcon className="w-32 h-32" />
            </div>

            <div className="max-w-lg z-10">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                <span>•</span> Exclusive Access <span>•</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                The Art of <br/> <span className="text-[#D4AF37] italic">Hospitality</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed text-lg mb-8">
                Beyond mere accommodation, we offer a sanctuary of tranquility. From personalized concierge services to world-class dining, every moment is crafted to perfection.
              </p>
              
              <div className="flex gap-8 mb-8">
                <div>
                  <span className="block text-3xl font-serif text-white">24/7</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Concierge</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif text-white">100%</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Privacy</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#D4AF37] text-sm font-bold uppercase tracking-widest group cursor-pointer hover:text-white transition-colors">
                Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Minimalist Grid */}
      <section className="bg-[#050505] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { title: "Curated Stays", desc: "Only the finest luxury hotels selected by our experts." },
              { title: "Exclusive Rates", desc: "Members get access to rates not available anywhere else." },
              { title: "Secure Booking", desc: "Advanced encryption for your privacy and peace of mind." },
              { title: "24/7 Concierge", desc: "Dedicated support team available around the clock." }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 text-center md:text-left group hover:bg-white/[0.02] transition-colors duration-500">
                <h3 className="text-[#D4AF37] font-serif text-lg mb-2 group-hover:tracking-wide transition-all duration-500">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - Dramatic Numbers */}
      <section className="relative py-24 px-6 bg-[#050505] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/3 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          {[
            { number: "500+", label: "LUXURY PROPERTIES" },
            { number: "10K+", label: "SATISFIED GUESTS" },
            { number: "25+", label: "GLOBAL CITIES" },
            { number: "4.9", label: "AVERAGE RATING" }
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-3xl md:text-5xl font-serif text-white mb-2 tracking-tight">{stat.number}</div>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - Step Layout */}
      <section className="bg-[#080808] py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Discover", desc: "Explore our handpicked collection of the world's finest sanctuaries." },
              { step: "02", title: "Reserve", desc: "Secure your dates with our seamless, encrypted booking process." },
              { step: "03", title: "Experience", desc: "Arrive and indulge in unparalleled hospitality and comfort." }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8 border-l border-white/10 hover:border-[#D4AF37]/50 transition-colors duration-500">
                <span className="absolute -left-[5px] top-0 text-xs text-[#D4AF37] font-mono bg-[#080808] px-2">{item.step}</span>
                <h3 className="text-2xl font-serif text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Magazine Style */}
      <section className="bg-[#050505] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif text-white">Traveller Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Eleanor Vance",
                role: "Architect",
                text: "The attention to detail at the Grand Oasis properties is simply unmatched. It’s not just a stay; it’s an experience.",
                location: "London, UK"
              },
              {
                name: "James Sterling",
                role: "Entrepreneur",
                text: "Booking was effortless, and the customer service team anticipated my needs before I even voiced them.",
                location: "New York, USA"
              },
              {
                name: "Sofia Rossi",
                role: "Journalist",
                text: "I travel frequently for work, but this platform has consistently delivered the highest standard of accommodation.",
                location: "Milan, Italy"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-sm transition-all duration-500">
                <div className="flex text-[#D4AF37] text-xs mb-6">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p className="text-gray-300 font-serif italic leading-relaxed mb-8">"{testimonial.text}"</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-gray-600 text-xs">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS - Pill Navigation */}
      <section className="bg-[#080808] py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-serif text-white mb-12 text-2xl">Popular Destinations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Rajkot", "Ahmedabad", "Surat", "Amreli", "Vadodara", "Jamnagar", "Junagadh", "Bhavnagar"].map((city, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCity(city)
                  window.scrollTo({ top: document.getElementById('search')?.offsetTop - 100, behavior: 'smooth' })
                }}
                className="px-6 py-3 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 tracking-wide"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - High Contrast */}
      <section className="relative py-32 px-6 bg-[#050505] text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
            Begin Your <br/> <span className="text-[#D4AF37] italic">Journey</span>
          </h2>
          <p className="text-gray-400 mb-10 font-light text-lg">
            Unlock a world of exclusive destinations and bespoke experiences.
          </p>
          <a
            href="#hotels"
            className="inline-block bg-[#D4AF37] text-black px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            View Collection
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </>
  )
}

export default Home