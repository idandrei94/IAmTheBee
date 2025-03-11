'use server';
import { CreateFormState, ReadMovieViewModel } from '@/models/movie';
// Since we're using the WebSocket adapter, we don't directly use PrismaClient
// Instead we use our own custom instance
import { prisma } from '@/db/prisma';
import { validMovieId, validRating } from '@/models/movie/validators';
import { getUserEmail } from '../utils';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { auth } from '@/auth/auth';
import { z } from 'zod';
import { createMovieSchema } from '@/models/movie/validators';
import { isAdmin } from './user.actions';
import { redirect } from 'next/navigation';

// Get the Movie list from Db and map to ReadViewModel
// This is horribly inefficient, but it's just a demo
// In a real-world scenario, we would do some join/count sorcery in the DB, add paging, sorting
// We should also add some separate functions for trending, new movies, etc, but for now 
// Just get all and sort it out on the client side
export const getMovies: () => Promise<(ReadMovieViewModel & { isMovieFollowed: boolean; })[]> = async () => {
  const session = await auth();

  const movies: (ReadMovieViewModel & { isMovieFollowed: boolean; })[] = (await prisma.movie.findMany({
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
      },
      UserMovieFollow: {
        select: {
          userId: true
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
      comments: m.UserComment?.length || 0,
      isMovieFollowed: m.UserMovieFollow.some(f => !!session?.user?.email && f.userId === session.user.email)
    }));
  return movies;
};

// Pretty much the same as get all, just with a single id
export const getMovieById: (id: string) => Promise<(ReadMovieViewModel & { isMovieFollowed: boolean; }) | null> = async (id) => {
  const session = await auth();

  const { success, data: validatedId } = validMovieId.safeParse(id);
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
    const movieViewModel: ReadMovieViewModel & { isMovieFollowed: boolean; } = {
      comments: movie.UserComment.length,
      description: movie.description,
      id: movie.id,
      poster_path: movie.poster_path,
      rating: movie.UserRating.length ? movie.UserRating.reduce((acc, r) => acc + r.rating, 0) / movie.UserRating.length : 0,
      release_date: movie.release_date,
      title: movie.title,
      isMovieFollowed: movie.UserMovieFollow.some(f => !!session?.user?.email && f.userId === session.user.email)
    };
    return movieViewModel;
  }
};

// Find out what movies a user follows
export const getUserFollows: () => Promise<number[]> = async () => {
  const email = await getUserEmail();
  if (!email) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("Unauthorized: ", email);
    return [];
  }

  const movies = await prisma.userMovieFollow.findMany({ where: { userId: email } });

  return movies.map(m => m.movieId);
};

// Allow a user to follow a movie. It's a many-to-many between users and movies.
export const followMovie: (movieId: string, follow: boolean) => Promise<{ ok: boolean, message?: string; }> = async (movieId, follow) => {
  // Check if the user is authorized
  const email = await getUserEmail();
  if (!email) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("Unauthorized: ", email);
    // I like to do something with a status code list, or a discriminated union of errors, I'll just handle the message contents
    return { ok: false, message: 'You must login first.' };
  }
  // Validate the movieId
  const { success, data: validatedId } = validMovieId.safeParse(movieId);
  if (!success) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("bad request", movieId);
    return { ok: false, message: `Invalid Movie Id: ${movieId}` };
  }

  if (follow) {
    try {
      await prisma.userMovieFollow.create({
        data: {
          movieId: parseInt(validatedId),
          userId: email,
          unseenCount: 0
        }
      });
    } catch (ex) {
      // For simplicity, if you're already following the movie, I guess success?
      if (ex instanceof Prisma.PrismaClientKnownRequestError && ex.code !== 'P2002') {
        return { ok: false, message: `Db error.` };
      }
    }
  } else {
    await prisma.userMovieFollow.deleteMany({
      where: {
        movieId: parseInt(validatedId),
        userId: email
      }
    });
  }

  {/*
    https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    */}
  revalidatePath(`/`, 'layout');
  revalidatePath(`/admin`, 'page');
  revalidatePath(`/movie/following`, 'layout');
  revalidatePath(`/movie/${movieId}`, 'layout');

  return { ok: true, message: `You ${follow ? 'followed' : 'unfollowed'} the movie.` };
};

