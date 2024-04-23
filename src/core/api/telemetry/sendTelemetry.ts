import { Auth0ContextInterface, User } from "@auth0/auth0-react";
import { Feature, TelemetryActions } from "./types";
import fetch from 'core/api/fetch';
export const getUserFromAuth0User = (auth0: Auth0ContextInterface): User => {
    const { user } = auth0;
    const userInfo: User = {
      name: user?.name ?? '',
      email: user?.email ?? '',
      organisation: user?.['https://example.com/user_organisation'] ?? '',
      roles: user?.['https://example.com/roles'] ?? [],
    };
    return userInfo;
  };
  
  const isUser = (user: any) => user.organisation !== undefined;
  
  export const sendTelemetry = async (
    user: User | Auth0ContextInterface,
    action: TelemetryActions,
    detail: string,
    feature?: Feature,
  ) => {
    if (!isUser(user)) {
      user = user as Auth0ContextInterface;
      user = getUserFromAuth0User(user as Auth0ContextInterface);
    }
    const data = {
      user,
      action,
      detail,
      feature,
    };
    if (process.env.NODE_ENV !== 'production') {
      console.log('telemetry:', data);
      return;
    }
    try {
      await fetch.post('/telemetry', data);
    } catch (error) {
      console.log(error);
    }
  };