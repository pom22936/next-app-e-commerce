'use client'

import { useCartStore } from '@/lib/card-store'
import React, { useEffect, useState } from 'react'

const AppCardTotal = () => {
    const total = useCartStore((state) => state.totalItems())
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    // ป้องกัน error mismatch
    if (!isMounted) return null;

    return <span className='text-sm'>{total}</span>
}

export default AppCardTotal