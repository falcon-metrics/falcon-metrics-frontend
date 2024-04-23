import React from 'react';
import { ComponentType, memo } from 'react';

import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  BaseRoutes,
  NorthStarIndexes,
  getNorthStarRoute,
} from 'utils/routes';

const NorthStarPage = React.lazy(() => import('./views/NorthStarPage'));
const NorthStarPageEdit = React.lazy(() => import('./views/components/StrategicDriverDetail'));

export const NorthStarPages: Array<
  [string, NorthStarIndexes, ComponentType<any>]
> = [
  ['North Star', NorthStarIndexes.NorthStarHome, NorthStarPage],
  ['North Star Edit', NorthStarIndexes.NorthStarEdit, NorthStarPageEdit],
];

const NorthStar = (props) => (
  <Switch>
    {NorthStarPages.map(([, pageIndex, Component]) => (
      <Route
        exact
        key={pageIndex}
        path={getNorthStarRoute(pageIndex)}
        render={() => <Component {...props} />}
      />
    ))}
    <Redirect to={BaseRoutes.NorthStar} />
  </Switch>
);

export default memo(NorthStar);
