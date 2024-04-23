import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Spinner from 'components/UI/Spinner';
import fetch from 'core/api/fetch';
import useSharedState from 'hooks/useSharedState';
import useSWR from 'swr';
import useDashboardContexts from 'views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts';

import useFilterPanelContext from '../../../FilterPanel/contexts/FilterPanelContext';
import ContextNavigation from './ContextNavigation';

const labelKey = 'analytics-context-labels';
type LevelsData = {
  portfolio: string;
  initiative: string;
  team: string;
};

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const ContextNavigationWithData = () => {
  const { data: labels } = useSWR<LevelsData>(labelKey, () =>
    fetch.get(labelKey).then(({ data }) => data),
    {
      revalidateOnFocus: isDevelopmentEnv ? false : true,
      revalidateIfStale: isDevelopmentEnv ? false : true,
      revalidateOnMount: true,
    }
  );

  const {
    applyOtherFilters,
    otherApiQueryParameters,
  } = useFilterPanelContext();

  const [contextId, setContextIdState] = useState<string>('');

  const setContextId = useCallback((contextId: string) => {
    applyOtherFilters({ contextId });
    setContextIdState(contextId);
  },
    [applyOtherFilters, setContextIdState],
  );

  const contextIdInUrlRef = useRef(otherApiQueryParameters.contextId);

  const [shouldShowLoading] = useSharedState('ANALYTICS_DASHBOARD_IS_LOADING');

  const levels = useMemo(
    () => [
      labels?.portfolio ?? 'Portfolio',
      labels?.initiative ?? 'Initiative',
      labels?.team ?? 'Team',
    ],
    [labels],
  );

  const { contexts } = useDashboardContexts();
  // Set initial context id (from url or default)
  useEffect(() => {
    // Do not update context id if it already has a value
    if (contextId) {
      return;
    }
    // Initial context comes from URL if it is defined
    if (contextIdInUrlRef && contextIdInUrlRef.current && typeof contextIdInUrlRef.current === 'string' && !contextId) {
      setContextId(contextIdInUrlRef.current);
      return;
    }
    // Initial context comes from the first option if the options have loaded
    if (contexts && contexts.length) {
      setContextId(contexts[0].id);
      return;
    }
  }, [contextIdInUrlRef, contextIdInUrlRef ? contextIdInUrlRef.current : '', contextId, contexts, contexts ? contexts.length : 0]);

  if (contexts?.find(context => context.id === contextId)?.obeyaId) {
    return (
      <div className="context-navigation-with-spinner">
        <ContextNavigation
          contexts={contexts?.filter(context => context.obeyaId)}
          levels={["Obeya Room"]}
          setContextId={setContextId}
          contextId={contextId}
        />
        {(shouldShowLoading) && <Spinner />}
      </div>
    );
  }
  return (
    <div className="context-navigation-with-spinner">
      <ContextNavigation
        contexts={contexts?.filter(context => !context.obeyaId)}
        levels={levels}
        setContextId={setContextId}
        contextId={contextId}
      />
      {shouldShowLoading && <Spinner />}
    </div>
  );
};

export default ContextNavigationWithData;
