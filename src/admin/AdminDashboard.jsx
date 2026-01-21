"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllUsers, getAllBookings } from "../Redux/Reducers/adminReducer"
import { getAllHotels } from "../Redux/Reducers/hotelReducer"

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { users, bookings, loading: usersLoading } = useSelector((state) => state.admin)
  const { hotels } = useSelector((state) => state.hotel)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllHotels())
    dispatch(getAllBookings())
  }, [dispatch])

  const stats = [
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      link: "/admin/users"
    },
    {
      title: "Total Hotels",
      value: hotels?.length || 0,
      icon: "🏨",
      color: "from-amber-400 to-amber-500",
      link: "/admin/hotels"
    },
    {
      title: "Total Bookings",
      value: bookings?.length || 0,
      icon: "📋",
      color: "from-green-500 to-green-600",
      link: "/admin/bookings"
    },
    {
      title: "Active Bookings",
      value: bookings?.filter(b => b.status === "Booked")?.length || 0,
      icon: "✅",
      color: "from-purple-500 to-purple-600",
      link: "/admin/bookings"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/10 border border-amber-400/20 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, {user?.name || "Admin"} 👋
        </h1>
        <p className="text-gray-400">
          Manage your hotel booking system from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-slate-800/50 border border-amber-400/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Users</h2>
            <Link to="/admin/users" className="text-amber-400 text-sm hover:underline">
              View All →
            </Link>
          </div>
          {usersLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : users && users.length > 0 ? (
            <div className="space-y-3">
              {users.slice(0, 5).map((u) => (
                <div key={u._id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{u.name}</p>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.role === "admin" 
                      ? "bg-amber-400/20 text-amber-400 border border-amber-400/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No users found</p>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-slate-800/50 border border-amber-400/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-amber-400 text-sm hover:underline">
              View All →
            </Link>
          </div>
          {bookings && bookings.length > 0 ? (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div key={b._id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{b.hotelId?.name || "Hotel"}</p>
                    <p className="text-gray-400 text-sm">{b.userId?.email || "User"}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    b.status === "Booked"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

