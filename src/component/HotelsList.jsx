import HotelCard from "./HotelCard"

const HotelsList = ({ hotels }) => {
  if (!hotels?.length) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-8 bg-slate-800/50 border border-amber-400/20 rounded-2xl">
          <p className="text-2xl text-gray-400 font-light mb-2">🔍 No hotels found</p>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {hotels.map((hotel, index) => (
        <div
          key={hotel._id}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both'
          }}
        >
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  )
}

export default HotelsList
