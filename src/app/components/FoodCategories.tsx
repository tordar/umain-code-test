'use client'

import Image from 'next/image'
import {Filter} from "@/app/types";
import { useFilter } from "@/app/contexts/FilterContext"

interface FoodCategoriesProps {
    filters: {
        filters: Filter[]
    }
}

export default function FoodCategories({ filters }: FoodCategoriesProps) {
    const { selectedCategories, toggleCategory } = useFilter()
    console.log(selectedCategories)
    
    return (
        <div className="w-full overflow-hidden">
            <div className="flex overflow-x-auto space-x-4 px-4 -mx-4">
                {filters.filters.map(category => (
                    <div
                        key={category.name}
                        
                        style={{
                            boxSizing: 'border-box',
                            width: '160px',
                            height: '80px',
                            background: '#FFFFFF',
                            border: '0.6px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                            borderRadius: '8px',
                            //order: index,
                            flexGrow: 0,
                        }}
                        onClick={() => toggleCategory(category.id)}
                        className={`relative flex-none cursor-pointer ${
                            selectedCategories.includes(category.id) ? 'text-amber-50' : ''
                        }`}
                    >
            <span
               
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-[-17px] ${
                    selectedCategories.includes(category.id) ? 'cursor-cell' : ''
                }`}
                style={{
                    fontFamily: 'SF Pro, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.5px',
                    color: '#000000',
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
                    </div>
                ))}
            </div>
        </div>
    )
}