import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearMessage } from "../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, Building2 } from "lucide-react";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error } = useSelector((state) => state.user || {});
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/reset-password", { state: { email } });
      dispatch(clearMessage());
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [message, error, dispatch, navigate, email]);

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
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.9)]" />
      </div>

      {/* 🏨 Brand */}
      <div className="absolute top-6 left-6 flex items-center gap-3 text-white z-10">
        <Building2 className="w-7 h-7 text-amber-400" />
        <div className="font-serif tracking-[0.35em] uppercase text-lg">
          Grand Oasis
        </div>
      </div>

      {/* 💎 Forgot Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

          {/* heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-white mb-2 tracking-tight">
              Forgot Password
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300/70">
              Secure Account Recovery
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                placeholder="Registered Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 focus:bg-black/40 transition-all"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold py-4 rounded-xl tracking-widest text-xs hover:scale-[1.02] transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(245,158,11,0.6)] flex items-center justify-center gap-3"
            >
              SEND OTP
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-10 text-center text-white/40 text-xs">
            Remember your password?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-amber-400 hover:text-amber-300 cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
