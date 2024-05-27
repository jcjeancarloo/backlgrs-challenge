/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetSexType" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "sex" "PetSexType" NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
