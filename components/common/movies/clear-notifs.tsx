'use client';
import {clearNotifications} from '@/lib/actions/user.actions';
import React, {useEffect} from 'react';

/*
dummy component to quickly refresh the notifications when opening a movie
*/

interface Props {
  movieId: string;
}

// This forces an update of the notification count. Passing an empty movieId will not clear, just update the value.
const ClearNotifs: React.FC<Props> = ({movieId}) => {
  useEffect(() => {
    clearNotifications(movieId);
  }, [movieId]);

  return null;
};

export default ClearNotifs;
