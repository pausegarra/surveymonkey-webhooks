import { FetchService } from './FetchService';
import { cookies } from 'next/headers';

const fetchService: IFetchService = new FetchService('https://api.surveymonkey.com/v3');
class AuthService implements IAuthService {
  constructor(private readonly httpService: IFetchService) { }

  async whoami (): Promise<any> {
    const token = cookies().get('smwm_token');
    return await this.httpService.get('/users/me', {}, { Authorization: `Bearer ${token?.value}` });
  }
}

export const authService: IAuthService = new AuthService(fetchService);
