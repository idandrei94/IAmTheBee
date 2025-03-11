import {EllipsisVerticalIcon} from '@heroicons/react/24/solid';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import UserMenu from '../user-menu';

/*
ShadCN Sheet menu to make the mobile experience better
*/

const HeaderMenu = async () => {
  return (
    <div className='flex justify-end gap-3 pr-5'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <UserMenu />
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
            <UserMenu />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default HeaderMenu;
