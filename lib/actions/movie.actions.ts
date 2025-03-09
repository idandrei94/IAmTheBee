'use server';
import { ReadMovieViewModel } from '@/models/movie';
// Since we're using the WebSocket adapter, we don't directly use PrismaClient
// Instead we use our own custom instance
import { prisma } from '@/db/prisma';
import { validMovieId } from '@/models/movie/validators';

// Get the Movie list from Db and map to ReadViewModel
// This is horribly inefficient, but it's just a demo
// In a real-world scenario, we would do some join/count sorcery in the DB
// We should also add some separate functions for trending, new movies, etc, but for now 
// Just get all and sort it out on the client side
export const getMovies: () => Promise<ReadMovieViewModel[]> = async () => {
  const movies: ReadMovieViewModel[] = (await prisma.movie.findMany({
    include: {
      UserRating: {
        select: {
          rating: true,
        }
      },
      UserComment: {
        select: {
          movieId: true,
        }
      }
    }
  }))

    // Coming from .NET, I love Automapper
    // Maybe later get around to configuring something like @automapper
    .map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      release_date: m.release_date,
      poster_path: m.poster_path,
      rating: m.UserRating?.length ? m.UserRating.reduce((acc, r) => acc + r.rating, 0) / m.UserRating.length : 0,
      comments: m.UserComment?.length || 0
    }));
  return movies;
};

export const getMovieById: (id: string) => Promise<ReadMovieViewModel | null> = async (id) => {
  const { success, data: validatedId } = validMovieId.safeParse(id);
  console.log("Validating Movie ID", id);
  if (!success) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("Bad ID: ", id);
    return null;
  }
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(validatedId) },
    include: {
      UserRating: {
        select: {
          rating: true,
          // To check if the user left a rating
          userId: true
        }
      },
      UserComment: {
        select: {
          comment: true,
          userId: true,
          postedAt: true
        }
      },
      UserMovieFollow: {
        select: {
          userId: true
        }
      }
    }
  });
  if (!movie) {
    return null;
  } else {
    const movieViewModel: ReadMovieViewModel = {
      comments: movie.UserComment.length,
      description: movie.description,
      id: movie.id,
      poster_path: movie.poster_path,
      rating: movie.UserRating.length ? movie.UserRating.reduce((acc, r) => acc + r.rating, 0) / movie.UserRating.length : 0,
      release_date: movie.release_date,
      title: movie.title
    };
    return movieViewModel;
  }
};