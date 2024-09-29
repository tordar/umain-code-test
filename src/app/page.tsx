import Logo from './utils/Logo'
import FilterSidebar from './components/FilterSidebar'
import FoodCategories from './components/FoodCategories'
import RestaurantGrid from './components/RestaurantGrid'
import {getAllRestaurants, getAllFilters, getRestaurantOpenStatus} from './lib/api'


export default async function Dashboard() {
    const [restaurants, filters, restaurantOpen] = await Promise.all([
        getAllRestaurants(),
        getAllFilters(),
        //getRestaurantOpenStatus()
    ]);
//console.log(restaurants)
  return (
      <div className="min-h-screen">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Logo />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64">
              <FilterSidebar filters={filters}/>
            </aside>
            <div className="flex-grow min-w-0">
              <FoodCategories filters={filters}/>
              <h2 className="text-2xl mt-8 mb-4">Restaurant's</h2>
              <RestaurantGrid restaurants={restaurants}/>
            </div>
          </div>
        </main>
      </div>
  )
}

