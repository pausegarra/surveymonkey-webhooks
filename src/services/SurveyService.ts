import { FetchService } from './FetchService';
import { cookies } from 'next/headers';

const fetchService: IFetchService = new FetchService('https://api.surveymonkey.com/v3');

class SurveyApiService implements ISurveyService {
  constructor(private readonly httpService: IFetchService) { }

  async getAll (): Promise<ApiResponse<Pick<Survey, 'id' | 'title' | 'nickname' | 'href'>>> {
    const token = cookies().get('smwm_token');
    return this.httpService.get('/surveys', {}, { Authorization: `Bearer ${token?.value}` });
  }

  async search (search: string): Promise<ApiResponse<Pick<Survey, 'id' | 'title' | 'nickname' | 'href'>>> {
    const token = cookies().get('smwm_token');
    let url = '/surveys';
    if (search !== '') url = `${url}?title=${search}`;

    return this.httpService.get(url, {}, { Authorization: `Bearer ${token?.value}` });
  }
}

export const surveyService: ISurveyService = new SurveyApiService(fetchService);