import { DbMovie } from '../movie';
import { DbRole } from '../security';

export type DbUser = {
  email: string,
  password: string,
  name: string,
  UserComment: DbUserComment[];
  UserMovieFollow: DbUserMovieFollow[];
  roles: DbRole[];
  UserRating: DbUserRating[];
};

export type DbUserRating = {
  rating: number,
  user: DbUser,
  userId: string;
  movie: DbMovie,
  movieId: number;
};

export type DbUserComment = {
  comment: string,
  user: DbUser,
  userId: string,
  movie: DbMovie,
  movieId: number;
};

export type DbUserMovieFollow = {
  user: DbUser,
  userId: string,
  movie: DbMovie,
  movieId: number,
  unseenCount: number;
};