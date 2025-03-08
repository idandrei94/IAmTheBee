import React from 'react';

interface Props {
  stars: number;
}

const MovieRating: React.FC<Props> = ({stars}) => {
  return (
    <div className='flex flex-col items-start justify-start'>
      {stars.toFixed(1)} stars
    </div>
  );
};

export default MovieRating;
