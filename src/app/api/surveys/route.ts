import { surveyService } from '@/services/SurveyService';
import { NextResponse } from 'next/server';

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  const surveys = await surveyService.search(search);
  return NextResponse.json(surveys.data);
}