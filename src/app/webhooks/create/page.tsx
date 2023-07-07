import Heading from '@/components/Heading';
import { Link } from '@/components/Link';
import { WebhookForm } from '@/components/WebhookForm';
import React from 'react';

function CreateWebhookPage () {
  return (
    <>
      <Heading subTitle='Create a new webhook'>
        <Link href="/webhooks" className='self-center'>Go Back</Link>
      </Heading>
      <WebhookForm />
    </>
  );
}

export default CreateWebhookPage;