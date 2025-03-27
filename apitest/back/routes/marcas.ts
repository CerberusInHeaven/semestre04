import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// })

// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

const router = Router()

const marcaSchema = z.object({
  nome: z.string().min(3,
    { message: "Modelo deve possuir, no mínimo, 3 caracteres" })
})

router.get("/", async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany()
    res.status(200).json(marcas)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = marcaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome } = valida.data

  try {
    const marca = await prisma.marca.create({
      data: { nome }
    })
    res.status(201).json(marca)
  } catch (error) {
    res.status(400).json({ error })
  }
})
/*
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const bebe = await prisma.bebe.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(bebe)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = bebeSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const bebe = await prisma.bebe.update({
      where: { id: Number(id) },
      data: {...valida.data,
        datanasc: valida.data.datanasc + "T00:00:00Z"}
    })
    res.status(200).json(bebe)
  } catch (error) {
    res.status(400).json({ error })
  }
})
*/
export default router
