/*
  Warnings:

  - Added the required column `postedAt` to the `UserComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserComment" ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL;
