declare module 'expect-http-client-matchers' {
  export const matchers: import('./shared').CustomMatchers<any>;

  export interface ConfigureOptions {
    customAdapters?: (typeof HttpClientAdapter)[];
    defaultAdapterName?: string;
  }

  export function configure(options?: ConfigureOptions): void;

  export type CanAdapterHandle = 'no' | 'yes' | 'maybe';
  export abstract class HttpClientAdapter<Response> {
    /**
     * The name of the client the adapter
     *
     * @example axios
     */
    public static name: string;

    /**
     * The current response
     * @protected
     */
    protected response: Response;

    protected constructor(response: Response);

    /**
     * Test whether this response can be handled by this adapter
     */
    public static canHandle(response: any): CanAdapterHandle;

    /**
     * Get the url of the request, **this may be called multiple times**
     */
    public abstract getUrl(): string;

    /**
     * Get the status code of the response, **this may be called multiple times**
     */
    public abstract getStatusCode(): number;

    /**
     * Get the headers of the response, **this may be called multiple times**
     */
    public abstract getHeaders(): Record<string, string>;

    /**
     * Get the body of the response, **this may be called multiple times**
     */
    public abstract getBody(): unknown;
  }
}
