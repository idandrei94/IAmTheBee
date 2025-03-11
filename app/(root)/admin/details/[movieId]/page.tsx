import AdminMovieForm from '@/components/common/admin/details/admin-movie-form';
import {getMovieById} from '@/lib/actions/movie.actions';
import {NextPage} from 'next';
import {redirect} from 'next/navigation';
import React from 'react';

interface Props {
  params: Promise<{movieId: string}>;
}

const AdminMovieDetailsPage: NextPage<Props> = async ({params}) => {
  const {movieId} = await params;
  if (!movieId) {
    return redirect('/admin/details/new');
  }
  const variant = movieId === 'new' ? 'create' : 'edit';
  const movie = variant === 'create' ? undefined : await getMovieById(movieId);
  if (variant === 'edit' && !movie) {
    return redirect('/admin/details/new');
  }

  return (
    <div>
      <AdminMovieForm movie={movie || undefined} />
    </div>
  );
};

export default AdminMovieDetailsPage;
