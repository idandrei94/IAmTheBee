'use client';
import {UserCommentViewModel} from '@/models/comment';
import React, {useState} from 'react';
import {TrashIcon, PencilIcon} from '@heroicons/react/24/outline';
import {deleteComment} from '@/lib/actions/comment.actions';
import CommentEditItemForm from './comment-edit-item-form';

interface Props {
  comment: UserCommentViewModel;
  email?: string | null;
  isAdmin: boolean;
}

// Built of two parts: the buttons themselves, and a mini modal overlay shown on top of the comment component, for edits.

const CommentControls: React.FC<Props> = ({email, comment, isAdmin}) => {
  const [show, setShow] = useState(false);
  if (!email || (email !== comment.userId && !isAdmin)) {
    return null;
  }
  return (
    <React.Fragment>
      <div className='flex flex-row justify-end items-center gap-1 w-full'>
        {email === comment.userId && (
          <button
            className='bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg p-1.5 transition-colors'
            onClick={() => setShow(true)}>
            <PencilIcon
              height={18}
              width={18}
            />
          </button>
        )}
        <button
          className='bg-red-600 hover:bg-red-700 text-white rounded-lg p-1.5 transition-colors'
          onClick={() => deleteComment(comment.id)}>
          <TrashIcon
            height={18}
            width={18}
          />
        </button>
      </div>
      <CommentEditItemForm
        onClose={() => setShow(false)}
        comment={comment}
        show={show}
      />
    </React.Fragment>
  );
};

export default CommentControls;
