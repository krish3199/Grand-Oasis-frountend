"use client"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a150e] via-[#050505] to-black opacity-80 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* BRAND LOGO */}
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#F2D06B] to-[#AA771C] tracking-[0.3em] font-light">
            GRAND OASIS
          </h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6 animate-expand-line"></div>
        </div>

        {/* PREMIUM SPINNER SYSTEM */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          
          {/* Outer Slow Ring */}
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/10"></div>
          <div className="absolute inset-0 rounded-full border-t border-b border-[#D4AF37]/30 animate-spin-slow"></div>
          
          {/* Middle Medium Ring (Rotating Reverse) */}
          <div className="absolute inset-4 rounded-full border border-r border-l border-[#D4AF37]/20 animate-spin-reverse"></div>
          <div className="absolute inset-4 rounded-full border-t border-[#D4AF37]/50 animate-spin-slow"></div>
          
          {/* Inner Fast Ring */}
          <div className="absolute inset-8 rounded-full border border-dashed border-[#D4AF37]/40 animate-spin"></div>
          
          {/* Center Glow & Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse-fast"></div>
          </div>
          
          {/* Decorative Crosshairs (Subtle Tech Feel) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-[1px] bg-[#D4AF37]"></div>
            <div className="h-full w-[1px] bg-[#D4AF37] absolute"></div>
          </div>

        </div>

        {/* LOADING STATUS TEXT */}
        <div className="mt-12 text-center animate-fade-in-up-delayed">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase font-light flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50 block"></span>
            Curating Experience
            <span className="w-8 h-[1px] bg-[#D4AF37]/50 block"></span>
          </p>
        </div>

      </div>

      {/* Custom Styles for Specific Animations */}
           <style jsx>{`
        @keyframes expand-line {
          0% { width: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 100px; opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        /* --- TIMING CHANGES HERE --- */
        
        .animate-expand-line {
          /* Badhaya hua timing: 1.5s se 4s */
          animation: expand-line 4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in-up {
          /* Badhaya hua timing: 1s se 3s */
          animation: fade-in-up 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in-up-delayed {
          /* Badhaya hua timing: 1s se 3s */
          animation: fade-in-up 3s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
          opacity: 0; 
        }
        .animate-pulse-fast {
          /* Badhaya hua timing: 2s se 4s */
          animation: pulse-fast 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          /* Badhaya hua timing: 6s se 15s (Bohot dheema hoga) */
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-reverse {
          /* Badhaya hua timing: 8s se 20s (Bohot dheema hoga) */
          animation: spin-reverse 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Loader