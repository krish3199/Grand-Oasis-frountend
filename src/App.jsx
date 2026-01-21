import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./component/SignIn";
import Register from "./component/Register";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

import UserLayout from "./component/UserLayout";
import Hotels from "./component/Hotels";
import Home from "./component/Home";

import MyBookings from "./component/MyBookings";

// 🔐 PROTECTED
import ProtectedRoute from "./component/ProtectedRoute";
import HotelDetails from "./component/HotelDetails";

// ADMIN
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminHotelManagement from "./admin/AdminHotelManagement";
import AdminUserManagement from "./admin/AdminUserManagement";
import AdminBookingManagement from "./admin/AdminBookingManagement";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

// LOADER
import Loader from "./component/Loader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT ROUTE - REDIRECT TO HOME */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* AUTH ROUTES (NO HEADER / FOOTER) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ADMIN AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/hotels" element={<AdminHotelManagement />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/bookings" element={<AdminBookingManagement />} />
          </Route>
        </Route>

        {/* USER ROUTES (WITH HEADER / FOOTER) */}
        <Route element={<UserLayout />}>
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/home" element={<Home />} />

          {/* 🔐 PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer theme="dark" position="top-center" />
    </BrowserRouter>
  );
};

export default App;
