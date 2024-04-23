import { Connection } from './connection';

describe('getJson Tests', () => {
  test('When base url has no end slash Then call adds the slash', async () => {
    const globalRef: any = global;

    globalRef.fetch = jest.fn(
      (): Promise<any> => {
        return Promise.resolve({
          ok: true,
          json() {
            return Promise.resolve({ hello: 'there' });
          },
        });
      },
    );

    process.env.REACT_APP_API_BASE_URL =
      'https://this.site/hasnoendslash';

    const connection = Connection.getConnection();

    await connection.getJson('hello');

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(
      'https://this.site/hasnoendslash/hello',
      {
        method: 'GET',
      },
    );
  });

  test('When base url already has end slash, Then call does not add another slash', async () => {
    const globalRef: any = global;

    globalRef.fetch = jest.fn(
      (): Promise<any> => {
        return Promise.resolve({
          ok: true,
          json() {
            return Promise.resolve({ there: 'hello' });
          },
        });
      },
    );

    process.env.REACT_APP_API_BASE_URL = 'https://this.site/hasendslash/';

    const connection = Connection.getConnection();

    await connection.getJson('there');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://this.site/hasendslash/there', {
      method: 'GET',
    });
  });
});
