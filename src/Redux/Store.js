import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Reducers/userSlice"
import hotelReducer from "./Reducers/hotelReducer"
import bookingReducer from "./Reducers/bookingReducer"
import adminReducer from "./Reducers/adminReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,     // ✅ MUST be "hotel"
    booking: bookingReducer,
    admin: adminReducer,
  },
})
