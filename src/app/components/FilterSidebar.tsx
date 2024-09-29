import { Filter } from '../types'
import FilterChip from "@/app/utils/FilterChip";

interface FilterSidebarProps {
    filters: {
        filters: Filter[]
    }
}

export default function FilterSidebar( { filters }: FilterSidebarProps) {

    
    // I want to create a filterChip component that can be used for the sidebar. 
    
    // I also want to render the filter dynamically. If small screen, only show the delivery time.
    
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl mb-4">Filter</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">FOOD CATEGORY</h3>
                    <ul className="space-y-2">
                        {filters.filters.map(filter => (
                            <FilterChip key={filter.id} label={filter.name}/>
                        ))}
                    </ul>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">DELIVERY TIME</h3>
                        <ul className="space-y-2">
                            {['0-10 min', '10-30 min', '30-60 min', '1 hour+'].map((time) => (
                                <FilterChip key= {time} label={time}/>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">PRICE RANGE</h3>
                        <div className="flex space-x-2">
                            {['$', '$$', '$$$', '$$$$'].map((price) => (
                                <FilterChip
                                    key={price}
                                    label={price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}