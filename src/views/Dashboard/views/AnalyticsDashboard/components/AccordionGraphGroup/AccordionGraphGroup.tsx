import React from 'react';

import { BaseAccordion } from '../BaseAccordion/BaseAccordion';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { useStyles } from './AccordionGraphGroup.styles';

interface AccordionGroupProps {
  /**
   * The groups of separator and charts
   */
  title: string;

  groups: ({ title: string; charts: JSX.Element[]; })[];
}

export const AccordionGraphGroup = ({
  title,
  groups,
}: AccordionGroupProps) => {
  const classes = useStyles();

  return (
    <div className={classes.groupContainer}>
      <BaseAccordion title={title} defaultExpanded={false} >
          <div className="full-width-chart">
            {
              groups.map((group, id) => (
                <React.Fragment key={id}>
                  <SectionDivider title={group.title} />
                  <div className="charts-page-grid full-width-chart" data-cy="CustomFieldWidgetsList" key={id}>
                    {group.charts}
                  </div>
                </React.Fragment>
              ))
            }
          </div>
      </BaseAccordion>
    </div>
  );
};
