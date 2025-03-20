'use client'
import { CardVeiculo } from "@/components/CardVeiculo";
import { InputPesquisa } from "@/components/InputPesquisa";
import Link from "next/link";
import { carroif } from "@/marcaif/carroif";
import { useEffect, useState } from "react";

export default function Home() {

  const [carros, setCarros] = useState<carroif[]>([])
  
  useEffect(() =>{
    async function buscaDados(){
      const response = await fetch('http://localhost:3000/api/carros');
      const data = await response.json();
      setCarros(data)
    }
  })
  return (
    <>
      <InputPesquisa />
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Veículos <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span></h1>

      <div className="flex gap-4">
        <CardVeiculo />
        <CardVeiculo />
        <CardVeiculo />
      </div>

    </>
  );
}
