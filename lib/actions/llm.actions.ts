'use server';
import { ReadMovieViewModel } from '@/models/movie';
import { searchInputValidation, validOrEmptyMovieId } from '@/models/movie/validators';
import { HfInference } from "@huggingface/inference";
import { getMovies } from './movie.actions';


/*
This is pretty horrible, you could use your quota up in no time...
I would probably sacrifice some accuracy, and do some db caching (maybe as a night job)
Try some sort of clustering? Maybe for every new movie, just generate the match with a random sample of movies 
and update only those relationships? I certainly don't want an n! problem...
all-MiniLM-L6-v2 works with some cosine weight vector distances, maybe just calculate the vector for each movie,
add some indexing magic, and get relations by some sort of select top(X) from movies order by <vector distance> desc
*/
export const getMovieSuggestions: (input: string, exclusion?: string) => Promise<(ReadMovieViewModel & { isMovieFollowed: boolean; })[]> = async (input, exclusion) => {
  const { success, data: validatedInput } = searchInputValidation.safeParse(input);
  const { success: movieIdOk, data: validatedId } = validOrEmptyMovieId.safeParse(exclusion);
  if (!success) {
    return [];
  }

  const id = movieIdOk ? parseInt(validatedId) : undefined;

  // Would be more efficient to query with filter, but I didn't want to redo the mapping
  const movies = (await getMovies()).filter(m => m.id !== id);
  console.log('movies', movies.length);
  const descriptions = movies.map(m => m.description);
  const client = new HfInference(process.env.LLM_ACCESS_TOKEN);

  const output = await client.sentenceSimilarity({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: {
      "source_sentence": validatedInput,
      "sentences": descriptions
    },
    provider: "hf-inference",
  });

  const weights = output.map((w, index) => ({ index, w })).sort((a, b) => b.w - a.w);
  console.log(weights.slice(0, 6));
  const top6 = weights.slice(0, 6).map(({ index }) => movies[index]);

  return top6;
};