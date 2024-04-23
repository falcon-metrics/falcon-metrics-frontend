import React, { ComponentType, memo } from 'react';

import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  BaseRoutes,
  LeanPortfolioIndices,
  getLeanPortfolioRoute,
} from 'utils/routes';

const PortfolioBoardPage = React.lazy(() => import('./PortfolioBoardPage'));
const NorthStarPage = React.lazy(() => import('../NorthStar/views/NorthStarPage'));
const NorthStarEditPage = React.lazy(() => import('../NorthStar/views/components/StrategicDriverDetail'));
const BusinessScorecard = React.lazy(() => import('../BusinessScorecard'));
const StrategiesPage = React.lazy(() => import('../Strategies'));
const ReactFlowLinkMap = React.lazy(() => import('./LinkMap/index'));

export const LeanPortfolioPages: Array<
  [string, LeanPortfolioIndices, ComponentType<any>]
> = [
    ['Portfolio Board', LeanPortfolioIndices.LeanPortfolioHome, PortfolioBoardPage],
    ['Business Scorecard', LeanPortfolioIndices.Scorecard, BusinessScorecard],
    ['Strategy', LeanPortfolioIndices.Strategies, StrategiesPage],
    ['North Star', LeanPortfolioIndices.NorthStar, NorthStarPage],
    ['Link Map', LeanPortfolioIndices.LinkMap, ReactFlowLinkMap],
    ['Edit Strategic Driver', LeanPortfolioIndices.NorthStarEdit, NorthStarEditPage],
  ];

const LeanPortfolio = (props) => (
  <Switch>
    {LeanPortfolioPages.map(([, pageIndex, Component]) => (
      <Route
        exact
        key={pageIndex}
        path={getLeanPortfolioRoute(pageIndex)}
        render={() => <Component {...props} />}
      />
    ))}
    <Redirect to={BaseRoutes.LeanPortfolio} />
  </Switch>
);

export default memo(LeanPortfolio);
