import { AccordionsContext } from 'components/UserStateProvider/UserStateProvider';
import {
  useSendTelemetry
} from "core/api/CustomerTelemetryClient";
import { AccordionActions } from "core/api/telemetry/types";
import React, { useMemo } from 'react';
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import memo from 'utils/typescript/memo';

import BaseAccordion from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion";
import { BadgeType } from 'views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion/BaseAccordion';
import { AppliedFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";

type Props = {
  appliedFilters?: AppliedFilters;
  apiQueryParameters?: any;
  title: string;
  defaultExpanded?: boolean;
  Component: (props: any) => JSX.Element | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  customProps?: any;
  afterOpen?: () => void;
  afterClose?: () => void;
  badgeType?: BadgeType;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  customStyle?: any;
};


export const BaseAccordionWithData = React.memo(({
  appliedFilters,
  apiQueryParameters,
  title,
  defaultExpanded,
  Component,
  customProps,
  afterOpen,
  afterClose,
  badgeType,
  icon,
  tooltip,
  customStyle
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const sendTelemetry = useSendTelemetry();
  const history = useHistory();
  const pageKey = history.location.pathname.split('/').pop();

  const store = useContext(AccordionsContext);
  // This is a bit weird. It's a workaround when different accordions have the same title
  // But doing it this way avoids having to change the title in the UI or adding a new prop just to 
  // set the state
  const accordionStateKey = `${title}#${Component.name}`;
  const isOpen = store.isOpen(accordionStateKey);

  // If accordion state is set in the context,
  // that overrides the props
  if (isOpen !== undefined) {
    defaultExpanded = isOpen;
  }

  // Behavior on Change
  const handleOpen = () => {
    afterOpen && afterOpen();
    sendTelemetry(
      AccordionActions.openAccordion,
      `User opened accordion: ${title}`,
      { widget: title, page: pageKey }
    );
    store.setIsOpen(accordionStateKey, true);
  };
  const onClose = useCallback(() => {
    afterClose && afterClose();
    setIsLoading(false);
    sendTelemetry(
      AccordionActions.closeAccordion,
      `User closed accordion: ${title}`
    );
    store.setIsOpen(accordionStateKey, false);
  }, [setIsLoading]);

  // Memoise this component so that it is not re-rendered eveytime this
  // component is rendered. 
  // This component uses useContext. Therefore we need useMemo
  const component = useMemo(() => <Component
    changeLoading={setIsLoading}
    appliedFilters={appliedFilters}
    apiQueryParameters={apiQueryParameters}
    {...customProps}
  />, [setIsLoading, appliedFilters, apiQueryParameters, customProps]);

  return (
    <BaseAccordion
      isLoading={isLoading}
      onClose={onClose}
      title={title}
      defaultExpanded={defaultExpanded}
      onOpen={handleOpen}
      badgeType={badgeType}
      icon={icon}
      tooltip={tooltip}
      customStyle={customStyle}
    >
      {component}
    </BaseAccordion>
  );
});

export default memo(BaseAccordionWithData);