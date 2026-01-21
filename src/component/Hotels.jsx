"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllHotels } from "../Redux/Reducers/hotelReducer"
import HotelsList from "./HotelsList"

const Hotels = () => {
  const dispatch = useDispatch()
  const { hotels, loading, error } = useSelector((state) => state.hotel)

  useEffect(() => {
    dispatch(getAllHotels())
  }, [dispatch])

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-12 text-center">
          Our Luxury <span className="text-amber-400">Collection</span>
        </h2>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            <p className="text-gray-400 mt-4">Loading hotels...</p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 text-lg py-10 bg-red-500/10 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}

        {!loading && !error && <HotelsList hotels={hotels} />}
      </div>
    </section>
  )
}

export default Hotels
