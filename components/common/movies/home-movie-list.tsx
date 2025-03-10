import {ReadMovieViewModel} from '@/models/movie';
import React from 'react';
import MovieListItem from './movie-list-item';
import MovieList from './movie-list';

interface Props {
  movies: (ReadMovieViewModel & {isMovieFollowed: boolean})[];
  title?: string;
  notFound?: string;
  variant?: 'horizontal' | 'vertical';
}

const HomeMovieList: React.FC<Props> = ({movies, title, notFound, variant}) => {
  return (
    <MovieList
      renderFunction={(movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
        />
      )}
      movies={movies}
      title={title}
      notFound={notFound}
      variant={variant}
    />
  );
};

export default HomeMovieList;
