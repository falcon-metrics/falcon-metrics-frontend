import axios from 'axios';
import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export type Profile = {
  app_metadata: {
    user_organisation: string;
  };
  user_id: string;
  email?: string;
  email_verified?: boolean;
};

let profileDevelopmentCache: any = null;
export default function useProfile() {
  const { user, getAccessTokenSilently } = useAuth0();

  const getAuth0Token = useCallback(
    () =>
      getAccessTokenSilently({
        scope: 'read:current_user',
        audience: 'https://example.auth0.com/api/v2/',
      }),
    [getAccessTokenSilently],
  );

  const getProfile = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      // Early exit with cache to avoid sending a lot of requests to api while developing
      // console.log(`[${profileDevelopmentCache ? 'cached' : 'uncached'}] useProfile.getProfile requested`);
      if (profileDevelopmentCache) {
        return profileDevelopmentCache;
      }
    }
    const token = await getAuth0Token();

    const response = await axios.get<Profile>(
      `https://example.auth0.com/api/v2/users/${user?.sub}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const profile = response.data;

    // Populate cache to avoid sending a lot of requests to api while developing
    if (process.env.NODE_ENV === 'development' && profile && profile.email) {
      profileDevelopmentCache = profile;
    }

    return profile;
  }, [getAuth0Token, user?.sub]);

  return useSWR('/profile', getProfile, {
    suspense: true,
    shouldRetryOnError: false,
  });
}
