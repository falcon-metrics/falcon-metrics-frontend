import 'regenerator-runtime/runtime';

/* eslint-disable no-var */
import settings from '../settings.json';

export class Connection {
  private baseUrl: URL;

  static getConnection() {
    return new Connection();
  }

  private constructor() {
    // Allow for override of base url via env vars
    // useful when running ui locally
    let baseUrlPath = process.env.REACT_APP_API_BASE_URL
      ? process.env.REACT_APP_API_BASE_URL
      : settings.baseUrl;

    if (!baseUrlPath.endsWith('/')) {
      baseUrlPath = baseUrlPath.concat('/');
    }
    this.baseUrl = new URL(baseUrlPath);
  }

  async getJson(
    path: string,
    queryParameters?:
      | string
      | Record<string, string>
      | URLSearchParams
      | string[][],
    headers?: Record<string, string>,
  ): Promise<any> {
    const parametersString = queryParameters
      ? '?' + new URLSearchParams(queryParameters).toString()
      : '';
    const url = this.baseUrl + path + parametersString;

    const options: any = {
      method: 'GET',
    };

    if (headers && Object.keys(headers).length > 0) {
      options.headers = headers;
    }

    const response = await fetch(url.toString(), options);

    var payload;

    try {
      payload = await response.json();

      if (response.ok) return payload;
    } catch {
      throw new Error('Call to #{getUrl} did not return a json payload');
    }

    throw new Error(
      `Call to ${url} failed with ${response.statusText}: ${payload.message}`,
    );
  }
}
