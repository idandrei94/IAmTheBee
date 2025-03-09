'use client';
import {Button} from '@/components/ui/button';
import {login, logout} from '@/lib/actions/user.actions';
import {UserIcon} from '@heroicons/react/24/solid';
import React from 'react';

interface Props {
  logged: boolean;
}

const LoginButton: React.FC<Props> = ({logged}) => {
  return (
    <Button
      onClick={logged ? () => logout() : () => login()}
      className='space-x-1/2'
      variant={logged ? 'secondary' : 'default'}>
      <UserIcon
        height={24}
        width={24}
      />
      <span>{logged ? 'Logout' : 'Login'}</span>
    </Button>
  );
};

export default LoginButton;
