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
  nome: z.string().min(10,
    { message: "Modelo deve possuir, no mínimo, 10 caracteres" }),

})

router.get("/", async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany({
      include: { 
        marcaCarros: true,
        
      }
    })
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
    const carro = await prisma.marca.create({
      data: {nome}
    })
    res.status(201).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const bebe = await prisma.marca.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(bebe)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})



export default router
