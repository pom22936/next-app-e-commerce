import conn from "@/db";
import { order } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type NewOrder = typeof order.$inferInsert

export async function POST(request: NextRequest) {
    const body = await request.json() as NewOrder[];
    const db = await conn

    await db.insert(order).values(body)

    return NextResponse.json({ message: "Order created successfully" }, { status: 201 })
}