import {
  useCallback,
  useMemo,
} from 'react';

import { useAuth0 } from '@auth0/auth0-react';

export type User = {
  name: string;
  email: string;
  organisation: string;
  roles: string[];
  userId?: string;
};

export enum Roles {
  PowerUser = 'powerUser',
  StandardUser = 'standardUser',
  GovernanceObeya = 'governance_obeya',
  AdminUser = 'user_admin',
  Beta = 'beta',
  Administrator = 'administrator',
  Alpha = 'alpha'
}

function useAuthentication() {
  const {
    user,
    isLoading,
    isAuthenticated: authenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const isAuthenticated = useCallback(() => {
    return !isLoading && authenticated;
  }, [authenticated, isLoading]);

  const getIdToken = useCallback(
    () => getIdTokenClaims().then((claims) => claims?.__raw),
    [getIdTokenClaims],
  );

  const getAuth0Token = useCallback(
    () =>
      getAccessTokenSilently({
        scope: 'read:current_user',
        audience: 'https://example.auth0.com/api/v2/',
      }),
    [getAccessTokenSilently],
  );

  const getApiToken = useCallback(
    () =>
      getAccessTokenSilently({
        audience: 'https://api.example.com/',
      }),
    [getAccessTokenSilently],
  );
  const userRoles: string[] = useMemo(
    () => user?.['https://example.com/roles'] ?? [],
    [user],
  );

  const userOrg: string =
    user?.['https://example.com/user_organisation'] ?? '';

  const isInRole = useCallback(
    (...roles: string[]): boolean => {
      if (!isAuthenticated() && !user) {
        return false;
      }

      return roles.some((role) => userRoles.includes(role));
    },

    [user, isAuthenticated, userRoles],
  );

  // demo user is when belongs a example org or that has info+demo on the email
  const isDemoUser = useMemo(() => {
    return (
      (userOrg === 'example' && !isInRole('trial')) ||
      (user?.email?.includes('info+demo') && !isInRole('trial')) ||
      userOrg === 'demo-day'
    );
  }, [user, isInRole, userOrg]);

  const isAdmin = useMemo(() => {
    return isInRole(Roles.AdminUser) || isInRole(Roles.Administrator) || isInRole(Roles.PowerUser);
  }, [user, isInRole]);

  const isPowerUser = useMemo(() => {
    return isInRole(Roles.PowerUser);
  }, [user, isInRole]);

  const isAlphaUser = useMemo(() => {
    return isInRole(Roles.Alpha);
  }, [user, isInRole]);

  const isBetaUser = useMemo(() => {
    return isInRole(Roles.Beta);
  }, [user, isInRole]);

  const isAdminOrPowerUser = isAdmin || isPowerUser;

  const userInfo: User = useMemo(() => {
    return {
      name: user?.name ?? '',
      email: user?.email ?? '',
      organisation: userOrg,
      roles: userRoles,
      userId: user?.sub ?? '',
    };
  }, [user, userRoles, userOrg]);

  const isStandardUser = useMemo(() => {
    return isInRole(Roles.StandardUser);
  }, [user, isInRole]);

  return {
    isAdmin,
    isPowerUser,
    isStandardUser,
    isAlphaUser,
    isBetaUser,
    user,
    isLoading,
    isAuthenticated,
    isInRole,
    isDemoUser,
    getIdToken,
    getApiToken,
    getAuth0Token,
    loginWithRedirect,
    userInfo,
    isAdminOrPowerUser
  };
}

export default useAuthentication;
