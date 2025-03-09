import {Button} from '@/components/ui/button';
import {HeartIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import {auth} from '@/auth/auth';
import LoginButton from './login-button';

const UserMenu = async () => {
  const session = await auth();
  const logged = !!session;

  return (
    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-end gap-3'>
      {logged && (
        <React.Fragment>
          <span className='text-nowrap'>Hello, Bob! </span>
          <Button
            asChild
            variant='destructive'>
            <Link
              href='/favorites'
              className='space-x-1/2'>
              <HeartIcon
                height={24}
                width={24}
              />
              <span>Favorites</span>
            </Link>
          </Button>
        </React.Fragment>
      )}
      <LoginButton logged={logged} />
    </div>
  );
};

export default UserMenu;