// Similar to following a movie, but for rating.
export const rateMovie: (movieId: string, rating: number) => Promise<{ ok: boolean, message?: string; }> = async (movieId, rating) => {
  // Check if the user is authorized
  const email = await getUserEmail();
  if (!email) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("Unauthorized: ", email);
    // I like to do something with a status code list, or a discriminated union of errors, I'll just handle the message contents
    return { ok: false, message: 'You must login first.' };
  }
  // Validate the movieId
  const { success, data: validatedId } = validMovieId.safeParse(movieId);
  if (!success) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("bad request", movieId);
    return { ok: false, message: `Invalid Movie Id: ${movieId}` };
  }

  const { success: ratingSuccess, data: validatedRating } = validRating.safeParse(rating);
  if (!ratingSuccess) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("bad request", rating);
    return { ok: false, message: `Invalid Rating: ${movieId}` };
  }
  // Update or Insert if missing
  await prisma.userRating.upsert({
    where: {
      userId_movieId: {
        userId: email,
        movieId: parseInt(validatedId)
      }
    },
    update: {
      rating: validatedRating
    },
    create: {
      userId: email,
      movieId: parseInt(validatedId),
      rating: validatedRating
    }
  });
  revalidatePath(`/`, 'page');
  revalidatePath(`/admin`, 'page');
  revalidatePath(`/movie/following`, 'page');
  revalidatePath(`/movie/${movieId}`, 'page');
  return { ok: true, message: `Thank you for your ${rating} star${rating !== 1 ? 's' : ''} rating!.` };
};

// Getting your specific rating for a movie, instead of the movie's average
export const getYourRating: (movieId: string) => Promise<number> = async (movieId) => {
  const email = await getUserEmail();
  if (!email) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("Unauthorized: ", email);
    // I like to do something with a status code list, or a discriminated union of errors, I'll just handle the message contents
    return 0;
  }
  const { success, data: validatedId } = validMovieId.safeParse(movieId);
  if (!success) {
    // Maybe throw some custom error, but I'll just redirect to Not Found
    console.log("bad request", movieId);
    return 0;
  }

  const rating = await prisma.userRating.findUnique({
    where: {
      userId_movieId: {
        userId: email,
        movieId: parseInt(validatedId)
      }
    },
    select: {
      rating: true
    }
  });

  return rating?.rating || 0;
};

// Admin movie creation, with file uploads
export const createMovie: (state: CreateFormState, formData: FormData) => Promise<CreateFormState> = async (state, formData) => {
  const { success, data, error } = createMovieSchema.safeParse({
    id: formData.get('id'),
    release_date: formData.get('release_date'),
    description: formData.get('description'),
    title: formData.get('title'),
    poster_path: formData.get('poster_path')
  } satisfies Record<keyof z.infer<typeof createMovieSchema>, FormDataEntryValue | null>);
  // using the zod schema as a baseline for validation messages
  if (!success) {
    if (!error) {
      return {
        other: "Unknown error."
      };
    } else {
      console.log(Object.fromEntries(error.issues.map(i => [i.path[0], i.message])));
      return Object.fromEntries(error.issues.map(i => [i.path[0], i.message]));
    }
  }

  await prisma.movie.create({
    data: {
      description: data.description,
      poster_path: data.poster_path,
      release_date: new Date(data.release_date),
      title: data.title
    }
  });
  return redirect('/admin');
};

export const deleteMovie: (movieId: string) => Promise<void> = async (movieId) => {
  const { success, data: validatedId } = validMovieId.safeParse(movieId);
  if (!success || !isAdmin()) {
    return;
  }
  const id = parseInt(validatedId);

  // first gotta clean up all the movie data

  await prisma.userComment.deleteMany({
    where: {
      movieId: id
    }
  });
  await prisma.userMovieFollow.deleteMany({
    where: {
      movieId: id
    }
  });
  await prisma.userRating.deleteMany({
    where: {
      movieId: id
    }
  });
  await prisma.movie.delete({
    where: {
      id
    }
  });

  // I would also clean the poster image up from upload thing, they have an api and it's easy
  // But it was inconvenient while working on this so I left them in

  revalidatePath(`/`, 'page');
  revalidatePath(`/admin`, 'page');
  revalidatePath(`/movie/following`, 'page');
  revalidatePath(`/movie/${movieId}`, 'page');
};