import { MarcaItf } from "./MarcaItf"

export interface CarroItf {
    id: number
    modelo: string
    ano: number
    preco: number
    km: number
    acessorios: string
    destaque: boolean
    foto: string
    createdAt: Date
    updatedAt: Date
    marcaId: number
    marca: MarcaItf
    combustivel: string
}