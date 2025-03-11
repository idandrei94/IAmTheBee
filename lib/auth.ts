"use server";

import { NextResponse } from 'next/server';
import { isAdmin } from './actions/user.actions';
import { auth } from '@/auth/auth';


// i'd use a properly shaped token
// for ease i'd have just queried the db, but prisma has some issues with this currently
// so hackathon solution
export const checkUserCanAccess = async (admin: boolean) => {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL('/'));
  }
  if (admin) {
    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
      return NextResponse.redirect(new URL('/'));
    }
  }
};