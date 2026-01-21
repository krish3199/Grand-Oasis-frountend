import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  // ✅ FIX: auth state correct reducer se lo
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    toast.info("Please login to continue");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
