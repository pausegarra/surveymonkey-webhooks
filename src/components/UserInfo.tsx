"use client";

import { localApiService } from '@/services/LocalApiService';
import { useRouter } from 'next/navigation';
import React from 'react';

function UserInfo ({ userData }: any) {
  const router = useRouter();

  async function handleClick () {
    await localApiService.logout();
    router.push('/');
  }

  if (userData === null) return null;

  return (
    <div className='flex flex-col gap-2 items-center flex-grow'>
      <div className='text-primary '>Currently logged in as {userData.username}</div>
      <button onClick={handleClick} className='text-primary font-bold underline'>Logout</button>
    </div>
  );
}

export default UserInfo;