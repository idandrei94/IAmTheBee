import { PrismaClient } from '@prisma/client';
import { movies } from '@/db/db-sample';

async function main() {
  const prisma = new PrismaClient();

  await prisma.userRating.deleteMany();
  await prisma.userComment.deleteMany();
  await prisma.userMovieFollow.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.movie.deleteMany();

  const data = movies.map(m => ({ ...m, comments: undefined, rating: undefined }));

  await prisma.movie.createMany({ data });
  await prisma.roles.createMany({
    data: [
      { name: 'admin' }
    ]
  });

  console.log('Movies Db seed successfull');
}

main();