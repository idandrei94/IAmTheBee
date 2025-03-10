"use server";
import { auth, signIn, signOut } from '@/auth/auth';
import { prisma } from '@/db/prisma';
import { validMovieId, validOrEmptyMovieId } from '@/models/movie/validators';
import { revalidatePath } from 'next/cache';

export const login = async (redirect?: string) => {
  await signIn('github', { redirectTo: redirect || '/' });
};
export const logout = async () => {
  console.log('logout');
  await signOut({ redirectTo: '/' });
};

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
    revalidatePath(`/`, 'layout');
    revalidatePath(`/movie/following`, 'layout');
    revalidatePath(`/movie/[movieId]`, 'layout');
  }
};

export const isAdmin: () => Promise<boolean> = async () => {
  const email = (await auth())?.user?.email;
  if (!email) {
    return false;
  }
  const role = (await prisma.userRole.findFirst({
    include: {
      Role: {
        select: {
          name: true
        }
      }
    },
    where: {
      userId: email,
      roleId: 'admin'
    }
  }));

  console.log('check role');
  return !!role;
};