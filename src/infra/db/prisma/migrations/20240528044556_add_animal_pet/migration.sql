/*
  Warnings:

  - Added the required column `animal` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('dog', 'cat');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animal" "AnimalType" NOT NULL;
