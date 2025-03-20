-- CreateEnum
CREATE TYPE "combustiveis" AS ENUM ('FLEX', 'GASOLINA', 'ALCOOL', 'DIESEL', 'ELETRICO', 'HIBRIDO');

-- CreateTable
CREATE TABLE "Marcas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,

    CONSTRAINT "Marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carro" (
    "id" SERIAL NOT NULL,
    "modelo" VARCHAR(30) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "km" INTEGER NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "foto" TEXT NOT NULL,
    "acessorios" TEXT,
    "combustivel" "combustiveis" NOT NULL DEFAULT 'FLEX',

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarcaCarro" (
    "id" SERIAL NOT NULL,
    "marcaId" INTEGER NOT NULL,
    "carroId" INTEGER NOT NULL,

    CONSTRAINT "MarcaCarro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarcaCarro_marcaId_carroId_key" ON "MarcaCarro"("marcaId", "carroId");

-- AddForeignKey
ALTER TABLE "MarcaCarro" ADD CONSTRAINT "MarcaCarro_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcaCarro" ADD CONSTRAINT "MarcaCarro_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "Carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
