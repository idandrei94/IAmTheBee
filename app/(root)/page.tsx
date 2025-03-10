import {Metadata, NextPage} from 'next';
import MovieList from '@/components/common/movies/movie-list';
import {getMovies} from '@/lib/actions/movie.actions';
import {getUserEmail} from '@/lib/utils';
import FollowedMovieList from '@/components/common/movies/followed-movie-list';
import HomeMovieList from '@/components/common/movies/home-movie-list';
import ClearNotifs from '@/components/common/movies/clear-notifs';

export const metadata: Metadata = {
  title: 'Home'
};

const HomePage: NextPage = async () => {
  // Get the movies from the DB using the serverAction
  // It's lazy and it causes the home page to be Dynamic, which ain't great for what's likely the highest traffic page
  // I'd probably want to cache the "followed" movies and load the cached value from each movie card client-side
  // And/Or offload the session checks into child components
  const allMovies = await getMovies();

  const isLogged = !!(await getUserEmail());

  const trendingMovies = [...allMovies]
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 8);
  const newMovies = [...allMovies]
    .sort((a, b) => b.release_date.getFullYear() - a.release_date.getFullYear())
    .slice(0, 8);
  const moviesYouFollow = allMovies.filter((m) => m.isMovieFollowed);

  return (
    <div className='flex flex-col items-stretch justify-start'>
      <ClearNotifs movieId={''} />
      {isLogged && (
        <FollowedMovieList
          movies={moviesYouFollow.slice(0, 4)}
          title={
            moviesYouFollow
              ? `Following (${moviesYouFollow.length})`
              : 'Following'
          }
          notFound='You are not following any movies. Check out our great library!'
        />
      )}
      <HomeMovieList
        movies={newMovies}
        title='Latest Releases'
      />
      <HomeMovieList
        movies={trendingMovies}
        title='Trending'
      />
    </div>
  );
};

export default HomePage;
