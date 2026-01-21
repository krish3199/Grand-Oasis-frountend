const Hero = () => {
  // Premium hotel images for mobile
  const mobileHeroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop"
  ]

  // --- Inline SVGs for Premium Look ---
  const ArrowRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
  const SearchIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  const ChevronDown = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"/></svg>

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Desktop: YouTube Video Background (LOGIC PRESERVED) */}
      <div className="hidden md:block absolute inset-0 overflow-hidden z-0">
        <iframe
          className="absolute top-1/2 left-1/2 
                     w-[120vw] h-[120vh]
                     -translate-x-1/2 -translate-y-1/2 scale-110 opacity-60" /* Added opacity for better text contrast */
          src="https://www.youtube.com/embed/UJEUwEJ6gH4?autoplay=1&mute=1&loop=1&playlist=UJEUwEJ6gH4&controls=0&rel=0&modestbranding=1&playlist=UJEUwEJ6gH4"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      {/* Mobile: Premium Hotel Image Background (LOGIC PRESERVED) */}
      <div className="md:hidden absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0">
          <img
            src={mobileHeroImages[0]}
            alt="Luxury Hotel"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </div>

      {/* Cinematic Vignette Overlay (For readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_90%)] z-10 pointer-events-none"></div>

      {/* Floating Gold Particles (Premium Sparkles) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#D4AF37] rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 text-center">
        <div className="max-w-5xl space-y-8">
          
          {/* Main Heading - Split for Visual Impact */}
          <div className="space-y-2">
            <p className="text-[#D4AF37] text-sm md:text-base font-bold tracking-[0.4em] uppercase animate-fade-in-down">
              Discover Your
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#F2D06B] to-[#AA771C] leading-none tracking-tight drop-shadow-2xl animate-fade-in-up">
              PERFECT STAY
            </h1>
          </div>
          
          {/* Elegant Divider */}
          <div className="flex justify-center animate-expand-line">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 md:text-xl font-light tracking-wide max-w-2xl mx-auto animate-fade-in-up-delayed">
            Experience unparalleled luxury and comfort at the world's most exquisite destinations.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-col sm:flex-row mt-12 animate-fade-in-up-delayed">
            
            {/* Primary Button: Explore */}
            <a
              href="#hotels"
              className="group relative px-10 py-4 bg-[#D4AF37] text-black rounded-sm font-bold tracking-widest text-xs uppercase overflow-hidden transition-all duration-300 hover:bg-[#F2D06B] hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            {/* Secondary Button: Search */}
            <a
              href="#search"
              className="group relative px-10 py-4 bg-black/30 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] rounded-sm font-bold tracking-widest text-xs uppercase overflow-hidden transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <SearchIcon />
                Find Hotel
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => document.getElementById('search')?.scrollIntoView({behavior: 'smooth'})}>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37]/80 to-transparent"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand-line {
          0% { width: 0; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-expand-line {
          animation: expand-line 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
          width: 0;
        }
        .animate-sparkle {
          animation: sparkle linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;