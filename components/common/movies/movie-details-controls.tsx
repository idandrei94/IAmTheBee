import React from 'react';
import MovieRating from './movie-rating';
import LikeButton from './movie-list-item-like-button';
import {ReadMovieViewModel} from '@/models/movie';
import {auth} from '@/auth/auth';
import {getUserFollows, getYourRating} from '@/lib/actions/movie.actions';

interface Props {
  movie: ReadMovieViewModel;
}

const MovieDetailsControls: React.FC<Props> = async ({movie}) => {
  const email = (await auth())?.user?.email;
  const isMovieFollowed =
    !!email && (await getUserFollows()).includes(movie.id);
  const rating = email ? await getYourRating(`${movie.id}`) : 0;

  return (
    <div className='flex flex-row items-start justify-between gap-3 pb-8'>
      <div className='grid grid-cols-2 gap-3 w-full'>
        <div className='py-1'>
          <MovieRating
            movieId={movie.id}
            stars={movie.rating}
            text='Average Rating:'
          />
        </div>
        <div className='flex flex-row items-start justify-end w-full'>
          <span className='text-nowrap py-1.5'>
            {isMovieFollowed ? 'Already following' : 'Not following'}
          </span>
          <LikeButton
            movie={movie}
            isMovieFollowed={isMovieFollowed}
          />
        </div>
        {!!email && (
          <MovieRating
            movieId={movie.id}
            editable
            stars={rating}
            text='Your Rating:'
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetailsControls;
