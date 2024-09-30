"use client"

import Image from 'next/image'
import { Restaurant } from '../types'
import {getPriceRange, getRestaurantOpenStatus} from '../lib/api'
import { useFilter } from '../contexts/FilterContext'
import { useEffect, useState } from 'react'
//import FilteredRestaurants from './FilteredRestaurants'

interface RestaurantsProps {
    restaurants: {
        restaurants: Restaurant[]
    }
}

export default async function RestaurantGrid( {restaurants }: RestaurantsProps) {
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
                return { ...restaurant, status: { is_open: null }, priceRange: { range: null }  }
            }
        })
    )
    
    return <FilteredRestaurants restaurants={restaurantsWithStatus} />
}
    function FilteredRestaurants({ restaurants }) {
        const { selectedCategories, selectedDeliveryTimes, selectedPriceRanges } = useFilter()
        const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

        useEffect(() => {
            const filtered = restaurants.filter(restaurant => {
                const categoryMatch = selectedCategories.length === 0 || restaurant.filter_ids.some(id => selectedCategories.includes(id))
                const deliveryTimeMatch = selectedDeliveryTimes.length === 0 || selectedDeliveryTimes.some(time => {
                    const [min, max] = time.split('-').map(t => parseInt(t))
                    return restaurant.delivery_time_minutes >= min && restaurant.delivery_time_minutes <= (max || Infinity)
                })
                const priceRangeMatch = selectedPriceRanges.length === 0 || (restaurant.priceRange.range !== null && selectedPriceRanges.includes('$'.repeat(restaurant.priceRange.range.length)))

                return categoryMatch && deliveryTimeMatch && priceRangeMatch
            })

            setFilteredRestaurants(filtered)
        }, [restaurants, selectedCategories, selectedDeliveryTimes, selectedPriceRanges])
    
    // const sortedRestaurants = restaurantsWithStatus.sort((a, b) => {
    //     if (a.status.is_open && !b.status.is_open) return -1;
    //     if (!a.status.is_open && b.status.is_open) return 1;
    //     return 0;
    // });
    
    // Fix button arrow
    // Should all closed restaurants be "Opens tomorrow at 12 pm"?
    // Can I make the sortedRestaurants better somehow?
    // Still need to add price range to the restaurants
    // To sort on category, you need to use the filter_ids in the restaurants - they are the same as filter ID? 
    

    return (
        <div className="flex flex-row flex-wrap items-start content-start p-0 gap-[17px]">
            {filteredRestaurants.map((restaurant, index) => (
                <div
                    key={restaurant.id}
                    className="flex flex-col justify-between items-start p-4 gap-6 w-[327px] h-[202px] bg-white rounded-lg relative overflow-hidden"
                    style={{
                        boxSizing: 'border-box',
                        border: '0.6px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                        isolation: 'isolate',
                        order: index,
                        flexGrow: 0,
                    }}
                >
                    <div className="flex flex-row items-center p-0 gap-2 w-[142px] h-7 z-0">
                        <div
                            className="flex flex-row justify-center items-center py-2 px-[10px] gap-1 w-[63px] h-7 bg-white rounded-[88px]"
                            style={{
                                boxSizing: 'border-box',
                                border: '0.6px solid rgba(0, 0, 0, 0.1)',
                                boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                            }}
                        >
                            <div className={`w-2 h-2 rounded-full ${restaurant.status.is_open ? 'bg-[#00703A]' : 'bg-black'}`}></div>
                            <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                {restaurant.status.is_open ? 'Open' : 'Closed'}
              </span>
                        </div>
                        <div
                            className="flex flex-row justify-center items-center py-2 px-3 gap-2 w-[71px] h-7 bg-white rounded-[88px]"
                            style={{
                                boxSizing: 'border-box',
                                border: '0.6px solid rgba(0, 0, 0, 0.1)',
                                boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                                opacity: restaurant.status.is_open ? 1 : 0
                            }}
                        >
              <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                {restaurant.delivery_time_minutes} min
              </span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-end p-0 gap-[50px] w-[295px] h-8 z-1" style={{ opacity: restaurant.status.is_open ? 1 : 0.2 }}>
                        <h2 className="text-2xl leading-6 tracking-[-0.5px] text-black">{restaurant.name}</h2>
                        <button className="flex justify-center items-center w-8 h-8 bg-[#00703A] rounded-[88px]">
                            -&gt;
                        </button>
                    </div>
                    <div className="absolute w-[140px] h-[140px] left-[217px] top-[-30px] z-2">
                        <Image
                            src={restaurant.image_url}
                            alt={restaurant.name}
                            width={140}
                            height={140}
                            className="object-cover"
                            style={{ opacity: restaurant.status.is_open ? 1 : 0.2 }}
                        />
                    </div>
                    {!restaurant.status.is_open && (
                        <div
                            className="flex flex-row justify-center items-center py-2 px-[10px] gap-1 w-[157px] h-7 bg-[#FAFAFA] rounded-[4px] absolute top-20 right-20"
                            style={{
                                boxSizing: 'border-box',
                                border: '0.6px solid rgba(0, 0, 0, 0.1)',
                                boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                            }}
                        >
                            <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                            Opens tomorrow at 12 pm
                          </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

