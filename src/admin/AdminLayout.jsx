"use client"

import { useEffect, useState } from "react"
import { Outlet, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../Redux/Reducers/userSlice"
import { toast } from "react-toastify"

const AdminLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector((state) => state.user)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isAuth || !user || user.role !== "admin") {
      toast.error("Admin access required")
      navigate("/admin/login")
    }
  }, [isAuth, user, navigate])

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully")
    navigate("/admin/login")
  }

  if (!isAuth || !user || user.role !== "admin") {
    return null
  }

  const navItems = [
    { path: "/admin/dashboard", label: "📊 Dashboard", icon: "📊" },
    { path: "/admin/hotels", label: "🏨 Hotels", icon: "🏨" },
    { path: "/admin/users", label: "👥 Users", icon: "👥" },
    { path: "/admin/bookings", label: "📋 Bookings", icon: "📋" },
  ]

  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      {/* Sidebar - Fixed, No Scroll */}
      <div className={`bg-slate-900 border-r border-amber-400/20 transition-all duration-300 flex flex-col h-full ${
        sidebarOpen ? "w-64" : "w-20"
      }`}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-amber-400/20 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h1 className={`font-serif font-bold text-amber-400 text-lg md:text-xl transition-all whitespace-nowrap ${sidebarOpen ? "block" : "hidden"}`}>
              Admin Panel
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-amber-400 hover:text-amber-300 p-2 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-amber-400 rounded-lg transition-all duration-200"
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <span className={`whitespace-nowrap ${sidebarOpen ? "block" : "hidden"}`}>{item.label.replace(/^[^\s]+\s/, "")}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section - Fixed */}
        <div className="p-4 border-t border-amber-400/20 flex-shrink-0">
          <div className="p-3 bg-slate-800/50 rounded-lg mb-2">
            <p className={`text-xs text-gray-400 mb-1 ${sidebarOpen ? "block" : "hidden"}`}>Logged in as</p>
            <p className="text-sm text-amber-400 font-semibold truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/90 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span className={sidebarOpen ? "block" : "hidden"}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Fixed */}
        <header className="bg-slate-900/80 backdrop-blur-xl border-b border-amber-400/20 flex-shrink-0 z-10">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Admin Dashboard</h2>
              <p className="text-gray-400 text-sm">Welcome back, {user.name || "Admin"}</p>
            </div>
            <Link
              to="/home"
              className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-all text-sm whitespace-nowrap"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout


