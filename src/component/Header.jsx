"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../Redux/Reducers/userSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state) => state.user || {})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const logoutHandler = () => {
    dispatch(logout())
    navigate("/login")
  }

  const isAuthenticated = isAuth && user

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-700 ${
      scrolled 
        ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50 py-2" 
        : "bg-gradient-to-b from-black/80 to-transparent py-4"
    }`}>
      
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Premium Logo */}
        <Link
          to="/home"
          className="group relative flex flex-col"
        >
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] drop-shadow-sm">
            GRAND OASIS
          </h1>
          <span className="h-[1px] w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500 ease-in-out"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <Link 
              to="/home" 
              className="relative text-xs tracking-[0.2em] text-zinc-400 hover:text-[#d4af37] transition-colors duration-300 uppercase font-medium group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent group-hover:w-full transition-all duration-500 ease-out"></span>
            </Link>

            <Link 
              to="/hotels" 
              className="relative text-xs tracking-[0.2em] text-zinc-400 hover:text-[#d4af37] transition-colors duration-300 uppercase font-medium group py-2"
            >
              Residences
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent group-hover:w-full transition-all duration-500 ease-out"></span>
            </Link>
          </div>

          <div className="h-6 w-[1px] bg-white/10"></div>

          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-xs tracking-[0.15em] text-white hover:text-[#d4af37] transition-colors duration-300 font-medium uppercase"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 text-xs tracking-[0.15em] font-bold uppercase text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:from-[#fcf6ba] hover:to-[#bf953f] transition-all duration-500 shadow-[0_0_15px_rgba(191,149,63,0.3)] hover:shadow-[0_0_25px_rgba(191,149,63,0.6)] rounded-sm border border-[#bf953f]/20"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                to="/my-bookings"
                className="flex items-center gap-2 group"
              >
                <div className="p-2 rounded-full border border-white/10 text-zinc-400 group-hover:border-[#d4af37]/50 group-hover:text-[#d4af37] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider text-zinc-500 uppercase">Your</span>
                  <span className="text-xs tracking-[0.15em] text-zinc-300 group-hover:text-[#d4af37] transition-colors">Bookings</span>
                </div>
              </Link>

              <div className="h-4 w-[1px] bg-white/10"></div>

              <div className="flex items-center gap-4 pl-2 border-l border-white/5">
                <div className="text-right hidden xl:block">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Welcome</p>
                  <p className="text-xs text-zinc-200 font-light tracking-wide truncate max-w-[100px]">
                    {user?.email?.split("@")[0]}
                  </p>
                </div>
                <button
                  onClick={logoutHandler}
                  className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                  title="Logout"
                >
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Minimalist Luxury */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setMobileMenuOpen(!mobileMenuOpen)
          }}
          className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group z-[110] cursor-pointer"
          aria-label="Toggle menu"
          type="button"
        >
          <span className={`w-6 h-[1px] bg-[#d4af37] transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-[1px] bg-[#d4af37] transition-all duration-500 ${mobileMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'}`}></span>
          <span className={`w-6 h-[1px] bg-[#d4af37] transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Premium Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[90] flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={(e) => {
          // Close menu when clicking on overlay (not on links)
          if (e.target === e.currentTarget) {
            setMobileMenuOpen(false)
          }
        }}
      >
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center px-4">
          <Link 
            to="/home" 
            className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:tracking-widest transition-all duration-500 py-2 px-4 -mx-4 active:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(false)
            }}
          >
            Home
          </Link>
          
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#bf953f] to-transparent opacity-30"></div>
          
          <Link 
            to="/hotels" 
            className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:tracking-widest transition-all duration-500 py-2 px-4 -mx-4 active:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(false)
            }}
          >
            Residences
          </Link>

          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#bf953f] to-transparent opacity-30"></div>

          {!isAuthenticated ? (
            <>
              <Link 
                to="/login" 
                className="text-base sm:text-lg tracking-[0.2em] text-zinc-400 hover:text-white uppercase transition-colors mt-4 py-2 px-4 -mx-4 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  setMobileMenuOpen(false)
                }}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="mt-6 sm:mt-8 px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.2em] font-bold uppercase text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_0_20px_rgba(191,149,63,0.2)] rounded-sm active:scale-95 transition-transform"
                onClick={(e) => {
                  e.stopPropagation()
                  setMobileMenuOpen(false)
                }}
              >
                Join Club
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/my-bookings" 
                className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:tracking-widest transition-all duration-500 py-2 px-4 -mx-4 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  setMobileMenuOpen(false)
                }}
              >
                My Bookings
              </Link>
              <div className="text-zinc-500 text-xs sm:text-sm mt-4 tracking-wider uppercase px-4">
                Signed in as <span className="text-[#bf953f]">{user?.email?.split("@")[0]}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  logoutHandler()
                  setMobileMenuOpen(false)
                }} 
                className="mt-6 sm:mt-8 border border-red-900/50 text-red-500/80 hover:bg-red-950/30 hover:border-red-500 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 rounded-sm"
                type="button"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header