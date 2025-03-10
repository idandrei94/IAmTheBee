import {ReadMovieViewModel} from '@/models/movie';
import React from 'react';
import MovieListItem from './movie-list-item';
import classNames from 'classnames';

interface Props {
  movies: (ReadMovieViewModel & {isMovieFollowed: boolean})[];
  title?: string;
  notFound?: string;
  variant?: 'horizontal' | 'vertical';
  renderFunction: (
    movie: ReadMovieViewModel & {isMovieFollowed: boolean}
  ) => React.ReactNode;
}

// HoC to customize the contents. This way we can personalize the card by adding additional information (followed list notifications)

const MovieList: React.FC<Props> = ({
  movies,
  title,
  notFound,
  renderFunction,
  variant
}) => {
  // this would be great as a carousel or side scroller
  return (
    <div className='my-auto sm:my-7'>
      <h2 className='h2b mb-4'>{title}</h2>
      {movies.length > 0 ? (
        <div
          className={classNames('flex flex-col items-center gap-5', {
            'sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4':
              variant !== 'vertical'
          })}>
          {movies.map((movie) => (
            <React.Fragment key={movie.id}>
              {renderFunction(movie)}
            </React.Fragment>
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
