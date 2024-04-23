import { useRouteMatch } from 'react-router';
import { getLeanPortfolioRoute, LeanPortfolioIndices } from 'utils/routes';

export const defaultIndex = LeanPortfolioIndices.LeanPortfolioHome;

export const useLeanPortfolioTab = function () {
  const { params: { tab = defaultIndex } = {} } =
    useRouteMatch<{ tab: LeanPortfolioIndices }>(
      getLeanPortfolioRoute(':tab'),
    ) ?? {};
  return tab;
}
