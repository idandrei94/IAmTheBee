'use client';
import {deleteMovie} from '@/lib/actions/movie.actions';
import {TrashIcon} from '@heroicons/react/24/outline';
import React, {useState} from 'react';

interface Props {
  movieId: number;
}

const AdminDeleteMovieButton: React.FC<Props> = ({movieId}) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        deleteMovie(`${movieId}`).then(() => setLoading(false));
      }}
      className='px-3 py-1 text-sm/6  data-[focus]:bg-gray-50 data-[focus]:outline-none flex flex-row gap-1 items-center justify-start text-destructive w-full'>
      <TrashIcon
        height={16}
        width={16}
      />
      Delete
    </button>
  );
};

export default AdminDeleteMovieButton;
