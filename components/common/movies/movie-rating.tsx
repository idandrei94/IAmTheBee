import React from 'react';
import {StarIcon} from '@heroicons/react/24/solid';

interface Props {
  stars: number;
}

const MovieRating: React.FC<Props> = ({stars}) => {
  const score = Math.round(stars);
  return (
    <ul className='flex flex-row items-start justify-start'>
      {Array.from({length: 5}, (_, i) => (
        <li key={i}>
          {/*
            Extend this for the leave-a-rating feature
            by adding a button to each star
          */}
          <StarIcon
            className={`h-5 w-5 ${
              i < score ? 'text-yellow-500' : 'text-gray-300'
            }`}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieRating;
