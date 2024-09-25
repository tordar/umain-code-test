import Image from 'next/image'
import Chip from "@/app/utils/Chip";


const restaurants = [
    { name: 'Cortado Bar', icon: '/images/coffee.png', status: 'Open', time: '5-10 min' },
    { name: 'Neta', icon: '/images/burrito.png', status: 'Open', time: '5-10 min' },
    { name: 'Breakfast Club', icon: '/images/breakfast.png', status: 'Open', time: '20-25 min' },
    { name: "Burgers n' stuff", icon: '/images/hamburger.png', status: 'Open', time: '25-40 min' },
    { name: 'Fries Guys', icon: '/images/fries.png', status: 'Closed', time: '1 hour' },
]

export default function RestaurantGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image src={restaurant.icon} alt={restaurant.name} width={80} height={80} className="rounded-md" />
                        <div>
                            <h3>{restaurant.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span
                                    className={`w-2 h-2 rounded-full ${restaurant.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}/>
                                <Chip label={restaurant.status}/>
                            </div>
                            <Chip label={restaurant.time}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
