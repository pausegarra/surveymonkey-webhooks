import { FetchService } from './FetchService';
import { cookies } from 'next/headers';

const fetchService: IFetchService = new FetchService('https://api.surveymonkey.com/v3');

class WebhookApiService implements IwebhookService {
  constructor(private readonly httpService: IFetchService) { }

  async getAll (): Promise<ApiResponse<Omit<Webhook[], 'event_type' | 'subscription_url' | 'object_type' | 'object_ids'>>> {
    const token = cookies().get('smwm_token');
    return await this.httpService.get('/webhooks', {}, { Authorization: `Bearer ${token?.value}` });
  }

  async getOne (id: string): Promise<Webhook> {
    const token = cookies().get('smwm_token');
    return await this.httpService.get(`/webhooks/${id}`, {}, { Authorization: `Bearer ${token?.value}` });
  }

  async create (name: string, event_type: string, object_type: string, object_ids: string[], subscription_url: string, authorization: string = "") {
    const token = cookies().get('smwm_token');
    const body = {
      name,
      event_type,
      object_ids,
      object_type,
      subscription_url
    };
    return await this.httpService.post('/webhooks', body, { Authorization: `Bearer ${token?.value}` });
  }

  async delete (id: string): Promise<void> {
    const token = cookies().get('smwm_token');
    return await this.httpService.delete(`/webhooks/${id}`, { Authorization: `Bearer ${token?.value}` });
  }

  async update (id: string, data: Omit<Webhook, 'object_type'>): Promise<void> {
    const token = cookies().get('smwm_token');
    return await this.httpService.put(`/webhooks/${id}`, { ...data, object_type: 'survey' }, { Authorization: `Bearer ${token?.value}` });
  }
}

export const webhookService: IwebhookService = new WebhookApiService(fetchService);