'use client';
import {UserCommentViewModel} from '@/models/comment';
import React from 'react';
import CreateCommentForm from './create-comment.form';

interface Props {
  show: boolean;
  comment: UserCommentViewModel;
  onClose: () => void;
}
// Built on top of the create comment form, for update logic

const CommentEditItemForm: React.FC<Props> = ({show, comment, onClose}) => {
  if (!show) {
    return null;
  }
  return (
    <div className='absolute inset-0'>
      <CreateCommentForm
        variant='edit'
        onCancel={onClose}
        movieId={comment.movieId}
        comment={comment.comment}
        commentId={comment.id}
      />
    </div>
  );
};

export default CommentEditItemForm;
