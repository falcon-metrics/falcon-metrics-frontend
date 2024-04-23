import { ReactNode } from 'react';
import { Box } from '@material-ui/core';

import SectionDivider from 'views/ValueStreamManagement/views/DeliveryManagement/components/SectionDivider';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

interface DonutChartSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  isValidating?: boolean;
  widgetInfo?: WidgetInformation[];
}

const DonutChartSection = ({
  title,
  children,
  id,
  isValidating,
  widgetInfo
}: DonutChartSectionProps) => {
  return (
    <>
      <SectionDivider
        key={`${id}-divider`}
        title={title}
        isValidating={isValidating}
        widgetInfo={widgetInfo}
      />
      <Box 
        className="charts-page-grid full-width-chart"
        data-cy="CustomFieldWidgetsList"
        key={`${id}-chart-container`}
      >
        {children}
      </Box>
    </>
  )
}

export default DonutChartSection;
