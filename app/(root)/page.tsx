import {Metadata, NextPage} from 'next';
import sampleData from '@/db.json';
import MovieList from '@/components/common/movies/movie-list';
import {Movie} from '@/models/movie';

export const metadata: Metadata = {
  title: 'Home'
};

const HomePage: NextPage = async () => {
  const allMovies = await Promise.resolve(
    (sampleData as Movie[]).map((m) => ({
      ...m,
      comments: Math.floor(Math.random() * 100),
      rating: Math.random() * 5
    }))
  );
  const trendingMovies = allMovies
    .sort((a, b) => a.comments - b.comments)
    .slice(0, 8);
  const newMovies = allMovies
    .sort(
      (a, b) =>
        new Date(b.release_date).getFullYear() -
        new Date(a.release_date).getFullYear()
    )
    .slice(0, 8);

  return (
    <div className='flex flex-col items-stretch justify-start'>
      <MovieList
        movies={[]}
        title='Following'
        notFound='You are not following any movies. Check our great library!'
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
