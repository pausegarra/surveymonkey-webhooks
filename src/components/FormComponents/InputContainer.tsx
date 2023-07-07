import React from 'react';

interface Props {
  children: JSX.Element;
}

export function InputContainer ({ children }: Props) {
  return (
    <div className='flex flex-col my-3'>
      {children}
    </div>
  )
}