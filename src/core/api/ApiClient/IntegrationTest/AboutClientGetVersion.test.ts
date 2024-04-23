import { AboutClient } from '../AboutClient';

describe('API /about endpoint', () => {
  xtest('should return api version', async () => {
    const version = await new AboutClient().getVersion();

    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    expect(timestampRegex.test(version)).toBe(true);
  });
});
export { };
