/*
  Warnings:

  - Added the required column `img` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "catageory" TEXT,
ADD COLUMN     "img" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
