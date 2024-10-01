import Logo from './utils/Logo'
import FilterSidebar from './components/FilterSidebar'
import FoodCategories from './components/FoodCategories'
import { getAllRestaurants, getAllFilters } from './lib/api'
import RestaurantDataFetcher from './components/RestaurantDataFetcher'
import { FilterProvider } from './contexts/FilterContext'
import SplashScreen from './components/SplashScreen'

export default async function Dashboard() {
    const [restaurants, filters] = await Promise.all([
        getAllRestaurants(),
        getAllFilters()
    ]);

    return (
        <FilterProvider>
            <SplashScreen />
            <div className="min-h-screen overflow-x-hidden">
                <header>
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-8">
                        <Logo />
                    </div>
                </header>
                <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
                            <FilterSidebar filters={filters}/>
                        </aside>
                        <div className="flex-grow overflow-x-hidden">
                            <FoodCategories filters={filters}/>
                            <h2 className="text-2xl mt-8 mb-4">Restaurants</h2>
                            <RestaurantDataFetcher restaurants={restaurants} />
                        </div>
                    </div>
                </main>
            </div>
        </FilterProvider>
    )
}