'use client';
import React, {useActionState, useState} from 'react';
import {PhotoIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import {CreateFormState, ReadMovieViewModel} from '@/models/movie';
import {createMovie} from '@/lib/actions/movie.actions';
import AdminSubmitButton from './admin-submit-button';
import {UploadButton} from '@/lib/uploadthings';
import Image from 'next/image';

type Props = {
  movie?: ReadMovieViewModel;
};

/*
Just a simple round trip form with server actions
The file uploader works through uploadthing, we upload a file, get the url back for it and we send that as a hidden input

Currently, if you change the file, you end up with unused files build-up, would normally setup some cleanup function
*/

const AdminMovieForm: React.FC<Props> = ({movie}) => {
  const [posterPath, setPosterPath] = useState('');
  const [formState, action] = useActionState(
    createMovie,
    {} satisfies CreateFormState
  );
  return (
    <form action={action}>
      <input
        type='hidden'
        name='id'
        value={movie?.id}
      />
      <input
        type='hidden'
        name='poster_path'
        value={posterPath}
      />
      <div className='space-y-12 sm:space-y-16'>
        <div>
          <span className='text-destructive text-sm'>{formState.id}</span>
          <span className='text-destructive text-sm'>
            {formState.poster_path}
          </span>
          <span className='text-destructive text-sm'>{formState.other}</span>
          <div className='space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='title'
                className='block text-sm/6 font-medium text-gray-900 sm:pt-1.5'>
                Movie Title
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md'>
                  <input
                    defaultValue={movie?.title || ''}
                    id='title'
                    name='title'
                    type='text'
                    placeholder='Yolo Swaggins and the Fellowship of the Bling'
                    className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
                  />
                </div>
                <span className='text-destructive text-sm'>
                  {formState.title}
                </span>
              </div>
            </div>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='release_date'
                className='block text-sm/6 font-medium text-gray-900 sm:pt-1.5'>
                Release Date
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md'>
                  <input
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    id='release_date'
                    name='release_date'
                    type='date'
                    className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='description'
                className='block text-sm/6 font-medium text-gray-900 sm:pt-1.5'>
                Description
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md'>
                  <textarea
                    defaultValue={movie?.description || ''}
                    rows={5}
                    id='description'
                    name='description'
                    className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
                  />
                </div>
                <span className='text-destructive text-sm'>
                  {formState.description}
                </span>
              </div>
            </div>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
              <label
                htmlFor='cover-photo'
                className='block text-sm/6 font-medium text-gray-900 sm:pt-1.5'>
                Banner Photo
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <div className='flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    {!posterPath ? (
                      <PhotoIcon
                        aria-hidden='true'
                        className='mx-auto size-12 text-gray-300'
                      />
                    ) : (
                      <div className='relative h-32 min-w-20'>
                        <Image
                          alt={`The image you uploaded`}
                          src={posterPath}
                          className='object-cover h-auto w-auto'
                          fill
                          sizes='80px'
                        />
                      </div>
                    )}
                    <div className='hidden text-blue-600' />
                    <div className='mt-4 flex text-sm/6 text-gray-600 items-center justify-center'>
                      <UploadButton
                        endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                          setPosterPath(res[0]?.ufsUrl);
                        }}
                        onUploadError={console.log}
                        appearance={{
                          container: 'p-0 outline-none border-none ring-none',
                          button: 'text-blue-600 font-bold cursor-pointer',
                          allowedContent: 'text-xs/5 text-gray-600'
                        }}
                      />
                    </div>
                    {/*
                      This technically means we can upload photos without linking them to a movie. Should be cleaned up.
                    */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <Link
          href={'/admin'}
          className='text-sm/6 font-semibold text-gray-900'>
          Cancel
        </Link>
        <AdminSubmitButton label='Submit' />
      </div>
    </form>
  );
};

export default AdminMovieForm;
