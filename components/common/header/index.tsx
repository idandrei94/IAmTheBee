import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {APP_NAME} from '@/lib/constants';
import HeaderMenu from './header-menu';
import MovieSearchBar from '../movies/movie-search-bar';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='container flex-between py-1'>
        <div className='flex-start'>
          <Link
            href='/'
            className='flex-start'>
            <Image
              src='/bee.png'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <MovieSearchBar />
        <HeaderMenu />
      </div>
      <div className='text-destructive-foreground bg-destructive w-full text-center py-3 font-3xl font-bold'>
        This Website is just a demo and is not indented for any real use.
      </div>
    </header>
  );
};

export default Header;
