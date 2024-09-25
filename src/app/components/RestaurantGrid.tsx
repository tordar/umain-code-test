import Image from 'next/image'


const restaurants = [
    { name: 'Cortado Bar', icon: '/assets/coffee.png', status: 'Open', time: '5-10 min' },
    { name: 'Neta', icon: '/assets/burrito.png', status: 'Open', time: '5-10 min' },
    { name: 'Breakfast Club', icon: '/assets/egg and bacon.png', status: 'Open', time: '20-25 min' },
    { name: "Burgers n' stuff", icon: '/assets/burger.png', status: 'Open', time: '25-40 min' },
    { name: 'Fries Guys', icon: '/assets/fries.png', status: 'Open', time: '1 hour' },
    { name: 'Cortado Bar', icon: '/assets/coffee.png', status: 'Closed', time: 'Opens tomorrow at 12 pm' },
]

export default function RestaurantGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image src={restaurant.icon} alt={restaurant.name} width={80} height={80} className="rounded-md" />
                        <div>
                            <h3 className="font-semibold">{restaurant.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${restaurant.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-sm text-gray-600">{restaurant.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{restaurant.time}</p>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
