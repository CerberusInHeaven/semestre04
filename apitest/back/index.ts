import express from 'express'
import cors from 'cors'
import routesCarros from './routes/carros'
import routesFotos from './routes/fotos'
import routesClientes from './routes/clientes'
import routesLogin from './routes/login'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use("/carros", routesCarros)
app.use("/fotos", routesFotos)
app.use("/clientes", routesClientes)
app.use("/clientes/login", routesLogin)

app.get('/', (req, res) => {
  res.send('API: Revenda de Veículos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})