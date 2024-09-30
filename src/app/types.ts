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
    filter_ids: [string]
    image_url: string
    delivery_time_minutes: number
    price_range_id: string
    status?: {
        is_open: boolean | null
    }
}

export interface RestaurantStatus {
    restaurant_id: string;
    is_open: boolean
}