import { z } from 'zod'

export const MagicItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  rarity: z.enum(['COMMON', 'UNCOMMON', 'RARE', 'VERY_RARE', 'LEGENDARY']),
  powerLevel: z.number().int().min(1).max(10),
  price: z.number().min(0).optional(),
  categoryIds: z.array(z.number()).optional(),
})

export const MagicItemCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
})

export const SearchSchema = z.object({
  query: z.string().min(1).max(100),
  rarity: z.enum(['COMMON', 'UNCOMMON', 'RARE', 'VERY_RARE', 'LEGENDARY']).optional(),
  minPower: z.number().int().min(1).max(10).optional(),
  maxPower: z.number().int().min(1).max(10).optional(),
})