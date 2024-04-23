import { useRouteMatch } from 'react-router';
import { BaseRoutes, getPage } from 'utils/routes';

export const useLandingPage = function () {
  const { params: { page = BaseRoutes.AnalyticsDashboard } = {} } =
    useRouteMatch<{ page: BaseRoutes }>(
      getPage(':page'),
    ) ?? {};
  return page;
}
