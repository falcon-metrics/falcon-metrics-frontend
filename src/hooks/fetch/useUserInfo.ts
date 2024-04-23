import fetch from 'core/api/fetch';
import useSWR, { mutate } from 'swr';

export type UserInfo = {
  userId: string;
  termsAndCondSignedAt?: Date;
  signed: boolean;
  showBanner: boolean;
  hideProductTour: boolean;
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  optInNewsletter: boolean;
  contactForDemo: boolean;
  analyticsDashboardUrl: string;
  enableDashboardBanner: boolean;
};

const key = '/user-info';
const mutateUserInfo = () => mutate(key);

function useUserInfo() {
  const { data: userInfo } = 

  useSWR(
    key, 
    () => fetch.get<UserInfo>(key).then((res) => res.data),
    { suspense: true, revalidateOnFocus: false, }
  );

  return {
    userInfo,
    mutateUserInfo: mutateUserInfo,
  };
}

export default useUserInfo;
