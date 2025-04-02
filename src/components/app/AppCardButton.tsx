/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/card-store'

const AppCardButton = ({product}: any) => {
    const addItem = useCartStore((state) => state.addItem)
    const handleAdd = () => {
        addItem({
            productId: product.id,
            title: product.title,
            price: product.price,
            qty: 1
        })
    }

    return (
        <Button className='mt-10' onClick={handleAdd}>
            <ShoppingCart /> เพิ่มลงในตะกล้า
        </Button>
    )
}

export default AppCardButton