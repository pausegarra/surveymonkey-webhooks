import Heading from '@/components/Heading';
import { Link } from '@/components/Link';
import { WebhookForm } from '@/components/WebhookForm';
import { webhookService } from '@/services/WebhookService';
import React from 'react';

interface Props {
  params: Record<string, string>;
}

async function WebhookPage ({ params }: Props) {
  const webhook = await webhookService.getOne(params.id);

  return (
    <>
      <Heading subTitle={`Edit webhook: ${webhook.name}`}>
        <Link href="/webhooks" className='self-center'>Go Back</Link>
      </Heading>
      <WebhookForm initData={webhook} />
    </>
  );
}

export default WebhookPage;