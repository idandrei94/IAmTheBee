import {Button} from '@/components/ui/button';
import {HeartIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import {auth} from '@/auth/auth';
import LoginButton from './login-button';
import {getNotificationCount, isAdmin} from '@/lib/actions/user.actions';

/*
The user menu on the top right. Dynamically shows favorites/admin area based on auth roles, and the login/logout function
The "Following" button also takes the notification count, to show in a little bubble. It shows how many unread comments on 
followed movies the user has.
*/

const UserMenu = async () => {
  const session = await auth();
  const admin = await isAdmin();
  const notifCount = await getNotificationCount('');

  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-end gap-3'>
      {!!session?.user && (
        <React.Fragment>
          <span className='text-nowrap'>
            Hello, {session.user.name || session.user.email}!{' '}
          </span>
          {!admin ? (
            <Button
              asChild
              variant='destructive'>
              <Link
                href='/movie/following'
                className='space-x-1/2 relative'>
                <HeartIcon
                  height={24}
                  width={24}
                />
                <span>Following </span>
                {!!notifCount && (
                  <span className='absolute -top-1.5 -right-1.5 p-1 bg-yellow-400 text-red-900 rounded-full text-xs'>
                    {notifCount}
                  </span>
                )}
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant='default'>
              <Link
                href='/admin'
                className='space-x-1/2 relative'>
                <span>Admin Area </span>
              </Link>
            </Button>
          )}
        </React.Fragment>
      )}
      <LoginButton logged={!!session?.user} />
    </div>
  );
};

export default UserMenu;
