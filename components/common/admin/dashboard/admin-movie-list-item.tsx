import {ReadMovieViewModel} from '@/models/movie';
import Link from 'next/link';
import React from 'react';
import MovieRating from '../../movies/movie-rating';
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/solid';
import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {deleteMovie} from '@/lib/actions/movie.actions';
import AdminDeleteMovieButton from './admin-delete-movie-button';

// Just a little bar with some movie infos, links to the edit page, and option to delete

interface Props {
  movie: ReadMovieViewModel;
}

const AdminMovieListItem: React.FC<Props> = ({movie}) => {
  return (
    <li className='flex justify-between gap-x-6 items-center bg-gray-50 shadow-lg'>
      <div className='flex gap-x-4 flex-row flex-1'>
        <div className='relative h-32 min-w-20'>
          <Image
            alt={`Poster Image for ${movie.title}`}
            src={movie.poster_path}
            className='object-cover h-auto w-auto'
            fill
            sizes='80px'
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <div className='text-xl font-semibold text-gray-900'>
            <Link
              href={`/admin/details/${movie.id}`}
              className='hover:underline'>
              {movie.title}
            </Link>
          </div>
          <div className='mt-1 flex text-md text-gray-500'>
            <span className='truncate hover:underline'>
              {movie.release_date.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      <div className='hidden xl:block max-w-xl py-2 text-ellipsis'>
        {movie.description}
      </div>
      <div className='flex shrink-0 items-center gap-x-6'>
        <div className='hidden sm:flex sm:flex-col sm:items-end'>
          <div className='text-sm/6 text-gray-900'>
            <MovieRating
              movieId={movie.id}
              stars={movie.rating}
            />
          </div>
          <p className='mt-1 text text-gray-500 flex flex-row gap-1 items-center justify-center'>
            <ChatBubbleOvalLeftIcon
              height={24}
              width={24}
              className=''
            />
            {movie.comments}
          </p>
        </div>
        <Menu
          as='div'
          className='relative flex-none'>
          <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
            <span className='sr-only'>Open options</span>
            <EllipsisVerticalIcon
              aria-hidden='true'
              className='size-5'
            />
          </MenuButton>
          <MenuItems
            transition
            className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
            <MenuItem>
              <AdminDeleteMovieButton movieId={movie.id} />
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </li>
  );
};

export default AdminMovieListItem;
