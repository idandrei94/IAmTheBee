import {ReadMovieViewModel} from '@/models/movie';
import React from 'react';
import MovieList from './movie-list';
import MovieListItem from './movie-list-item';
import MovieNotifCount from './movie-notif-count';

/*
Just a little utility wrapper around the basic movie list component. It's similar to the one on the home page,
but this one also shows individual notification for each movie
*/

interface Props {
  movies: (ReadMovieViewModel & {isMovieFollowed: boolean})[];
  title?: string;
  notFound?: string;
}

const FollowedMovieList: React.FC<Props> = ({movies, title, notFound}) => {
  // I should probably create dedicated card components, so I can dynamically show the card based on whether the movie
  // is followed, even in the other lists
  return (
    <MovieList
      renderFunction={(movie) => (
        <div className='relative'>
          <MovieNotifCount movie={movie} />
          <MovieListItem
            key={movie.id}
            movie={movie}
          />
        </div>
      )}
      movies={movies}
      title={title}
      notFound={notFound}
    />
  );
};

export default FollowedMovieList;
