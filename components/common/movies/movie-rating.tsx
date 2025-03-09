import React from 'react';
import {StarIcon} from '@heroicons/react/24/solid';

interface Props {
  stars: number;
  text?: string;
}

const MovieRating: React.FC<Props> = ({stars, text}) => {
  const score = Math.round(stars);
  return (
    <div className='flex flex-col items-stretch justify-start gap-1'>
      {!!text && <p className='text-gray-600'>{text}</p>}
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
    </div>
  );
};

export default MovieRating;
