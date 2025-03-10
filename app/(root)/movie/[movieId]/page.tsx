import {getMovieById} from '@/lib/actions/movie.actions';
import {NextPage} from 'next';
import {notFound} from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import {IMAGE_BASE_URL} from '@/lib/constants';
import Link from 'next/link';
import {ArrowLeftCircleIcon} from '@heroicons/react/24/outline';
import MovieDetailsControls from '@/components/common/movies/movie-details-controls';
import ClearNotifs from '@/components/common/movies/clear-notifs';
import {getMovieSuggestions} from '@/lib/actions/llm.actions';
import MovieList from '@/components/common/movies/movie-list';
import MovieRating from '@/components/common/movies/movie-rating';
import Comments from '@/components/comments';

const hideSuggetions = !!process.env.HIDE_LLM_SUGGESTIONS;

interface Props {
  params: Promise<{movieId: string}>;
}

const MovieId: NextPage<Props> = async ({params}) => {
  const {movieId} = await params;
  const movie = await getMovieById(movieId);
  if (!movie) {
    return notFound();
  }

  const relatedMovies = !hideSuggetions
    ? await getMovieSuggestions(
        movie.description.substring(0, 250),
        `${movie.id}`
      )
    : [];

  return (
    <div className='w-full h-full flex flex-col items-center justify-start p-5'>
      <ClearNotifs movieId={movieId} />
      <div className='flex flex-row w-full lg:w-[60%] items-center justify-start mx-auto py-3'>
        <Link
          href='/'
          className='flex flex-row gap-2 items-center justify-start text-slate-600 hover:text-primary transition-colors'>
          <ArrowLeftCircleIcon className='w-8 h-8' /> Go Back
        </Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] w-full gap-5'>
        <div className='hidden lg:flex flex-col'>
          {/*
          I should make a component for the rendered list items
          */}
          <MovieList
            renderFunction={(movie) => (
              <Link
                href={`/movie/${movie.id}`}
                className='flex flex-col items-start justify-start w-full'>
                <span>{movie.title}</span>
                <div className='flex flex-row items-start justify-between gap-1'>
                  <span className='pt-1'>
                    ({movie.release_date.getFullYear()})
                  </span>
                  <span>
                    <MovieRating
                      movieId={movie.id}
                      stars={movie.rating}
                    />
                  </span>
                </div>
              </Link>
            )}
            movies={relatedMovies.slice(0, 3)}
            variant='vertical'
          />
        </div>
        <div className='w-full'>
          <div className='flex flex-col lg:grid grid-cols-[3fr_5fr] w-full items-start lg:justify-start lg:gap-8'>
            <div className='w-full relative h-[25vw]'>
              {/*
                Would be nice if I had a landscape version of the banner
              */}
              <Image
                className='object-contain rounded-lg top-0'
                src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
                alt={movie.title}
                priority
                fill
                sizes='300px, 720px'
              />
            </div>
            <div className='flex flex-col items-stretch justify-start pt-5'>
              <h1 className='h1b pb-3'>{movie.title}</h1>
              <div className='text-gray-600 text-lg'>
                Year: {movie.release_date.getFullYear()}
              </div>
              <MovieDetailsControls movie={movie} />
              <div className='text-xl'>{movie.description}</div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <Comments movieId={movieId} />
          </div>
        </div>
        <div className='hidden lg:flex flex-col'>
          <MovieList
            renderFunction={(movie) => (
              <Link
                href={`/movie/${movie.id}`}
                className='flex flex-col items-start justify-start w-full'>
                <span>{movie.title}</span>
                <div className='flex flex-row items-start justify-between gap-1'>
                  <span className='pt-1'>
                    ({movie.release_date.getFullYear()})
                  </span>
                  <span>
                    <MovieRating
                      movieId={movie.id}
                      stars={movie.rating}
                    />
                  </span>
                </div>
              </Link>
            )}
            movies={relatedMovies.slice(3)}
            variant='vertical'
          />
        </div>
        <div className='lg:hidden'>
          <MovieList
            renderFunction={(movie) => (
              <Link
                href={`/movie/${movie.id}`}
                className='flex flex-col items-start justify-start w-full'>
                <span className=''>{movie.title}</span>
                <div className='flex flex-row items-start justify-between gap-1 w-full'>
                  <span className='pt-1'>
                    ({movie.release_date.getFullYear()})
                  </span>
                  <span>
                    <MovieRating
                      movieId={movie.id}
                      stars={movie.rating}
                    />
                  </span>
                </div>
              </Link>
            )}
            movies={relatedMovies}
          />
        </div>
      </div>
    </div>
  );
};

// export const generateStaticParams = async () => {
//   return await getMovies().then((movies) =>
//     movies.map((movie) => ({params: {movieId: movie.id.toString()}}))
//   );
// };

export default MovieId;
