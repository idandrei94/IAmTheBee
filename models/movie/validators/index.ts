import { z } from 'zod';

// Schema for Movie creation
export const createMovieSchema = z.object({
  title: z.string()
    .nonempty('Movie title is required.')
    .min(3, 'Movie title is too short.')
    .max(50, 'Movie title is too long.'),
  description: z.string()
    .nonempty('Movie description is required.')
    .min(20, 'Movie description is too short.')
    .max(100, 'Movie description is too long.'),
  release_date: z.date(),
  poster_path: z.string().regex(/^[a-zA-Z\d]{27}\.jpg$/, "Invalid file name."),
});

export const validMovieId = z.string().regex(/^\d+$/);