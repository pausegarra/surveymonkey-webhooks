export { };

declare global {
  interface IFetchService {
    get (
      endpoint: string,
      params?: Record<string, string>,
      headers?: Record<string, string>
    ): Promise<any>;

    post (
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<any>;

    put (
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<any>;

    delete (endpoint: string, headers?: Record<string, string>): Promise<any>;
  }

  interface IwebhookService {
    getAll (): Promise<ApiResponse<Omit<Webhook[], 'event_type' | 'subscription_url' | 'object_type' | 'object_ids'>>>;
    getOne (id: string): Promise<Webhook>;
    create (name: string, event_type: string, object_type: string, object_ids: string[], subscription_url: string, authorization?: string): Promise<void>;
    delete (id: string): Promise<void>;
    update (id: string, data: Omit<Webhook, 'object_type'>): Promise<void>;
  }

  interface ISurveyService {
    getAll (): Promise<ApiResponse<Pick<Survey, 'id' | 'title' | 'nickname' | 'href'>>>;
    search (search: string): Promise<ApiResponse<Pick<Survey, 'id' | 'title' | 'nickname' | 'href'>>>;
  }

  interface IAuthService {
    whoami (): Promise<any>;
  }

  interface ILocalApiService {
    login (token: string): Promise<void>;
    logout (): Promise<void>;
    createWebhook (name: string, subscription_url: string, event_type: string, object_ids: string[]): Promise<void>;
    updateWebhook (id: string, name: string, subscription_url: string, event_type: string, object_ids: string[]): Promise<void>;
  }

  interface Webhook {
    id: string;
    name: string;
    href: string;
    event_type: string;
    subscription_url: string;
    object_type: string;
    object_ids: string[];
  }

  interface Survey {
    title: string;
    nickname: string;
    language: string;
    folder_id: string;
    category: string;
    question_count: number;
    page_count: number;
    response_count: number;
    date_created: string;
    date_modified: string;
    id: string;
    buttons_text: Record<string, string>;
    is_owner: boolean;
    footer: boolean;
    theme_id: string;
    custom_variables: Record<string, string>;
    href: string;
    analyze_url: string;
    edit_url: string;
    collect_url: string;
    summary_url: string;
    preview: string;
  }

  interface SurveyShort extends Pick<Survey, 'id' | 'title' | 'nickname' | 'href'> { }

  interface ApiResponse<T> {
    data: T;
    per_page: number;
    page: number;
    total: number;
    links: Record<string, string>;
  }

  interface Option {
    value: string;
    label: string;
  }
}