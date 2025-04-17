-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'VERY_RARE', 'LEGENDARY');

-- CreateTable
CREATE TABLE "MagicItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "powerLevel" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItemCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MagicItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MagicItemToMagicItemCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MagicItemToMagicItemCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MagicItem_name_key" ON "MagicItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MagicItemCategory_name_key" ON "MagicItemCategory"("name");

-- CreateIndex
CREATE INDEX "_MagicItemToMagicItemCategory_B_index" ON "_MagicItemToMagicItemCategory"("B");

-- AddForeignKey
ALTER TABLE "_MagicItemToMagicItemCategory" ADD CONSTRAINT "_MagicItemToMagicItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "MagicItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MagicItemToMagicItemCategory" ADD CONSTRAINT "_MagicItemToMagicItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "MagicItemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
