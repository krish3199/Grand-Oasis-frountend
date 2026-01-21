import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://grand-oasis-backend.onrender.com";

/* =====================
   ASYNC ACTIONS
===================== */

// GET ALL HOTELS
export const getAllHotels = createAsyncThunk(
  "hotel/getAllHotels",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL);
      console.log("🔥 HOTELS API DATA 👉", data);

      // handle array or object response
      if (Array.isArray(data)) {
        return data;
      }

      return data.hotels || [];
    } catch (error) {
      console.log("❌ HOTELS API ERROR 👉", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Hotel fetch failed"
      );
    }
  }
);

// GET SINGLE HOTEL
export const getHotelById = createAsyncThunk(
  "hotel/getHotelById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);

      // 🔴 VERY IMPORTANT
      // backend returns: { hotel: {...} }
      return data.hotel;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Hotel fetch failed"
      );
    }
  }
);

/* =====================
   SLICE
===================== */

const hotelReducer = createSlice({
  name: "hotel",
  initialState: {
    hotels: [],          // all hotels list
    selectedHotel: null, // ✅ FIXED (single hotel)
    loading: false,
    error: null,
  },
  reducers: {
    clearHotelError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====================
      // GET ALL HOTELS
      // =====================
      .addCase(getAllHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHotels.fulfilled, (state, action) => {
        console.log(
          "🔥 REDUCER PAYLOAD LENGTH 👉",
          action.payload?.length
        );
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(getAllHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // GET SINGLE HOTEL
      // =====================
      .addCase(getHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedHotel = null; // ✅ IMPORTANT
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHotel = action.payload; // ✅ FIXED
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHotelError } = hotelReducer.actions;
export default hotelReducer.reducer;
