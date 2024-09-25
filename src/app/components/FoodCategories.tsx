import Image from 'next/image'

const categories = [
    { name: 'Hamburgers', icon: '/assets/burger.png' },
    { name: 'Pizza', icon: '/assets/pizza.png' },
    { name: 'Taco', icon: '/assets/taco.png' },
    { name: 'Coffee', icon: '/assets/coffee.png' },
    { name: 'Fries', icon: '/assets/fries.png' },
    { name: 'Mexican', icon: '/assets/burrito.png' },
    { name: 'Breakfast', icon: '/assets/egg and bacon.png' },
]

export default function FoodCategories() {
    return (
        <div className="w-full overflow-hidden">
            <div className="flex overflow-x-auto space-x-4 py-4 px-4 -mx-4">
                {categories.map((category, index) => (
                    <div
                        key={category.name}
                        className="relative flex-none"
                        style={{
                            boxSizing: 'border-box',
                            width: '160px',
                            height: '80px',
                            background: '#FFFFFF',
                            border: '0.6px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                            borderRadius: '8px',
                            order: index,
                            flexGrow: 0,
                        }}
                    >
            <span
                className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-[-17px]"
                style={{
                    fontFamily: 'SF Pro, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.5px',
                    color: '#000000',
                }}
            >
              {category.name}
            </span>
                        <div className="absolute right-0 top-0">
                            <Image
                                src={category.icon}
                                alt={category.name}
                                width={80}
                                height={80}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}