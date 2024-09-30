'use client'

import { Filter } from '../types'
import FilterChip from "@/app/utils/FilterChip";
import {useFilter} from "@/app/contexts/FilterContext";

interface FilterSidebarProps {
    filters: {
        filters: Filter[]
    }
}

export default function FilterSidebar({ filters }: FilterSidebarProps) {
    const {
        selectedCategories,
        selectedDeliveryTimes,
        selectedPriceRanges,
        toggleCategory,
        toggleDeliveryTime,
        togglePriceRange
    } = useFilter()

    return (
        <div>
            {/* Mobile view: show only delivery time */}
            <div className="md:hidden">
                <h3 className="text-sm font-medium text-gray-500 mb-2">DELIVERY TIME</h3>
                <ul className="space-y-2">
                    {['0-10 min', '10-30 min', '30-60 min', '1 hour+'].map((time) => (
                        <FilterChip
                            key={time}
                            label={time}
                            isSelected={selectedDeliveryTimes.includes(time)}
                            onClick={() => toggleDeliveryTime(time)}
                        />
                    ))}
                </ul>
            </div>

            {/* Desktop view: show all filters */}
            <div className="bg-white shadow rounded-lg p-4 hidden md:block" style={{ width: '239px'}}>
                <h2 className="text-xl mb-4">Filter</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">FOOD CATEGORY</h3>
                        <div className="space-y-2 mb-2">
                            {filters.filters.map(filter => (
                                <FilterChip
                                    key={filter.id}
                                    label={filter.name}
                                    isSelected={selectedCategories.includes(filter.id)}
                                    onClick={() => toggleCategory(filter.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">DELIVERY TIME</h3>
                        <ul className="space-y-2 mb-2">
                            {['0-10 min', '10-30 min', '30-60 min', '1 hour+'].map((time) => (
                                <FilterChip
                                    key={time}
                                    label={time}
                                    isSelected={selectedDeliveryTimes.includes(time)}
                                    onClick={() => toggleDeliveryTime(time)}
                                />
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">PRICE RANGE</h3>
                        <div className="space-x-2 mb-2">
                            {['$', '$$', '$$$', '$$$$'].map((price) => (
                                <FilterChip
                                    key={price}
                                    label={price}
                                    isSelected={selectedPriceRanges.includes(price)}
                                    onClick={() => togglePriceRange(price)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
