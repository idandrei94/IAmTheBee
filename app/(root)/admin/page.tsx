import AdminMovieList from '@/components/common/admin/dashboard/admin-movie-list';
import {getMovies} from '@/lib/actions/movie.actions';
import Link from 'next/link';
import React from 'react';

const AdminDashboard = async () => {
  const movies = (await getMovies()).sort((a, b) =>
    a.title > b.title ? 1 : -1
  );

  return (
    <div className='w-full flex flex-col items-stretch justify-start gap-5'>
      <h1 className='h1b'>Dashboard</h1>
      <Link
        href='/admin/details/new'
        className='rounded text-white font-bold bg-slate-600 px-3 py-2 mr-auto transition-colors hover:bg-slate-800 mt-5'>
        Create New
      </Link>
      <AdminMovieList movies={movies} />
    </div>
  );
};

export default AdminDashboard;
