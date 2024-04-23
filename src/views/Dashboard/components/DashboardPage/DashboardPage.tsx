import React, { ReactNode } from 'react';
import memo from 'utils/typescript/memo';
import { ChartConfigFlags } from 'components/Charts/components/DefaultDashboardCard';

export type Props = {
  children: ReactNode;
} & ChartConfigFlags;

const DashboardPage = ({ children, ...chartFlags }: Props) => {
  return (
    <div className="charts-page-grid" data-cy="WidgetsList">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...chartFlags });
        }
        return child;
      })}
    </div>
  );
};

export default memo(DashboardPage);
