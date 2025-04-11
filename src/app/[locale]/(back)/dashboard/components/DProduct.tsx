'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import AddProductForm from './product/AddProductForm'

const DProduct = () => {
    return (
        <div className='p-4'>
            <Button>เพิ่มสินค้า</Button>
            <AddProductForm />
        </div>
    )
}

export default DProduct