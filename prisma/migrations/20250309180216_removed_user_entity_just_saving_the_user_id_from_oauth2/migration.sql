/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RolesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserComment" DROP CONSTRAINT "UserComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMovieFollow" DROP CONSTRAINT "UserMovieFollow_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_B_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_RolesToUser";
