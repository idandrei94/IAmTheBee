import { PrismaClient } from '@prisma/client';
import { movies } from '@/db/db-sample';



async function main() {
  const prisma = new PrismaClient();

  await prisma.userRating.deleteMany();
  await prisma.userComment.deleteMany();
  await prisma.userMovieFollow.deleteMany();
  await prisma.movie.deleteMany();
  const url = 'https://api.uploadthing.com/v6/listFiles';
  const options = {
    method: 'POST',
    headers: { 'x-uploadthing-api-key': `${process.env.UPLOADTHING_SECRET}`, 'content-type': 'application/json' },
    body: JSON.stringify({})
  };
  const response = await fetch(url, options);
  const imageData = (await response.json() as { files: { name: string, key: string; }[]; }).files;

  if (await prisma.movie.count() === 0) {
    const data = movies.map(m => ({ ...m, comments: undefined, rating: undefined, poster_path: `https://${process.env.UPLOADTHING_APPID}.ufs.sh/f/${imageData.find(i => i.name === m.poster_path)?.key}` }));
    await prisma.movie.createMany({ data });
  }

  const data = await prisma.movie.findMany();

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