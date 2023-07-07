import { webhookService } from '@/services/WebhookService';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const revalidate = 10;

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE (request: Request, { params }: Params) {
  const { id } = params;
  await webhookService.delete(id);
  revalidatePath('/webhooks');
}

export async function PUT (request: Request, { params }: Params) {
  const { id, href, ...restOrData } = await request.json();
  await webhookService.update(id, restOrData);
  return NextResponse.json({ message: 'webhook_updated' });
}