import { defaultFetcher } from 'core/api/fetch';
import useSWR from 'swr';

export type OrganizationSettings = {
  orgId: string;
  rollingWindowPeriodInDays: string;
  portfolioDisplayName: string;
  initiativeDisplayName: string;
  teamDisplayName: string;
  staledItemNumberOfDays: string;
  logoUrl: string;
  timezone: string;
  ingestAssignee: boolean;
  ingestTitle: boolean;
};

export const endpoint = '/organization-settings';

const useOrganizationSettings = () => {
  return useSWR<OrganizationSettings>(endpoint, defaultFetcher);
};

export default useOrganizationSettings;
