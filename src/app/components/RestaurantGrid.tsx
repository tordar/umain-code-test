import Image from 'next/image'
import { Restaurant } from '../types'
import { getRestaurantOpenStatus } from '../lib/api'

interface RestaurantsProps {
    restaurants: {
        restaurants: Restaurant[]
    }
}

export default async function RestaurantGrid( {restaurants }: RestaurantsProps) {
    const restaurantsWithStatus = await Promise.all(
        restaurants.restaurants.map(async (restaurant) => {
            try {
                const status = await getRestaurantOpenStatus(restaurant.id)
                return { ...restaurant, status }
            } catch (error) {
                console.error(`Error fetching status for ${restaurant.name}:`, error)
                return { ...restaurant, status: { is_open: null } }
            }
        })
    )
    

    return (
        <div className="flex flex-row flex-wrap items-start content-start p-0 gap-[17px]">
            {restaurantsWithStatus.map((restaurant, index) => (
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
                            }}
                        >
              <span className="text-xs leading-3 tracking-[-0.5px] text-black">
                {restaurant.delivery_time_minutes} min
              </span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-end p-0 gap-[50px] w-[295px] h-8 z-1">
                        <h2 className="text-2xl leading-6 tracking-[-0.5px] text-black">{restaurant.name}</h2>
                        <button className="flex justify-center items-center w-8 h-8 bg-[#00703A] rounded-[88px]">
                            >
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

