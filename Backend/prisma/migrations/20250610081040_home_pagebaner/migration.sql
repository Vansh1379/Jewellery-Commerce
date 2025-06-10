/*
  Warnings:

  - You are about to drop the column `Banner` on the `HomePage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutPage" ALTER COLUMN "description2" DROP NOT NULL,
ALTER COLUMN "description3" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HomePage" DROP COLUMN "Banner",
ADD COLUMN     "banner1" TEXT,
ADD COLUMN     "banner2" TEXT;
