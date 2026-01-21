"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearMessage, register } from "../Redux/Reducers/userSlice"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, Building2 } from "lucide-react"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { message, error } = useSelector((state) => state.user || {})

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [isHovered, setIsHovered] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register({ name, email, password }))
  }

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(clearMessage())
      navigate("/login")
    }

    if (error) {
      toast.error(error)
      dispatch(clearMessage())
    }
  }, [message, error, dispatch, navigate])

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
    {/* 🌆 Hotel Background */}
    <div
      className="absolute inset-0 scale-110 animate-[slow-zoom_25s_ease-in-out_infinite_alternate]"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
      {/* vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.9)]" />
    </div>

    {/* 🏨 Brand */}
    <div className="absolute top-6 left-6 flex items-center gap-3 text-white z-10">
      <Building2 className="w-7 h-7 text-amber-400" />
      <div className="font-serif tracking-[0.35em] uppercase text-lg">
        Grand Oasis
      </div>
    </div>

    {/* 💎 Register Card */}
    <div className="relative z-10 w-full max-w-md px-6">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

        {/* heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif text-white mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300/70">
            Luxury Member Access
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 focus:bg-black/40 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 focus:bg-black/40 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 focus:bg-black/40 transition-all"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r cursor-pointer from-amber-500 via-amber-400 to-amber-500 text-black font-bold py-4 rounded-xl tracking-widest text-xs hover:scale-[1.02] transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(245,158,11,0.6)]"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Login */}
        <p className="mt-10 text-center text-white/40 text-xs">
          Already a member?
          <span
            onClick={() => navigate("/login")}
            className="ml-2 text-amber-400 hover:text-amber-300 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>

    {/* animation */}
    <style jsx global>{`
      @keyframes slow-zoom {
        from { transform: scale(1); }
        to { transform: scale(1.15); }
      }
    `}</style>
  </div>
)

}

export default Register
