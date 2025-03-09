import { auth } from '@/auth/auth';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserEmail() {
  return (await auth())?.user?.email || null;
}