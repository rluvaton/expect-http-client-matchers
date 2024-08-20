export type CanAdapterHandle = 'no' | 'yes' | 'maybe';

export abstract class HttpClientAdapter<Response> {
  /**
   * The name of the client the adapter
   *
   * @example axios
   */
  public static name: string;

  protected constructor(response: Response);

  /**
   * Test whether this response can be handled by this adapter
   */
  public static canHandle(response: any): CanAdapterHandle;

  /**
   * Get the url of the request, **this may be called multiple times**
   */
  public getUrl(): string;

  /**
   * Get the status code of the response, **this may be called multiple times**
   */
  public getStatusCode(): number;

  /**
   * Get the headers of the response, **this may be called multiple times**
   */
  public getHeaders(): Record<string, string>;

  /**
   * Get the body of the response, **this may be called multiple times**
   */
  public getBody(): unknown;
}

export type UnknownHttpClientAdapter = typeof HttpClientAdapter<any>;
