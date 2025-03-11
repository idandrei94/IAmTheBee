import {ReadMovieViewModel} from '@/models/movie';
import React from 'react';
import AdminMovieListItem from './admin-movie-list-item';

// Nothing fancy here, just a list of items. Could integrate with search/filter/sort/infinite scroll

interface Props {
  movies: ReadMovieViewModel[];
}

const AdminMovieList: React.FC<Props> = ({movies}) => {
  return (
    <ul className='flex flex-col items-stretch justify-start gap-5'>
      {movies.map((m) => (
        <AdminMovieListItem
          key={m.id}
          movie={m}
        />
      ))}
    </ul>
  );
};

export default AdminMovieList;
