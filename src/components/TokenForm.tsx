"use client";

import React from 'react';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/FormComponents';
import { useRouter } from 'next/navigation';
import { localApiService } from '@/services/LocalApiService';

function TokenForm () {
  const [token, setToken] = React.useState<string>('');
  const router = useRouter();

  async function handleClick () {
    try {
      await localApiService.login(token);
      router.push('/webhooks');
    } catch (err) {
      alert('something bad happened');
      console.log(err);
    }
  }

  return (
    <>
      <TextInput name="token" placeholder='Insert your Survey Monkey API here' onChange={(e) => setToken(e.currentTarget.value)} />
      <div className="text-center">
        <Button onClick={handleClick}>Login</Button>
      </div>
    </>
  );
}

export default TokenForm;