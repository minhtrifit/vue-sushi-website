-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('HOME', 'ABOUT', 'SPECIAL');

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "mainTitle" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "SectionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_type_key" ON "Section"("type");
