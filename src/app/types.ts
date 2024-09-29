export interface Filter {
    id: string
    name: string
    type: 'category' | 'deliveryTime' | 'priceRange'
    image_url: string
}

export interface Restaurant {
    id: string
    name: string
    rating: number
    filterIds: string
    image_url: string
    delivery_time_minutes: string
}

export interface RestaurantStatus {
    restaurant_id: string;
    is_open: boolean
}