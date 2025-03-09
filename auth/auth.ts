import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

// I should move the actual config to some sort of @/auth, but keeping it simple I guess
export const authConfig = NextAuth({
  providers: [
    Github
  ]
});

export const { auth, handlers, signIn, signOut } = authConfig; 