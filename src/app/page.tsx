import Heading from '@/components/Heading';
import TokenForm from '@/components/TokenForm';
import React from 'react';

function HomePage () {
  return (
    <>
      <Heading subTitle='Insert your API token'></Heading>
      <TokenForm />
    </>
  );
}

export default HomePage;