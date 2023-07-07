import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST () {
  cookies().set({
    name: 'smwm_token',
    value: '',
    expires: new Date('2016-10-05'),
  });
  return NextResponse.json({});
}