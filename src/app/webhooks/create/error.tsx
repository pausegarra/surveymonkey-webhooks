"use client";

import { Link } from '@/components/Link';
import React from 'react';

interface Props {
  error: Error;
}

function Error ({ error }: Props) {
  return (
    <div className='flex flex-col items-center gap-5 mt-9'>
      <h2 className='text-2xl text-primary'>Something went wrong!</h2>
      <Link href='/'>Go to homepage</Link>
    </div>
  );
}

export default Error;