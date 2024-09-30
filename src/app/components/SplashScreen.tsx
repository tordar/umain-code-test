'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../utils/Logo'

export default function SplashScreen() {
    const router = useRouter()
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const hasSeenSplash = localStorage.getItem('hasSeenSplash')
        if (hasSeenSplash) {
            setShowSplash(false)
        }
    }, [])

    const handleContinue = () => {
        localStorage.setItem('hasSeenSplash', 'true')
        setShowSplash(false)
    }

    if (!showSplash) {
        return null
    }

    return (
        <div className="md:hidden fixed z-50 inset-0 bg-[#00703A] flex flex-col items-center justify-between p-8 text-white">
            <div className="w-full">
                <Logo />
            </div>
            <div>
                <h1 className="mb-4" style={{
                    width: '246px',
                    fontWeight: '760',
                    fontSize: '48px',
                    lineHeight: '48px',
                    letterSpacing: '-1px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                }}>Treat yourself.</h1>
                <p style={{
                    width: '246px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '-0.5px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                }}>
                    Find the best restaurants in your city and get it delivered to your place!
                </p>
            </div>
            <button
                onClick={handleContinue}
                className="w-full py-4 bg-[#00703A]  text-white text-xl font-semibold"
                style={{
                    width: '327px',
                    fontWeight: '400',
                    borderRadius: '8px',
                    border: '1px solid white'
                }}
            >
                Continue
            </button>
        </div>
    )
}