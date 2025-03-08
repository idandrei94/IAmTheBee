import {Movie} from '@/models/movie';
import React from 'react';
import MovieListItem from './movie-list-item';

interface Props {
  movies: Movie[];
  title?: string;
  notFound?: string;
}

const MovieList: React.FC<Props> = ({movies, title, notFound}) => {
  return (
    <div className='my-auto sm:my-7'>
      <h2 className='h2b mb-4'>{title}</h2>
      {movies.length > 0 ? (
        <div className='flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {movies.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>{notFound || 'No movies available :('}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
