import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {ReadMovieViewModel} from '@/models/movie';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {ChatBubbleOvalLeftIcon} from '@heroicons/react/24/solid';
import MovieRating from './movie-rating';
import {IMAGE_BASE_URL} from '@/lib/constants';
import LikeButton from './movie-list-item-like-button';

interface Props {
  movie: ReadMovieViewModel;
}

const MovieListItem: React.FC<Props> = ({movie}) => {
  return (
    <Card className='w-full max-w-sm overflow-hidden h-full flex flex-col'>
      <CardHeader className='p-0 items-center w-full relative'>
        <Link
          href={`/movie/${movie.id}`}
          className='relative h-[450px] w-full'>
          <div className='absolute top-2 right-2 z-10'>
            <LikeButton movie={movie} />
          </div>
          <Image
            className='object-cover -mt-2'
            src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
            alt={movie.title}
            priority
            fill
            sizes='33vw'
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 -mt-2 flex-1'>
        <div className='flex flex-col items-stretch justify-start gap-3 h-full flex-1'>
          <Link
            href={`/movie/${movie.id}`}
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
              href={`/movie/${movie.id}`}
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
