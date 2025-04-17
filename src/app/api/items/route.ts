import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MagicItemSchema, SearchSchema } from '@/lib/validations'


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    
    if (searchParams.toString()) {
      const query = searchParams.get('query') || ''
      const rarity = searchParams.get('rarity')
      const minPower = searchParams.get('minPower')
      const maxPower = searchParams.get('maxPower')
      
      const searchData = SearchSchema.parse({
        query,
        rarity: rarity || undefined,
        minPower: minPower ? parseInt(minPower) : undefined,
        maxPower: maxPower ? parseInt(maxPower) : undefined,
      })
      
      const items = await prisma.magicItem.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: searchData.query, mode: 'insensitive' } },
                { description: { contains: searchData.query, mode: 'insensitive' } },
              ],
            },
            searchData.rarity ? { rarity: searchData.rarity } : {},
            searchData.minPower ? { powerLevel: { gte: searchData.minPower } } : {},
            searchData.maxPower ? { powerLevel: { lte: searchData.maxPower } } : {},
          ],
        },
        include: {
          categories: true,
        },
      })
      
      return NextResponse.json(items)
    }
    
   
    const items = await prisma.magicItem.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json()
    const itemData = MagicItemSchema.parse(body)
    
    const newItem = await prisma.magicItem.create({
      data: {
        name: itemData.name,
        description: itemData.description,
        rarity: itemData.rarity,
        powerLevel: itemData.powerLevel,
        price: itemData.price,
        categories: {
          connect: itemData.categoryIds?.map(id => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    })
    
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const itemData = MagicItemSchema.parse(body)
    
    if (!itemData.id) {
      return NextResponse.json(
        { error: 'Item ID is required for update' },
        { status: 400 }
      )
    }
    
    const updatedItem = await prisma.magicItem.update({
      where: { id: itemData.id },
      data: {
        name: itemData.name,
        description: itemData.description,
        rarity: itemData.rarity,
        powerLevel: itemData.powerLevel,
        price: itemData.price,
        categories: {
          set: itemData.categoryIds?.map(id => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    })
    
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }
    
    await prisma.magicItem.delete({
      where: { id: parseInt(id) },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}