import { FotoItf } from "./FotoItf"
import { MarcaItf } from "./MarcaItf"

export interface CarroItf {
    id: number
    modelo: string
    ano: number
    preco: number
    km: number
    destaque: boolean
    foto: string
    acessorios: string
    createdAt: Date
    updatedAt: Date
    combustivel: string
    marcaId: number
    marca: MarcaItf
    fotos: FotoItf[]
}