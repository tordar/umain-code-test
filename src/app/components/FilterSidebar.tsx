import { Filter } from '../types'

interface FilterSidebarProps {
    filters: Filter[]
}

export default function FilterSidebar( { filters }: FilterSideBarProps) {

    const categoryFilters = filters.filters.map(f => f.name)
    //const deliveryTimeFilters = filters.filter(f => f.type === 'deliveryTime')
    //const priceRangeFilters = filters.filter(f => f.type === 'priceRange')
    
    //console.log(categoryFilters)
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">FOOD CATEGORY</h3>
                    <ul className="space-y-2">
                        {filters.filters.map(filter => (
                            <li key={filter.id}>
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                                    <span className="ml-2">{filter.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">DELIVERY TIME</h3>
                        <ul className="space-y-2">
                            {['0-10 min', '10-30 min', '30-60 min', '1 hour+'].map((time) => (
                                <li key={time}>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                                        <span className="ml-2">{time}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">PRICE RANGE</h3>
                        <div className="flex space-x-2">
                            {['$', '$$', '$$$', '$$$$'].map((price) => (
                                <button
                                    key={price}
                                    className="px-2 py-1 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {price}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}