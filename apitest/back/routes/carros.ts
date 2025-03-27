import { Combustiveis, PrismaClient } from '@prisma/client'
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

const carroSchema = z.object({
  modelo: z.string().min(2,
    { message: "Modelo deve possuir, no mínimo, 2 caracteres" }),
  ano: z.number(),
  preco: z.number(),
  km: z.number(),
  destaque: z.boolean().optional(),
  foto: z.string(),
  combustivel: z.nativeEnum(Combustiveis),  
  acessorios: z.string().nullable().optional(),
  marcaId: z.number(),
})

router.get("/", async (req, res) => {
  try {
    const carros = await prisma.carro.findMany({
      include: { 
        marca: true,
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = carroSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { modelo, ano, preco, km, destaque = true, 
          foto, acessorios = null, combustivel = 'FLEX',
          marcaId } = valida.data

  try {
    const carro = await prisma.carro.create({
      data: { modelo, ano, preco, km, destaque, 
        foto, acessorios, combustivel, marcaId }
    })
    res.status(201).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const bebe = await prisma.carro.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(bebe)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = carroSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }
    

  const { modelo, ano, preco, km, destaque = true, 
    foto, acessorios = null, combustivel = 'FLEX',
    marcaId } = valida.data

  try {
    const carro = await prisma.carro.update({
      where: { id: Number(id) },
      data: {  modelo, ano, preco, km, destaque , 
        foto, acessorios , combustivel ,
        marcaId}
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})


router.get("/pesquisa/:termo", async (req, res) => {
  const {termo} = req.params

  //converte em numero ???? 
  const termonumero = Number(termo)
  // é textuuu
  if(isNaN(termonumero)){

  try {
    const carros = await prisma.carro.findMany({
      include: { 
        marca: true,
      },
      where: {
        OR: [
          {modelo: {contains: termo} },
          {marca: {nome: termo} }
        ]
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
} else {

  try {
    const carros = await prisma.carro.findMany({
      include: { 
        marca: true,
      },
      where: {
        OR: [
          {preco: {lte: termonumero} },
          {ano: termonumero }
        ]
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(500).json({ erro: error })
  }

}
})


export default router
