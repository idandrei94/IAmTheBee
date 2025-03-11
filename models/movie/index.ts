import { UserComment, UserMovieFollow, UserRating } from '@prisma/client';
import { createMovieSchema } from './validators';
import { z } from 'zod';

export type ReadMovieViewModel = {
  id: number,
  title: string,
  description: string,
  release_date: Date,
  poster_path: string,
  comments: number;
  rating: number;
};

export type MovieDetailsViewModel = ReadMovieViewModel & {
  id: number;
  rating: number;
  comments: ReadMovieCommentViewModel[];
  userRating?: number;
};

export type DbMovie = {
  id: number,
  title: string,
  description: string,
  release_date: Date,
  poster_path: string,
  UserComment: UserComment[];
  UserMovieFollow: UserMovieFollow[];
  UserRating: UserRating[];
  isFollowed: boolean;
};

export type ReadMovieCommentViewModel = {
  comment: string,
  user: string;
  postedAt: Date;
};


export type CreateFormState = Partial<Record<keyof z.infer<typeof createMovieSchema>, string>> & { other?: string; };