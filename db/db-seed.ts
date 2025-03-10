import { PrismaClient } from '@prisma/client';
import { movies } from '@/db/db-sample';



async function main() {
  const prisma = new PrismaClient();

  await prisma.userRating.deleteMany();
  await prisma.userComment.deleteMany();
  await prisma.userMovieFollow.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();

  if (await prisma.movie.count() === 0) {
    const data = movies.map(m => ({ ...m, comments: undefined, rating: undefined }));
    await prisma.movie.createMany({ data });
  }

  const data = await prisma.movie.findMany();

  const res = await prisma.role.create({
    data:
      { name: 'admin' }

  });
  await prisma.userRole.create({
    data: {
      userId: 'idandrei94@gmail.com',
      roleId: res.name
    }
  });

  for (let i = 0; i < 50; i++) {
    const email = `user${i.toFixed().padStart(3, '0')}@google.com`;
    const movieIds = movies.map(m => m.id).sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * Math.floor(data.length / 2) + 1));

    await prisma.userRating.createMany({
      data: movieIds.map(id => ({ userId: email, movieId: id, rating: Math.floor(Math.random() * 5) + 1 }))
    });
  }

  console.log('Movies Db seed successfull');
}

main();