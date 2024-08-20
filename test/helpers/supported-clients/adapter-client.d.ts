export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

interface Headers {
  [key: string]: string | string[] | number | boolean | null;
}

export interface RequestConfig {
  method?: Method | string;
  headers?: Headers;
  params?: any;
  data?: any;
}

export interface TestAdapterClient {
  name: string;

  request(url: string, config: RequestConfig): Promise<any>;

  get(url: string, config?: RequestConfig): Promise<any>;
  delete(url: string, config?: RequestConfig): Promise<any>;
  head(url: string, config?: RequestConfig): Promise<any>;
  options(url: string, config?: RequestConfig): Promise<any>;
  post(url: string, data?: any, config?: RequestConfig): Promise<any>;
  put(url: string, data?: any, config?: RequestConfig): Promise<any>;
  patch(url: string, data?: any, config?: RequestConfig): Promise<any>;
}
