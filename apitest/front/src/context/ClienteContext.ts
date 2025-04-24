import { create } from 'zustand'
import { ClienteItf } from '@/utils/types/ClienteItf'

type clienteStore = {
    cliente: ClienteItf
    logaCliente:(clienteLogado:ClienteItf) => void
    deslogaCliente:() => void
}

export const useClienteStore = create<clienteStore>((set) => ({
  cliente: {} as ClienteItf,
  logaCliente: (clienteLogado) => set({cliente: clienteLogado}),
  deslogaCliente: () => set({cliente: {} as ClienteItf})
}))
