const API_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api';

export async function getAllRestaurants() {
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
    }
    return response.json();
}

export async function getRestaurant(id: string) {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch restaurant with id ${id}`);
    }
    return response.json();
}

export async function getAllFilters() {
    const response = await fetch(`${API_BASE_URL}/filter`);
    if (!response.ok) {
        throw new Error('Failed to fetch filters');
    }
    return response.json();
}

export async function getFilter(id: string) {
    const response = await fetch(`${API_BASE_URL}/filter/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch filter with id ${id}`);
    }
    return response.json();
}

export async function getRestaurantOpenStatus(id: string) {
    const response = await fetch(`${API_BASE_URL}/open/${id}`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch open status for restaurant with id ${id}`);
    }
    return response.json();
}

export async function getPriceRange(id: string) {
    const response = await fetch(`${API_BASE_URL}/price-range/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch price range with id ${id}`);
    }
    return response.json();
}