import Image from 'next/image'
import Chip from "@/app/utils/Chip";
import { Restaurant } from '../types'
import { getRestaurantOpenStatus } from '../lib/api'

interface RestaurantsProps {
    restaurants: {
        restaurants: Restaurant[]
    }
}

export default async function RestaurantGrid( {restaurants }: RestaurantsProps) {
    const restaurantsWithStatus = await Promise.all(
        restaurants.restaurants.map(async (restaurant, index) => {
            try {
                const status = await getRestaurantOpenStatus(restaurant.id)
                return { ...restaurant, status: { isOpen: index % 2 === 0 } }
            } catch (error) {
                console.error(`Error fetching status for ${restaurant.name}:`, error)
                return { ...restaurant, status: { isOpen: null } }
            }
        })
    )

    console.log('Restaurants with status:', restaurantsWithStatus)
    
    // I want to display if a restaurant is open. I need to check the ID of each restaurant that is rendered, and match it with the id from the restaurantStatus.
    // I need to import this functionality as a prop from the API file.
    
    // I also want to improve the styling of these cards, to match the Figma files.
    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantsWithStatus.map(r => (
                <div key={r.name} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image src={r.image_url} alt={r.name} width={80} height={80} className="rounded-md" />
                        <div>
                            <h3>{r.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                                {r.status.isOpen !== null ? (
                                    <>
                                <span
                                    className={`w-2 h-2 rounded-full ${r.status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
                                />
                                        <span className="text-sm text-gray-600">
                                    {r.status.isOpen ? 'Open' : 'Closed'}
                                </span>
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-600">Status unknown</span>
                                )}
                            </div>
                            <Chip label={`${r.delivery_time_minutes} min`}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
