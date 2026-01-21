import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://grand-oasis-backend.onrender.com" ;

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================= REGISTER ================= */
export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* ================= FORGOT PASSWORD (SEND OTP) ================= */
export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/forgot-password`,
        { email }
      );
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "OTP send failed"
      );
    }
  }
);

/* ================= VERIFY OTP ================= */
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp,newPassword }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/reset`,
        { email, otp, newPassword }
      );
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

/* ================= RESET PASSWORD ================= */
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Password reset failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuth: false,
    user: null,
    message: null,
    error: null,
    otpVerified: false,
  },

  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.message = null;
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
    clearOtpState(state) {
      state.otpVerified = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user || action.payload;
        state.message = action.payload.message || "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== REGISTER ===== */
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Registered successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FORGOT PASSWORD ===== */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== VERIFY OTP ===== */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.message = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== RESET PASSWORD ===== */
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessage, clearOtpState } = userSlice.actions
export default userSlice.reducer;