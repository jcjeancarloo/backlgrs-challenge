/*
  Warnings:

  - Added the required column `breed` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "breed" TEXT NOT NULL,
ALTER COLUMN "isAvailable" SET DEFAULT true;
