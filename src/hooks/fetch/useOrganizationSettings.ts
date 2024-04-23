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
  staledItemPortfolioLevelNumberOfDays: string;
  staledItemIndividualContributorNumberOfDays: string;
  staledItemTeamLevelNumberOfDays: string;
  excludeWeekends: string;
};

export const endpoint = '/organization-settings';

const useOrganizationSettings = () => {
  return useSWR<OrganizationSettings>(endpoint, defaultFetcher, {
    revalidateOnFocus: false,
  });
};

export default useOrganizationSettings;
