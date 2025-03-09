import { UserComment, UserMovieFollow, UserRating } from '@prisma/client';
import { z } from 'zod';
import { createMovieSchema } from './validators';

export type ReadMovieViewModel = z.infer<typeof createMovieSchema> & {
  id: number,
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