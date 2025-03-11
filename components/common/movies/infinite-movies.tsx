'use client';
import {ReadMovieViewModel} from '@/models/movie';
import React, {useCallback, useEffect, useState} from 'react';
import HomeMovieList from './home-movie-list';
import {getMovies} from '@/lib/actions/movie.actions';
import {useInView} from 'react-intersection-observer';
import Spinner from '../spinner';

// A ref dummy div that when in view triggers loading more movies. Paging, sorting by Id.

const InfiniteMovies: React.FC = () => {
  const [movies, setMovies] = useState<
    (ReadMovieViewModel & {
      isMovieFollowed: boolean;
    })[]
  >([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const {ref, inView} = useInView();

  const loadMovies = useCallback(async () => {
    setLoading(true);
    const moreMovies = await getMovies(4, skip);
    setMovies((old) => [...old, ...moreMovies]);
    setSkip((old) => old + moreMovies.length);
    setShouldStop(moreMovies.length === 0);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [skip]);

  useEffect(() => {
    if (!loading && inView && !shouldStop) {
      loadMovies();
    }
  }, [loading, inView, shouldStop, loadMovies]);

  return (
    <React.Fragment>
      <HomeMovieList
        movies={movies}
        title='Browse'
      />
      <div
        ref={ref}
        className='w-full p-12 flex flex-row items-center justify-center'>
        {!shouldStop && <Spinner />}
      </div>
    </React.Fragment>
  );
};

export default InfiniteMovies;
