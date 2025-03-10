import {UserCommentViewModel} from '@/models/comment';
import React from 'react';
import CommentListItem from './comment-list-item';
import {isAdmin} from '@/lib/actions/user.actions';

interface Props {
  comments: UserCommentViewModel[];
}

const CommentList: React.FC<Props> = async ({comments}) => {
  const userIsAdmin = await isAdmin();
  return (
    <div className='flex flex-col justify-start items-stretch gap-2 max-h-[500px] overflow-auto pt-5'>
      {comments.map((c) => (
        <CommentListItem
          userIsAdmin={userIsAdmin}
          comment={c}
          key={c.id}
        />
      ))}
    </div>
  );
};

export default CommentList;
