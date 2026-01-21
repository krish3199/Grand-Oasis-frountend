import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // --- Premium SVG Icons (Inline for portability) ---
  const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.7S7.1 9.7 16 11c-3-3.2-5.8-6.2-9.8-6.5C9 2.8 13.5 3 22 4z"/></svg>
  const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Subtle Top Line Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-8">
            <div>
              <Link to="/" className="text-2xl font-serif tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]">
                GRAND OASIS
              </Link>
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-xs">
              Defining the art of hospitality. We curate the world's most extraordinary stays for the discerning traveler.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              {[{ icon: <FacebookIcon />, href: "#" }, { icon: <InstagramIcon />, href: "#" }, { icon: <TwitterIcon />, href: "#" }].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              {[
                { to: "/home", label: "Home" },
                { to: "/hotels", label: "Our Collection" },
                { to: "#search", label: "Explore" },
                { to: "/my-bookings", label: "My Bookings" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 group"
                  >
                    <span className="text-gray-600 group-hover:translate-x-1 transition-transform duration-300 text-xs"><ChevronRight /></span>
                    <span className="tracking-wide">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg tracking-wide">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <span className="mt-1 text-[#D4AF37]"><MapPinIcon /></span>
                <div>
                  <span className="block text-xs text-[#D4AF37] uppercase tracking-widest mb-1">Headquarters</span>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                    123 Luxury Avenue, Paradise City
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <span className="mt-1 text-[#D4AF37]"><PhoneIcon /></span>
                <div>
                  <span className="block text-xs text-[#D4AF37] uppercase tracking-widest mb-1">Concierge</span>
                  <p className="text-sm text-gray-400 font-mono tracking-wide group-hover:text-gray-200 transition-colors">
                    +1 (555) 123-4567
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <span className="mt-1 text-[#D4AF37]"><MailIcon /></span>
                <div>
                  <span className="block text-xs text-[#D4AF37] uppercase tracking-widest mb-1">Email</span>
                  <p className="text-sm text-gray-400 font-mono tracking-wide group-hover:text-gray-200 transition-colors">
                    concierge@grandoasis.com
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Premium Feature) */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg tracking-wide">Exclusive Offers</h4>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Join our inner circle to receive curated travel insights and private offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-600"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black text-xs font-bold tracking-[0.2em] uppercase py-3 rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-xs text-gray-600 font-light">
            <span>&copy; {currentYear} Grand Oasis.</span>
            <span className="hidden md:inline text-gray-800">|</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
          
          <p className="text-xs text-gray-600 tracking-widest uppercase">
            Designed with Elegance
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer