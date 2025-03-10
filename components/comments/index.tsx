import React from 'react';
import CreateCommentForm from './create-comment.form';
import CommentList from './comment-list';
import {getMovieComments} from '@/lib/actions/comment.actions';
import {auth} from '@/auth/auth';

interface Props {
  movieId: string;
}

const Comments: React.FC<Props> = async ({movieId}) => {
  const comments = await getMovieComments(movieId);
  const isLogged = !!(await auth())?.user?.email;

  return (
    <div className='w-full flex flex-col items-stretch justify-start pt-8 gap-2'>
      <h3 className='h3b pb-3'>Comments:</h3>
      {isLogged && (
        <CreateCommentForm
          movieId={parseInt(movieId)}
          variant='create'
        />
      )}
      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;
