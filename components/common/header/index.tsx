import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {APP_NAME} from '@/lib/constants';
import HeaderMenu from './header-menu';

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
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
