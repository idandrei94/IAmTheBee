/*
  Warnings:

  - The primary key for the `UserComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserComment` table. All the data in the column will be lost.
  - The primary key for the `UserMovieFollow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserMovieFollow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserComment" DROP CONSTRAINT "UserComment_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserComment_pkey" PRIMARY KEY ("userId", "movieId");

-- AlterTable
ALTER TABLE "UserMovieFollow" DROP CONSTRAINT "UserMovieFollow_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserMovieFollow_pkey" PRIMARY KEY ("userId", "movieId");

-- CreateTable
CREATE TABLE "UserRating" (
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("userId","movieId")
);

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
