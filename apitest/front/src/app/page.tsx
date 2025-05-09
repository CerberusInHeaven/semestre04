'use client'
import { CardVeiculo } from "@/components/CardVeiculo";
import { InputPesquisa } from "@/components/InputPesquisa";
import { CarroItf } from "@/utils/types/CarroItf";
import { useEffect, useState } from "react";

export default function Home() {
  const [carros, setCarros] = useState<CarroItf[]>([])

  // useEffect (efeito colateral): executa algo quando o componente
  // é renderizado (no caso, quando [])
  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros`)
      const dados = await response.json()
      // console.log(dados)
      setCarros(dados)
    }
    buscaDados()
  }, [])

  const listaCarros = carros.map( carro => (
    <CardVeiculo data={carro} key={carro.id} />
  ))

  return (
    <>
      <InputPesquisa setCarros={setCarros} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Veículos <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaCarros}
        </div>
      </div>
    </>
  );
}
