"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../Redux/Reducers/userSlice"
import { toast } from "react-toastify"

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields")
      return
    }

    try {
      const result = await dispatch(login(formData)).unwrap()
      
      // Check if user is admin
      if (result.user && result.user.role === "admin") {
        toast.success("Welcome Admin! 🎉")
        navigate("/admin/dashboard")
      } else {
        toast.error("Access denied. Admin only.")
        dispatch({ type: "user/logout" })
      }
    } catch (error) {
      toast.error(error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            <span className="text-amber-400">Admin</span> Portal
          </h1>
          <p className="text-gray-400">Sign in to access admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-900/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 py-3 rounded-xl font-bold hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-400/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "🔐 Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              ← Back to User Login
            </button>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 text-center">
          <p className="text-amber-400 text-sm">
            ⚠️ Admin access only. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin


