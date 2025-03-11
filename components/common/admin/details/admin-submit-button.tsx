import React from 'react';
import {useFormStatus} from 'react-dom';

interface Props {
  label: string;
}

// I wanted to tinker with useFormStatus, so I extracted this as its separate component

const AdminSubmitButton: React.FC<Props> = ({label}) => {
  const {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      type='submit'
      className='inline-flex justify-center rounded-md bg-indigo-600 disabled:bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
      {label}
      {pending}
    </button>
  );
};

export default AdminSubmitButton;
