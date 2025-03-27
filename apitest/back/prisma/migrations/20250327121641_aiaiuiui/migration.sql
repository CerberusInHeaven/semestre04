/*
  Warnings:

  - You are about to drop the `Carro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarcaCarro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marcas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MarcaCarro" DROP CONSTRAINT "MarcaCarro_carroId_fkey";

-- DropForeignKey
ALTER TABLE "MarcaCarro" DROP CONSTRAINT "MarcaCarro_marcaId_fkey";

-- DropTable
DROP TABLE "Carro";

-- DropTable
DROP TABLE "MarcaCarro";

-- DropTable
DROP TABLE "Marcas";

-- DropEnum
DROP TYPE "combustiveis";
