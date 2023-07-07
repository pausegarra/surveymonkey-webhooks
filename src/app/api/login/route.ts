import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST (request: Request) {
  const { token } = await request.json();
  cookies().set('smwm_token', token);

  return NextResponse.json({});
}