import {
  HeartIcon,
  UserIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/solid';
import React from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

const NavButtons = () => {
  return (
    <React.Fragment>
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
      <Button asChild>
        <Link
          href='/login'
          className='space-x-1/2'>
          <UserIcon
            height={24}
            width={24}
          />
          <span>Login</span>
        </Link>
      </Button>
    </React.Fragment>
  );
};

const HeaderMenu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <NavButtons />
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVerticalIcon
              width={24}
              height={24}
            />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
            <NavButtons />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default HeaderMenu;
