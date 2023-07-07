import { webhookService } from '@/services/WebhookService';
import { NextResponse } from 'next/server';

interface Item {
  id: string;
}

export async function POST (request: Request) {
  const { object_ids, name, event_type, subscription_url } = await request.json();
  console.log({ object_ids, name, event_type, subscription_url });
  try {
    const response = await webhookService.create(name, event_type, 'survey', object_ids, subscription_url);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}