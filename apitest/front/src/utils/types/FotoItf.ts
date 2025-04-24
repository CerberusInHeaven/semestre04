import { CarroItf } from "./CarroItf"

export interface FotoItf {
    id: number
    descricao: string
    carroId: number
    url: string
    carro: CarroItf
}