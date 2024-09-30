import Logo from './utils/Logo'
import FilterSidebar from './components/FilterSidebar'
import FoodCategories from './components/FoodCategories'
import RestaurantGrid from './components/RestaurantGrid'
import { getAllRestaurants, getAllFilters } from './lib/api'
import { FilterProvider } from './contexts/FilterContext'


export default async function Dashboard() {
    const [restaurants, filters] = await Promise.all([
        getAllRestaurants(),
        getAllFilters()
    ]);
    
    // When you open the page for the first time on mobile, you should be taken to a green welcome screen
    // The logo is still too small
    
  return (
      <FilterProvider>
      <div className="min-h-screen">
        <header>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Logo />
          </div>
        </header>
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64">
              <FilterSidebar filters={filters}/>
            </aside>
            <div className="flex-grow min-w-0">
              <FoodCategories filters={filters}/>
              <h2 className="text-2xl mt-8 mb-4">Restaurants</h2>
              <RestaurantGrid restaurants={restaurants}/>
            </div>
          </div>
        </main>
      </div>
      </FilterProvider>
  )
}

