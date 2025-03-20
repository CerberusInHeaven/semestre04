import express from 'express'
import routesCarros from './routes/carros'
import routesMarcas from './routes/marcas'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/Carros", routesCarros)
app.use("/Marcas", routesMarcas)

app.get('/', (req, res) => {
  res.send('API: Berçário (cadastro de Mães, Médicos e Bebês)')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})