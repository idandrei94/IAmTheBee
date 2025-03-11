'use client';
import {followMovie} from '@/lib/actions/movie.actions';
import {login} from '@/lib/actions/user.actions';
import {ReadMovieViewModel} from '@/models/movie';
import {HeartIcon} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React from 'react';

/*
  The little heart button on the movie cards, used to follow/unfollow a movie. 
*/

interface Props {
  movie: ReadMovieViewModel;
  isMovieFollowed: boolean;
}

const LikeButton: React.FC<Props> = ({isMovieFollowed, movie}) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <button
      disabled={loading}
      onClick={async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await followMovie(`${movie.id}`, !isMovieFollowed);
        if (!result.ok && result.message === 'You must login first.') {
          await login(`/movie/${movie.id}`);
        }
        setLoading(false);
      }}
      className={classNames('p-2 bg-white rounded transition-colors z-10 ', {
        'text-red-500 hover:text-gray-400': isMovieFollowed,
        'text-gray-400 hover:text-red-500': !isMovieFollowed
      })}>
      {/* Would be nice to add a spinner here I guess */}
      <HeartIcon className={classNames('h-6 w-6')} />
    </button>
  );
};

export default LikeButton;
