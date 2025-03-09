import {Metadata, NextPage} from 'next';
import MovieList from '@/components/common/movies/movie-list';
import {getMovies} from '@/lib/actions/movie.actions';

export const metadata: Metadata = {
  title: 'Home'
};

const HomePage: NextPage = async () => {
  // Get the movies from the DB using the serverAction
  const allMovies = await getMovies();
  const trendingMovies = [...allMovies]
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 8);
  const newMovies = [...allMovies]
    .sort((a, b) => b.release_date.getFullYear() - a.release_date.getFullYear())
    .slice(0, 8);

  return (
    <div className='flex flex-col items-stretch justify-start'>
      <MovieList
        movies={[]}
        title='Following'
        notFound='You are not following any movies. Check out our great library!'
      />
      <MovieList
        movies={newMovies}
        title='Latest Releases'
      />
      <MovieList
        movies={trendingMovies}
        title='Trending'
      />
    </div>
  );
};

export default HomePage;
