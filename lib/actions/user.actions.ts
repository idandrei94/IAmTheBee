"use server";
import { signIn, signOut } from '@/auth/auth';

export const login = async (redirect?: string) => {
  await signIn('github', { redirectTo: redirect || '/' });
};
export const logout = async () => {
  console.log('logout');
  await signOut({ redirectTo: '/' });
};