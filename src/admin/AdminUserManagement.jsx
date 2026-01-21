"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../Redux/Reducers/adminReducer"

const AdminUserManagement = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <div className="text-gray-400">
          Total Users: <span className="text-amber-400 font-bold">{users?.length || 0}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-amber-400/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-400/10">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-amber-400/20 text-amber-400 border border-amber-400/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUserManagement


