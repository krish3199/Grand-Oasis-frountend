"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllHotels } from "../Redux/Reducers/hotelReducer"
import { addHotel, updateHotel, deleteHotel } from "../Redux/Reducers/adminReducer"
import { toast } from "react-toastify"

const AdminHotelManagement = () => {
  const dispatch = useDispatch()
  const { hotels } = useSelector((state) => state.hotel)
  const { loading } = useSelector((state) => state.admin)
  const [showModal, setShowModal] = useState(false)
  const [editingHotel, setEditingHotel] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
    images: [],
    amenities: [],
    rating: 4.5,
    rooms: [
      {
        type: "Deluxe Room",
        price: 2500,
        availableRooms: 10,
        facilities: ["AC", "TV", "WiFi"],
        images: []
      }
    ]
  })
  const [newAmenity, setNewAmenity] = useState("")
  const [newHotelImage, setNewHotelImage] = useState("")
  const [roomImageInputs, setRoomImageInputs] = useState({})

  useEffect(() => {
    dispatch(getAllHotels())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.city || !formData.description || !formData.image) {
      toast.error("Please fill all required fields")
      return
    }

    // Validate rooms
    if (!formData.rooms || formData.rooms.length === 0) {
      toast.error("Please add at least one room")
      return
    }

    try {
      if (editingHotel) {
        const result = await dispatch(updateHotel({ 
          id: editingHotel._id, 
          data: formData 
        })).unwrap()
        
        if (result) {
          toast.success("✅ Hotel updated successfully! 🎉")
          setShowModal(false)
          resetForm()
          dispatch(getAllHotels())
        }
      } else {
        const result = await dispatch(addHotel(formData)).unwrap()
        
        if (result) {
          toast.success("✅ Hotel added successfully! 🎉")
          setShowModal(false)
          resetForm()
          dispatch(getAllHotels())
        }
      }
    } catch (error) {
      console.error("Hotel operation error:", error)
      toast.error(error || "❌ Operation failed. Please check console for details.")
    }
  }

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel? This action cannot be undone.")) return

    try {
      await dispatch(deleteHotel(hotelId)).unwrap()
      toast.success("✅ Hotel deleted successfully!")
      dispatch(getAllHotels())
    } catch (error) {
      console.error("Delete error:", error)
      toast.error(error || "❌ Delete failed")
    }
  }

  const handleEdit = (hotel) => {
    console.log("Editing hotel:", hotel)
    setEditingHotel(hotel)
    
    // Properly set all form data including rooms
    setFormData({
      name: hotel.name || "",
      city: hotel.city || "",
      description: hotel.description || "",
      image: hotel.image || "",
      images: hotel.images || [],
      amenities: hotel.amenities || [],
      rating: hotel.rating || 4.5,
      rooms: hotel.rooms && hotel.rooms.length > 0 
        ? hotel.rooms.map(room => ({
            type: room.type || "Deluxe Room",
            price: room.price || 2500,
            availableRooms: room.availableRooms || 10,
            facilities: Array.isArray(room.facilities) ? room.facilities : [],
            images: Array.isArray(room.images) ? room.images : []
          }))
        : [{
            type: "Deluxe Room",
            price: 2500,
            availableRooms: 10,
            facilities: ["AC", "TV", "WiFi"],
            images: []
          }]
    })
    
    // Reset room image inputs
    setRoomImageInputs({})
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      description: "",
      image: "",
      images: [],
      amenities: [],
      rating: 4.5,
      rooms: [
        {
          type: "Deluxe Room",
          price: 2500,
          availableRooms: 10,
          facilities: ["AC", "TV", "WiFi"],
          images: []
        }
      ]
    })
    setEditingHotel(null)
    setNewAmenity("")
    setNewHotelImage("")
    setRoomImageInputs({})
  }

  const addAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity] })
      setNewAmenity("")
    }
  }

  // Add hotel gallery image (for the 4 small images in details page)
  const addHotelImage = () => {
    if (newHotelImage && newHotelImage.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), newHotelImage.trim()]
      })
      setNewHotelImage("")
    }
  }

  // Remove hotel gallery image
  const removeHotelImage = (idx) => {
    setFormData({
      ...formData,
      images: (formData.images || []).filter((_, i) => i !== idx)
    })
  }

  const removeAmenity = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter(a => a !== amenity)
    })
  }

  const addRoom = () => {
    setFormData({
      ...formData,
      rooms: [
        ...formData.rooms,
        {
          type: "New Room",
          price: 3000,
          availableRooms: 5,
          facilities: [],
          images: []
        }
      ]
    })
  }

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...formData.rooms]
    updatedRooms[index] = { ...updatedRooms[index], [field]: value }
    setFormData({ ...formData, rooms: updatedRooms })
  }

  // Add room image
  const handleAddRoomImage = (roomIdx) => {
    const imageUrl = roomImageInputs[roomIdx] || ""
    if (imageUrl.trim()) {
      const updatedRooms = [...formData.rooms]
      if (!updatedRooms[roomIdx].images) {
        updatedRooms[roomIdx].images = []
      }
      updatedRooms[roomIdx].images.push(imageUrl.trim())
      setFormData({ ...formData, rooms: updatedRooms })
      setRoomImageInputs({ ...roomImageInputs, [roomIdx]: "" })
    }
  }

  // Remove room image
  const removeRoomImage = (roomIdx, imageIdx) => {
    const updatedRooms = [...formData.rooms]
    updatedRooms[roomIdx].images = updatedRooms[roomIdx].images.filter((_, idx) => idx !== imageIdx)
    setFormData({ ...formData, rooms: updatedRooms })
  }

  // Add room facility
  const addRoomFacility = (roomIdx, facility) => {
    if (facility && facility.trim()) {
      const updatedRooms = [...formData.rooms]
      if (!updatedRooms[roomIdx].facilities) {
        updatedRooms[roomIdx].facilities = []
      }
      if (!updatedRooms[roomIdx].facilities.includes(facility.trim())) {
        updatedRooms[roomIdx].facilities.push(facility.trim())
        setFormData({ ...formData, rooms: updatedRooms })
      }
    }
  }

  // Remove room facility
  const removeRoomFacility = (roomIdx, facility) => {
    const updatedRooms = [...formData.rooms]
    updatedRooms[roomIdx].facilities = updatedRooms[roomIdx].facilities.filter(f => f !== facility)
    setFormData({ ...formData, rooms: updatedRooms })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Hotel Management</h1>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-bold hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg"
        >
          ➕ Add New Hotel
        </button>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels && hotels.length > 0 ? hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-slate-800/50 border border-amber-400/20 rounded-xl overflow-hidden hover:border-amber-400/50 transition-all"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>
              <p className="text-gray-400 text-sm mb-2">📍 {hotel.city}</p>
              <p className="text-amber-400 mb-4">⭐ {hotel.rating || 4.5}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="flex-1 px-4 py-2 bg-amber-400/20 text-amber-400 rounded-lg hover:bg-amber-400/30 transition-all font-semibold"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel._id)}
                  className="flex-1 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">No hotels found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-amber-400/30 rounded-2xl p-6 max-w-4xl w-full my-8 shadow-2xl shadow-amber-400/20">
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-400/20 sticky top-0 bg-slate-900/95 backdrop-blur-sm -mx-6 px-6 -mt-6 pt-6 rounded-t-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {editingHotel ? "✏️ Edit Hotel" : "➕ Add New Hotel"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="text-gray-400 hover:text-white text-3xl hover:bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center transition-all"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto pr-2">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Hotel Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                    placeholder="Enter hotel name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                    placeholder="Enter city name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all h-28 resize-none"
                  placeholder="Enter hotel description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Main Image URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                    placeholder="4.5"
                  />
                </div>
              </div>

              {/* Hotel Gallery Images (used for the 4-image grid on details page) */}
              <div className="space-y-3">
                <label className="block text-gray-300 mb-1 font-semibold">🖼️ Hotel Gallery Images</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newHotelImage}
                    onChange={(e) => setNewHotelImage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addHotelImage()
                      }
                    }}
                    placeholder="Add gallery image URL (these show as the 4 small images)"
                    className="flex-1 bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addHotelImage}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-semibold hover:from-amber-300 hover:to-amber-400 transition-all whitespace-nowrap"
                  >
                    ➕ Add Image
                  </button>
                </div>

                {formData.images && formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-800/30 p-3 rounded-xl border border-amber-400/10">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-28 object-cover rounded-lg border border-amber-400/20"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200?text=Image+Error"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeHotelImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-800/20 rounded-xl border border-amber-400/10 text-gray-500 text-sm">
                    No gallery images added yet. Add at least 3-4 URLs so the details page shows all four thumbnails.
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">🏨 Hotel Amenities</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                    placeholder="Add amenity (e.g., Free WiFi, Swimming Pool)"
                    className="flex-1 bg-slate-800/50 border border-amber-400/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-semibold hover:from-amber-300 hover:to-amber-400 transition-all whitespace-nowrap"
                  >
                    ➕ Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 bg-slate-800/30 rounded-xl border border-amber-400/10">
                  {formData.amenities.length > 0 ? (
                    formData.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full flex items-center gap-2 border border-amber-400/30"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => removeAmenity(amenity)}
                          className="hover:text-red-400 hover:scale-110 transition-all text-lg font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No amenities added yet</span>
                  )}
                </div>
              </div>

              {/* Rooms */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-gray-300 font-semibold text-lg">🛏️ Rooms</label>
                  <button
                    type="button"
                    onClick={addRoom}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-all"
                  >
                    ➕ Add Room
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.rooms.map((room, roomIdx) => (
                    <div key={roomIdx} className="bg-slate-800/50 border border-amber-400/20 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Room Type</label>
                          <input
                            type="text"
                            value={room.type}
                            onChange={(e) => updateRoom(roomIdx, "type", e.target.value)}
                            className="w-full bg-slate-900 border border-amber-400/30 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Price/Night</label>
                          <input
                            type="number"
                            value={room.price}
                            onChange={(e) => updateRoom(roomIdx, "price", parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-amber-400/30 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-1">Available Rooms</label>
                        <input
                          type="number"
                          value={room.availableRooms}
                          onChange={(e) => updateRoom(roomIdx, "availableRooms", parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-amber-400/30 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                          required
                        />
                      </div>

                      {/* Room Images */}
                      <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2 font-semibold">🖼️ Room Images</label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="url"
                            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                            value={roomImageInputs[roomIdx] || ""}
                            onChange={(e) => setRoomImageInputs({ ...roomImageInputs, [roomIdx]: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddRoomImage(roomIdx)
                              }
                            }}
                            className="flex-1 bg-slate-900 border border-amber-400/30 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddRoomImage(roomIdx)}
                            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all font-bold text-sm whitespace-nowrap shadow-lg"
                          >
                            ➕ Add Image
                          </button>
                        </div>
                        
                        {/* Display Room Images */}
                        {room.images && room.images.length > 0 ? (
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 p-3 bg-slate-900/50 rounded-lg border border-amber-400/10">
                            {room.images.map((img, imgIdx) => (
                              <div key={imgIdx} className="relative group">
                                <img
                                  src={img}
                                  alt={`Room ${roomIdx + 1} Image ${imgIdx + 1}`}
                                  className="w-full h-20 object-cover rounded-lg border border-amber-400/20"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/150?text=Image+Error"
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeRoomImage(roomIdx, imgIdx)}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-slate-900/30 rounded-lg border border-amber-400/10 text-center">
                            <p className="text-gray-500 text-xs">No images added. Add room images above.</p>
                          </div>
                        )}
                      </div>

                      {/* Room Facilities */}
                      <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2 font-semibold">🔧 Room Facilities</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add facility (e.g., AC, TV, WiFi)"
                            className="flex-1 bg-slate-900 border border-amber-400/30 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addRoomFacility(roomIdx, e.target.value)
                                e.target.value = ""
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              const input = e.target.previousElementSibling
                              addRoomFacility(roomIdx, input?.value)
                              if (input) input.value = ""
                            }}
                            className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-600/30 transition-all font-semibold text-sm"
                          >
                            ➕
                          </button>
                        </div>
                        {room.facilities && room.facilities.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {room.facilities.map((facility, facIdx) => (
                              <span
                                key={facIdx}
                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center gap-2 border border-blue-500/30"
                              >
                                {facility}
                                <button
                                  type="button"
                                  onClick={() => removeRoomFacility(roomIdx, facility)}
                                  className="hover:text-red-400"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedRooms = formData.rooms.filter((_, idx) => idx !== roomIdx)
                          setFormData({ ...formData, rooms: updatedRooms })
                        }}
                        className="text-red-400 text-sm hover:text-red-300 font-semibold"
                      >
                        🗑️ Remove Room
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-amber-400/20">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-bold hover:from-amber-300 hover:to-amber-400 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingHotel ? "✅ Update Hotel" : "➕ Add Hotel"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="px-6 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminHotelManagement
