import { validMovieId } from '@/models/movie/validators';
import { z } from 'zod';

export const postCommentSchema = z.object({
  movieId: z.number().int().positive(),
  comment: z.string().min(1, "Please type in a comment first.").max(200, 'Sorry, your comment is too long.'),
});

export const isValidCommentId = z.number().positive().int();