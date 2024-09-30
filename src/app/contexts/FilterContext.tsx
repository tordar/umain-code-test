'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Filter } from '../types'

interface FilterContextType {
    selectedCategories: string[]
    selectedDeliveryTimes: string[]
    selectedPriceRanges: string[]
    toggleCategory: (id: string) => void
    toggleDeliveryTime: (time: string) => void
    togglePriceRange: (range: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function useFilter() {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider')
    }
    return context
}

export function FilterProvider({ children }: { children: ReactNode }) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<string[]>([])
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const toggleDeliveryTime = (time: string) => {
        setSelectedDeliveryTimes(prev =>
            prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
        )
    }

    const togglePriceRange = (range: string) => {
        setSelectedPriceRanges(prev =>
            prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
        )
    }

    return (
        <FilterContext.Provider value={{
            selectedCategories,
            selectedDeliveryTimes,
            selectedPriceRanges,
            toggleCategory,
            toggleDeliveryTime,
            togglePriceRange
        }}>
            {children}
        </FilterContext.Provider>
    )
}