import { z } from 'zod';

export const validMovieId = z.string().regex(/^\d+$/);
export const validOrEmptyMovieId = z.string().regex(/^\d*$/);

export const validRating = z.number().int().min(1).max(5);

export const searchInputValidation = z.string().max(250).min(5);

// Schema for Movie creation
export const createMovieSchema = z.object({
  id: validOrEmptyMovieId,
  title: z.string()
    .nonempty('Movie title is required.')
    .min(3, 'Movie title is too short.')
    .max(50, 'Movie title is too long.'),
  description: z.string()
    .nonempty('Movie description is required.')
    .min(20, 'Movie description is too short.')
    .max(500, 'Movie description is too long.'),
  release_date: z.string(),
  poster_path: z.string().min(1, "Please upload a Poster")
});