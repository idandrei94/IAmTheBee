'use client';
import React, {useState} from 'react';
import {StarIcon} from '@heroicons/react/24/solid';
import {rateMovie} from '@/lib/actions/movie.actions';

interface Props {
  stars: number;
  text?: string;
  editable?: boolean;
  movieId: number;
}

const MovieRating: React.FC<Props> = ({stars, text, editable, movieId}) => {
  const [loading, setLoading] = useState(false);

  const score = Math.round(stars);
  return (
    <div className='flex flex-col items-stretch justify-start gap-1'>
      {!!text && <p className='text-gray-600'>{text}</p>}
      <ul className='flex flex-row items-start justify-start group mt-1'>
        <li className='mb-1 mr-1'>{stars.toFixed(1)}</li>
        {Array.from({length: 5}, (_, i) => (
          <li key={i}>
            {/*
            Could be made nicer with some hover effects using tailwind groups and what not
          */}
            <button
              disabled={!editable || loading}
              onClick={async () => {
                setLoading(true);
                await rateMovie(`${movieId}`, i + 1);
                setLoading(false);
              }}>
              <StarIcon
                className={`h-5 w-5 ${
                  i < score ? 'text-yellow-500' : 'text-gray-300'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRating;
