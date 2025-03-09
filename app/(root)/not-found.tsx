'use client';
import {Button} from '@/components/ui/button';
import {APP_NAME} from '@/lib/constants';
import Image from 'next/image';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <div className='p-6 w-1/2 rounded-lg shadow-xl text-center bg-gray-50 flex flex-col items-center justify-start'>
        <Image
          src='/bee.png'
          width={48}
          height={48}
          alt={`${APP_NAME} logo`}
          priority
        />
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <p className='text-destructive'>
          We could not find the droids you&apos;re looking for :&#40;
        </p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => {
            window.location.href = '/';
          }}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
