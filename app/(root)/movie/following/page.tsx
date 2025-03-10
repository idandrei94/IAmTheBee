import {Metadata, NextPage} from 'next';
import {getMovies} from '@/lib/actions/movie.actions';
import FollowedMovieList from '@/components/common/movies/followed-movie-list';
import ClearNotifs from '@/components/common/movies/clear-notifs';

export const metadata: Metadata = {
  title: 'Following'
};

const FollowPage: NextPage = async () => {
  // Get the movies from the DB using the serverAction
  // It's lazy and it causes the home page to be Dynamic, which ain't great for what's likely the highest traffic page
  // I'd probably want to cache the "followed" movies and load the cached value from each movie card client-side
  const allMovies = (await getMovies()).filter((m) => m.isMovieFollowed);

  return (
    <div className='flex flex-col items-stretch justify-start'>
      <ClearNotifs movieId={''} />
      <FollowedMovieList
        movies={allMovies}
        title={'Following'}
        notFound='You are not following any movies. Check out our great library!'
      />
    </div>
  );
};

export default FollowPage;
