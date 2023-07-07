import { FetchService } from './FetchService';

class LocalApiService implements ILocalApiService {
  constructor(private readonly httpClient: IFetchService) { }

  async login (token: string): Promise<void> {
    await this.httpClient.post('/login', { token });
  }

  async logout (): Promise<void> {
    await this.httpClient.post('/logout');
  }

  async createWebhook (name: string, subscription_url: string, event_type: string, object_ids: string[]): Promise<void> {
    const body = {
      name,
      subscription_url,
      event_type,
      object_ids
    };
    await this.httpClient.post('/webhooks', body);
  }

  async updateWebhook (id: string, name: string, subscription_url: string, event_type: string, object_ids: string[]): Promise<void> {
    const body = {
      id,
      name,
      subscription_url,
      event_type,
      object_ids
    };
    await this.httpClient.put(`/webhooks/${id}`, body);
  }
}

const fetchService: IFetchService = new FetchService('/api');
export const localApiService: ILocalApiService = new LocalApiService(fetchService);