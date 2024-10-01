"use client"

import Image from 'next/image'
import { Restaurant } from '../types'
import { useFilter } from '../contexts/FilterContext'
import { useEffect, useState } from 'react'

interface RestaurantGridProps {
    restaurants: Restaurant[]
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
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

        // Sort the filtered restaurants to show closed restaurants at the end
        const sortedRestaurants = filtered.sort((a, b) => {
            if (a.status?.is_open && !b.status?.is_open) return -1
            if (!a.status?.is_open && b.status?.is_open) return 1
            return 0
        })

        setFilteredRestaurants(sortedRestaurants)
    }, [restaurants, selectedCategories, selectedDeliveryTimes, selectedPriceRanges])

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
                            <div className={`w-2 h-2 rounded-full ${restaurant.status?.is_open ? 'bg-[#00703A]' : 'bg-black'}`}></div>
                            <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                                {restaurant.status?.is_open ? 'Open' : 'Closed'}
                            </span>
                        </div>
                        <div
                            className="flex flex-row justify-center items-center py-2 px-3 gap-2 w-[71px] h-7 bg-white rounded-[88px]"
                            style={{
                                boxSizing: 'border-box',
                                border: '0.6px solid rgba(0, 0, 0, 0.1)',
                                boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                                opacity: restaurant.status?.is_open ? 1 : 0
                            }}
                        >
                            <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                                {restaurant.delivery_time_minutes} min
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-end p-0 gap-[50px] w-[295px] h-8 z-1" style={{ opacity: restaurant.status?.is_open ? 1 : 0.2 }}>
                        <h2 className="text-2xl leading-6 tracking-[-0.5px] text-black">{restaurant.name}</h2>
                        <button className="flex justify-center items-center w-8 h-8 bg-[#00703A] rounded-[88px]">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.6836 5C11.6836 5.17708 11.6107 5.33333 11.4648 5.46875L7.43359 9.49219C7.29818 9.6224 7.14453 9.6875 6.97266 9.6875C6.80078 9.6875 6.65495 9.63021 6.53516 9.51562C6.42057 9.40104 6.36328 9.25521 6.36328 9.07812C6.36328 8.99479 6.3763 8.91406 6.40234 8.83594C6.43359 8.75781 6.47786 8.69271 6.53516 8.64062L7.61328 7.52344L10.2539 5.14844L10.3945 5.48438L8.31641 5.63281H0.941406C0.753906 5.63281 0.602865 5.57292 0.488281 5.45312C0.373698 5.33333 0.316406 5.18229 0.316406 5C0.316406 4.81771 0.373698 4.66667 0.488281 4.54688C0.602865 4.42708 0.753906 4.36719 0.941406 4.36719H8.31641L10.3945 4.51562L10.2539 4.85938L7.61328 2.47656L6.53516 1.35938C6.47786 1.30729 6.43359 1.24219 6.40234 1.16406C6.3763 1.08594 6.36328 1.00521 6.36328 0.921875C6.36328 0.744792 6.42057 0.598958 6.53516 0.484375C6.65495 0.369792 6.80078 0.3125 6.97266 0.3125C7.14453 0.3125 7.29818 0.377604 7.43359 0.507812L11.4648 4.53125C11.6107 4.66667 11.6836 4.82292 11.6836 5Z"
                                    fill="white"/>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute w-[140px] h-[140px] left-[217px] top-[-30px] z-2">
                        <Image
                            src={restaurant.image_url}
                            alt={restaurant.name}
                            width={140}
                            height={140}
                            className="object-cover"
                            style={{ opacity: restaurant.status?.is_open ? 1 : 0.2 }}
                        />
                    </div>
                    {!restaurant.status?.is_open && (
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