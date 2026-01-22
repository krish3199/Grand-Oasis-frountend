import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "./baseURL";

const API_URL = `${baseURL}/api/bookings`;

// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "booking/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}/create`, payload, {
        withCredentials: true,
      });
      return data.booking;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking failed"
      );
    }
  }
);

// GET MY BOOKINGS
export const getMyBookings = createAsyncThunk(
  "booking/my",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/my`, {
        withCredentials: true,
      });
      return data.bookings;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch bookings failed"
      );
    }
  }
);

// CANCEL BOOKING
export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (bookingId, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}/cancel/${bookingId}`, {}, {
        withCredentials: true,
      });
      return { bookingId, message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cancel booking failed"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBookingState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MY BOOKINGS
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL BOOKING
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings = state.bookings.map(booking =>
          booking._id === action.payload.bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
