import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {Movie} from '@/models/movie';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {HeartIcon, ChatBubbleOvalLeftIcon} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import MovieRating from './movie-rating';

interface Props {
  movie: Movie;
}

const MovieListItem: React.FC<Props> = ({movie}) => {
  return (
    <Card className='w-full max-w-sm overflow-hidden h-full flex flex-col'>
      <CardHeader className='p-0 items-center w-full relative'>
        <button
          className={classNames(
            'absolute top-2 right-2 p-2 bg-white rounded transition-colors z-10',
            {
              'text-red-500 hover:text-gray-400': movie.id % 2,
              'text-gray-400 hover:text-red-500': !(movie.id % 2)
            }
          )}>
          <HeartIcon className={classNames('h-6 w-6')} />
        </button>
        <Link
          href={`/movies/${movie.id}`}
          className='relative h-[450px] w-full'>
          <Image
            className='object-cover -mt-2'
            src={`/movie_pics/${movie.poster_path}`}
            alt={movie.title}
            priority
            fill
            sizes='300px'
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 -mt-2 flex-1'>
        <div className='flex flex-col items-stretch justify-start gap-3 h-full flex-1'>
          <Link
            href={`/movies/${movie.id}`}
            className='flex-1'>
            <div className='flex flex-row items-start justify-between gap-2 h-full'>
              <span className='font-bold text-md'>{movie.title}</span>
              <span className=''>
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </Link>
          <div className='flex flex-row items-center justify-between gap-3'>
            <Link
              href={`/movies/${movie.id}`}
              className='flex flex-row items-center justify-start gap-1'>
              <ChatBubbleOvalLeftIcon
                height={24}
                width={24}
                className='text-primary'
              />
              {movie.comments}
            </Link>
            <MovieRating stars={movie.rating} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieListItem;
