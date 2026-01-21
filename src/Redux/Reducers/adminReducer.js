import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://grand-oasis-backend.onrender.com"

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
      })
      return data.users
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      )
    }
  }
)

// GET ALL BOOKINGS
export const getAllBookings = createAsyncThunk(
  "admin/getAllBookings",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/bookings`, {
        withCredentials: true,
      })
      return data.bookings
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      )
    }
  }
)

// ADD HOTEL
export const addHotel = createAsyncThunk(
  "admin/addHotel",
  async (hotelData, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/hotels/add", hotelData, {
        withCredentials: true,
      })
      return data.hotel
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add hotel"
      )
    }
  }
)

// UPDATE HOTEL
export const updateHotel = createAsyncThunk(
  "admin/updateHotel",
  async ({ id, data: hotelData }, thunkAPI) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/hotels/${id}`, hotelData, {
        withCredentials: true,
      })
      return data.hotel
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update hotel"
      )
    }
  }
)

// DELETE HOTEL
export const deleteHotel = createAsyncThunk(
  "admin/deleteHotel",
  async (hotelId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/hotels/${hotelId}`, {
        withCredentials: true,
      })
      return hotelId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete hotel"
      )
    }
  }
)

// CANCEL BOOKING (ADMIN)
export const cancelBookingAdmin = createAsyncThunk(
  "admin/cancelBooking",
  async (bookingId, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}/bookings/cancel/${bookingId}`, {}, {
        withCredentials: true,
      })
      return { bookingId, message: data.message }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking"
      )
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // GET ALL BOOKINGS
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ADD HOTEL
      .addCase(addHotel.pending, (state) => {
        state.loading = true
      })
      .addCase(addHotel.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // UPDATE HOTEL
      .addCase(updateHotel.pending, (state) => {
        state.loading = true
      })
      .addCase(updateHotel.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // DELETE HOTEL
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteHotel.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // CANCEL BOOKING
      .addCase(cancelBookingAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(cancelBookingAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = state.bookings.map(booking =>
          booking._id === action.payload.bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      })
      .addCase(cancelBookingAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = adminSlice.actions
export default adminSlice.reducer


