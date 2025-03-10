/*
  Warnings:

  - The primary key for the `UserComment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserComment" DROP CONSTRAINT "UserComment_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserComment_pkey" PRIMARY KEY ("id");
