"use server";
import { auth } from '@/auth/auth';
import { prisma } from '@/db/prisma';
import { UserCommentViewModel } from '@/models/comment';
import { isValidCommentId, postCommentSchema } from '@/models/comment/validators';
import { validMovieId } from '@/models/movie/validators';
import { revalidatePath } from 'next/cache';
import { number, z } from 'zod';
import { isAdmin } from './user.actions';

export const getMovieComments: (movieId: string) => Promise<UserCommentViewModel[]> = async (movieId) => {
  var { success } = validMovieId.safeParse(movieId);
  if (!success) {
    return [];
  }
  const results: UserCommentViewModel[] = (await prisma.userComment.findMany({
    where: {
      movieId: parseInt(movieId)
    },
    orderBy: {
      postedAt: 'desc'
    }
  }))
    // i hate directly sending db objects straight to frontend, that's how you leak sensitive stuff
    .map(c => ({
      comment: c.comment,
      movieId: c.movieId,
      userId: c.userId,
      postedAt: c.postedAt,
      id: c.id
    }));
  return results;
};

// We could return some server error/success message and toast it in frontend?
export const postOrUpdateComment: (newComment: z.infer<typeof postCommentSchema>, commentId?: number) => Promise<boolean> = async (newComment, commentId) => {
  const email = (await auth())?.user?.email;
  const mode = commentId === undefined ? 'create' : 'update';

  // if we're trying to update a comment, make sure it's a valid id
  if (mode === 'update') {
    const { success, data } = isValidCommentId.safeParse(commentId);
    if (!success) {
      return false;
    }
  }
  const { success, data } = postCommentSchema.safeParse(newComment);
  if (!email || !success) {
    return false;
  }

  const { movieId, comment } = data;

  const movie = await prisma.movie.findFirst({
    where: {
      id: parseInt(movieId)
    }
  });


  // Can't post comments on a movie that doesn't exist.
  if (!movie) {
    return false;
  }

  if (mode === 'create') {
    await prisma.userComment.create({
      data: {
        comment: comment,
        // I could set it as auto generated in prisma schema
        postedAt: new Date(),
        userId: email,
        movieId: movie.id
      }
    });
    await prisma.userMovieFollow.updateMany({
      where: {
        movieId: movie.id,
        userId: {
          not: email
        }
      },
      data: {
        unseenCount: {
          increment: 1
        }
      }
    });
  } else {
    const existingComment = await prisma.userComment.findFirst({
      where: {
        id: commentId
      }
    });
    // Only update if it exists and belongs to the user
    if (existingComment && existingComment.userId === email) {
      await prisma.userComment.update({
        where: {
          id: commentId
        },
        data: {
          comment: newComment.comment
        }
      });
    }
  }
  revalidatePath(`/`, 'page');
  revalidatePath(`/movie/following`, 'page');
  revalidatePath(`/movie/${movieId}`, 'page');
  return true;
};

// This is only here for dev convenience
export const postFakeComment: (movieId: number, email: string) => Promise<void> = async (movieId: number, email) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const movie = await prisma.movie.findFirst({
    where: {
      id: movieId
    }
  });

  // Can't post comments on a movie that doesn't exist.
  if (!movie) {
    return;
  }

  const randomQuote = await fetch('https://dummyjson.com/quotes/random').then(r => r.json());

  await prisma.userComment.create({
    data: {
      comment: `${randomQuote.quote} - ${randomQuote.author}`.toLowerCase(),
      // I could set it as auto generated in prisma schema
      postedAt: new Date(),
      userId: email,
      movieId: movie.id
    }
  });
  await prisma.userMovieFollow.updateMany({
    where: {
      movieId: movie.id,
      userId: {
        not: email
      }
    },
    data: {
      unseenCount: {
        increment: 1
      }
    }
  });
  revalidatePath(`/`, 'page');
  revalidatePath(`/movie/following`, 'page');
  revalidatePath(`/movie/${movieId}`, 'page');
  revalidatePath(`/`, 'layout');
  revalidatePath(`/movie/following`, 'layout');
  revalidatePath(`/movie/[movieId]`, 'layout');
};

export const deleteComment: (commentId: number) => Promise<void> = async (commentId) => {
  // Typescript doesn't exist in production (:
  if (typeof (commentId) !== 'number') {
    return;
  }

  const email = (await auth())?.user?.email;

  // you gotta be logged in
  if (!email) {
    return;
  }

  var existingComment = (await prisma.userComment.findFirst({
    where: { id: commentId }
  }));

  if (existingComment && (existingComment.userId === email || await isAdmin())) {
    await prisma.userComment.delete({
      where: {
        id: commentId
      }
    });
    revalidatePath(`/`, 'page');
    revalidatePath(`/movie/following`, 'page');
    revalidatePath(`/movie/${existingComment!.movieId}`, 'page');
  }
};