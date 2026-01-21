"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

const AdminProtectedRoute = () => {
  const navigate = useNavigate()
  const { user, isAuth } = useSelector((state) => state.user)

  useEffect(() => {
    if (!isAuth || !user || user.role !== "admin") {
      navigate("/admin/login")
    }
  }, [isAuth, user, navigate])

  if (!isAuth || !user || user.role !== "admin") {
    return null
  }

  return <Outlet />
}

export default AdminProtectedRoute


