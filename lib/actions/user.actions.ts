"use server";
import { auth, signIn, signOut } from '@/auth/auth';
import { prisma } from '@/db/prisma';
import { validOrEmptyMovieId } from '@/models/movie/validators';
import { revalidatePath } from 'next/cache';


// Wrappers for our oauth login/logout
export const login = async (redirect?: string) => {
  await signIn('github', { redirectTo: redirect || '/' });
};
export const logout = async () => {
  await signOut({ redirectTo: '/' });
};

// Checks how many unseed comments a user has, for a movie
// Checks if the user is not logged in, and automatically returns 0
export const getNotificationCount: (movieId: string) => Promise<number> = async (movieId) => {
  // Validate inputs and auth status
  const { success, data: validatedId } = validOrEmptyMovieId.safeParse(movieId);
  if (!success) {
    return 0;
  }
  const email = (await auth())?.user?.email;

  if (!email) {
    return 0;
  }
  // get either all follow counts or just for the requested movie
  if (validatedId) {
    return (await prisma.userMovieFollow.findFirst({
      where: {
        userId: email,
        movieId: parseInt(validatedId)
      },
      select: {
        unseenCount: true
      }
    }))?.unseenCount || 0;
  } else {
    return (await prisma.userMovieFollow.findMany({
      where: {
        userId: email
      },
      select: {
        unseenCount: true
      }
    })).reduce((acc, v) => acc + v.unseenCount, 0);
  }
};

// Marks all notifications as read, for a user/movie. Basically what happens when you access the details page
export const clearNotifications: (movieId: string) => Promise<void> = async (movieId) => {
  // Validate inputs and auth status
  const { success, data: validatedId } = validOrEmptyMovieId.safeParse(movieId);
  if (!success) {
    return;
  }
  const email = (await auth())?.user?.email;
  // If logged in, remove the "unread flag"
  if (!!email) {
    if (!!validatedId) {
      await prisma.userMovieFollow.updateMany({
        where: {
          userId: email,
          movieId: parseInt(validatedId)
        },
        data: {
          unseenCount: 0
        }
      });
    }
    // I tried to be consistent about this, but Next themselves said it's working weird
    revalidatePath(`/`, 'layout');
    revalidatePath(`/movie/following`, 'layout');
    revalidatePath(`/movie/[movieId]`, 'layout');
  }
};

// Simple utility action to validate if a user has the admin role
// Again, with a proper auth solution, I'd just check the roles claim
export const isAdmin: () => Promise<boolean> = async () => {
  const email = (await auth())?.user?.email;
  return !!email && `${process.env.ADMIN}`.split(';').includes(email);
};