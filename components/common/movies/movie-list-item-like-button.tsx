import {ReadMovieViewModel} from '@/models/movie';
import {HeartIcon} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React from 'react';

interface Props {
  movie: ReadMovieViewModel;
}

const LikeButton: React.FC<Props> = ({movie}) => {
  return (
    <button
      className={classNames('p-2 bg-white rounded transition-colors z-10', {
        'text-red-500 hover:text-gray-400': movie.id % 2,
        'text-gray-400 hover:text-red-500': !(movie.id % 2)
      })}>
      <HeartIcon className={classNames('h-6 w-6')} />
    </button>
  );
};

export default LikeButton;
