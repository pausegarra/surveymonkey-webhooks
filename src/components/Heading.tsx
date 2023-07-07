import { authService } from '@/services/AuthService';
import Image from 'next/image';
import React from 'react';
import UserInfo from './UserInfo';

interface Props {
  children?: JSX.Element;
  subTitle?: string;
}

async function Heading ({ children, subTitle }: Props) {
  let userData = null;
  try {
    userData = await authService.whoami();
  } catch (err) {
    userData = null;
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <div className=''>
          <Image src={`/sm_logo_footer.svg`} alt='survey monkey logo' width={250} height={50} />
          <h1 className='mb-5 font-bold text-4xl text-primary'>Webhooks Manager</h1>
        </div>
        <UserInfo userData={userData} />
        <div className='flex justify-end items-center'>
          {children}
        </div>
      </div>
      <h2 className='font-bold text-2xl text-primary text-center mb-5'>{subTitle}</h2>
    </>
  );
}

export default Heading;