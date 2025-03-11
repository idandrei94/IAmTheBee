import {UserCommentViewModel} from '@/models/comment';
import React from 'react';
import CommentControls from './comment-controls';
import {auth} from '@/auth/auth';
import classNames from 'classnames';

interface Props {
  comment: UserCommentViewModel;
  userIsAdmin: boolean;
}

// Shows the comment contents.
// Also displays Commment Controls, which is shown when a user can update/delete the respective comment.

const CommentListItem: React.FC<Props> = async ({
  comment: commentViewModel,
  userIsAdmin
}) => {
  const {comment, postedAt, userId} = commentViewModel;
  const currentUser = (await auth())?.user?.email;
  const isCommentYours = userId === currentUser;
  return (
    <div className='border-[1px] shadow-lg p-3 w-full flex flex-col items-stretch justify-start gap-3 rounded relative'>
      <div className='flex flex-col-reverse md:flex-row md:items-center justify-between pb-1 border-b-2 border-primary ga-:2 md:gap-5'>
        <span
          className={classNames('font-bold', {
            'text-destructive': !isCommentYours,
            'text-green-700 text-lg': isCommentYours
          })}>
          {isCommentYours ? 'You' : userId}
        </span>
        <span className='text-xs opacity-80'>
          {postedAt.toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
      <div className='text-sm'>{comment}</div>
      <CommentControls
        isAdmin={userIsAdmin}
        comment={commentViewModel}
        email={currentUser}
      />
    </div>
  );
};

export default CommentListItem;
