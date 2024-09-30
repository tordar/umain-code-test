import { Restaurant } from '../types'
import { getPriceRange, getRestaurantOpenStatus } from '../lib/api'
import RestaurantGrid from './RestaurantGrid'

interface RestaurantsProps {
    restaurants: {
        restaurants: Restaurant[]
    }
}

export default async function RestaurantDataFetcher({ restaurants }: RestaurantsProps) {
    const restaurantsWithStatus = await Promise.all(
        restaurants.restaurants.map(async (restaurant) => {
            try {
                const [status, priceRange] = await Promise.all([
                    getRestaurantOpenStatus(restaurant.id),
                    getPriceRange(restaurant.price_range_id)
                ])
                return { ...restaurant, status, priceRange }
            } catch (error) {
                console.error(`Error fetching status for ${restaurant.name}:`, error)
                return { ...restaurant, status: { is_open: null }, priceRange: { range: null } }
            }
        })
    )

    return <RestaurantGrid restaurants={restaurantsWithStatus} />
}