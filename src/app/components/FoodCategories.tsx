'use client'

import Image from 'next/image'
import { Filter } from "@/app/types"
import { useFilter } from "@/app/contexts/FilterContext"

interface FoodCategoriesProps {
    filters: {
        filters: Filter[]
    }
}

export default function FoodCategories({ filters }: FoodCategoriesProps) {
    const { selectedCategories, toggleCategory } = useFilter()

    return (
        <div className="w-full overflow-hidden">
            <div className="flex overflow-x-auto space-x-4 px-4 -mx-4">
                {filters.filters.map(category => (
                    <div
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`relative flex-none cursor-pointer transition-all duration-200 ease-in-out
                            ${selectedCategories.includes(category.id)
                            ? 'bg-[#00703A] text-white'
                            : 'bg-white text-black'
                        }`}
                        style={{
                            boxSizing: 'border-box',
                            width: '160px',
                            height: '80px',
                            border: '0.6px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                            borderRadius: '8px',
                            flexGrow: 0,
                        }}
                    >
                        <span
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-[-17px] z-10
                                ${selectedCategories.includes(category.id) ? 'text-white' : 'text-black'}`}
                            style={{
                                fontFamily: 'SF Pro, sans-serif',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '100%',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            {category.name}
                        </span>
                        <div className="absolute right-0 top-0">
                            <Image
                                src={category.image_url}
                                alt={category.name}
                                width={80}
                                height={80}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        {selectedCategories.includes(category.id) && (
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg z-5"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}