import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MagicItemCategorySchema } from '@/lib/validations'

export async function GET() {
  try {
    const categories = await prisma.magicItemCategory.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const categoryData = MagicItemCategorySchema.parse(body)
    
    const newCategory = await prisma.magicItemCategory.create({
      data: categoryData,
    })
    
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}