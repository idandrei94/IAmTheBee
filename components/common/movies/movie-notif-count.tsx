import {getNotificationCount} from '@/lib/actions/user.actions';
import {ReadMovieViewModel} from '@/models/movie';
import {ChatBubbleOvalLeftIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';

interface Props {
  movie: ReadMovieViewModel;
}

const MovieNotifCount: React.FC<Props> = async ({movie}) => {
  const notifCount = await getNotificationCount(`${movie.id}`);

  return notifCount ? (
    <Link
      className='top-2 left-2 absolute rounded z-20 bg-yellow-400'
      href={`/movie/${movie.id}`}>
      <div className='relative text-white p-2 '>
        <ChatBubbleOvalLeftIcon
          height={24}
          width={24}
        />
        <span className='absolute bottom-1 right-0 bg-red-600 text-white rounded-full p-1 py-0 text-[10px] font-bold'>
          {notifCount}
        </span>
      </div>
    </Link>
  ) : null;
};

export default MovieNotifCount;
