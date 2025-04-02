import 'server-only'

import conn from '@/db'
import { desc, eq } from 'drizzle-orm'
import { product } from '@/db/schema'

const db = await conn

export async function getProductService() {
    return await db.query.product.findMany({
        orderBy: desc(product.id), // select * from product order by desc
        with: {
            productImages: true
        }
    }) 
}

export async function getProductByIdService(id: number) {
    return await db.query.product.findMany({
        where: eq(product.id, id),
        orderBy: desc(product.id), // select * from product order by desc
        with: {
            productImages: true
        }
    }) 
}