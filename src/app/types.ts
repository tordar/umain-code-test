export interface Filter {
    id: string
    name: string
    type: 'category' | 'deliveryTime' | 'priceRange'
    image_url: string
}

export interface Restaurant {
    id: string
    name: string
    icon?: string
    deliveryTime: string
}

export interface RestaurantStatus {
    isOpen: boolean
}