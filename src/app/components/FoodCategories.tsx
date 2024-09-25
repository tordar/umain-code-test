import Image from 'next/image'

const categories = [
    { name: 'Hamburgers', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Pizza', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Taco', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Coffee', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Fries', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Mexican', icon: '/placeholder.svg?height=40&width=40' },
    { name: 'Breakfast', icon: '/placeholder.svg?height=40&width=40' },
]

export default function FoodCategories() {
    return (
        <div className="flex overflow-x-auto space-x-4 py-4">
            {categories.map((category) => (
                <div key={category.name} className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Image src={category.icon} alt={category.name} width={40} height={40} />
                    </div>
                    <span className="text-sm">{category.name}</span>
                </div>
            ))}
        </div>
    )
}