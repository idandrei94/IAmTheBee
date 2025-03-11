'use client';
import {getMovieSuggestions} from '@/lib/actions/llm.actions';
import {ReadMovieViewModel} from '@/models/movie';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions} from '@headlessui/react';
import {
  CheckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

const MovieSearchBar = () => {
  const [options, setOptions] = useState<ReadMovieViewModel[]>([]);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // dont query too often
    if (Date.now().valueOf() - lastQuery > 1000 && query.length > 5) {
      setLastQuery(Date.now());
      getMovieSuggestions(query).then((r) => {
        setOptions(r);
        console.log(r);
      });
    }
  }, [query, lastQuery]);

  useEffect(() => {
    if (!query) {
      setOptions([]);
    }
  }, [query]);

  return (
    <Combobox onClose={() => setQuery('')}>
      <div className='relative bg-gray-200 rounded-lg'>
        <div className='absolute top-0 bottom-0 left-2 flex flex-col items-center justify-center'>
          <MagnifyingGlassIcon
            height={24}
            width={24}
          />
        </div>
        <ComboboxInput
          className={classNames(
            'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-10 text-sm/6 text-black',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          displayValue={(movie: ReadMovieViewModel) => movie?.title}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <ComboboxOptions
        anchor='bottom'
        transition
        className={classNames(
          'w-[var(--input-width)] rounded-xl border border-white/25 bg-black/85 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}>
        {options.map((movie) => (
          <ComboboxOption
            onClick={() => router.push(`/movie/${movie.id}`)}
            key={movie.id}
            value={movie}
            className='cursor-pointer group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10'>
            <CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
            <div className='text-sm/6 text-white'>{movie.title}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default MovieSearchBar;
