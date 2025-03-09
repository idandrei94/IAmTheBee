import {getMovieById} from '@/lib/actions/movie.actions';
import {NextPage} from 'next';
import {notFound} from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import {IMAGE_BASE_URL} from '@/lib/constants';
import Link from 'next/link';
import {ArrowLeftCircleIcon} from '@heroicons/react/24/outline';
import MovieRating from '@/components/common/movies/movie-rating';
import LikeButton from '@/components/common/movies/movie-list-item-like-button';

interface Props {
  params: Promise<{movieId: string}>;
}

const MovieId: NextPage<Props> = async ({params}) => {
  const {movieId} = await params;
  const movie = await getMovieById(movieId);
  if (!movie) {
    return notFound();
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-start p-5'>
      <div className='flex flex-row w-full lg:w-[60%] items-center justify-start mx-auto py-3'>
        <Link
          href='/'
          className='flex flex-row gap-2 items-center justify-start text-slate-600 hover:text-primary transition-colors'>
          <ArrowLeftCircleIcon className='w-8 h-8' /> Go Back
        </Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] w-full gap-5'>
        <div className='hidden lg:block'>
          left side LLM stuff (show 1-3/6 suggestions)
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
              <div className='pb-8 flex flex-row items-center justify-between gap-3'>
                <MovieRating stars={movie.rating} />{' '}
                <div className='flex flex-row items-center justify start'>
                  {movie.id % 2 ? 'Already following' : 'Follow'}
                  <LikeButton movie={movie} />
                </div>
              </div>
              <div className='text-xl'>{movie.description}</div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center'>
            comments section
          </div>
        </div>
        <div className='hidden lg:block'>
          right side LLM stuff (show 4-6/6 suggestions)
        </div>
        <div className='lg:hidden'>
          small screen LLM suggestions 6/6 (carousel?)
        </div>
      </div>
    </div>
  );
};

export default MovieId;
