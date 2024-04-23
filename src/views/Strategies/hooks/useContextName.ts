import { useContext, useEffect, useState, useMemo } from 'react';
import useDashboardContexts from 'views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import { getFlattenContextList } from '../utils';

export function useContextName(defaultContext = 'Enterprise') {
  const [selectedContext, setSelectedContext] = useState<string | undefined>();

  const { contexts } = useDashboardContexts();
  const { contextId } = useContext(SelectedContextIdContext);
  const flattenContexts = useMemo(() => getFlattenContextList(contexts), [contexts]);
  useEffect(() => {
    const [currentContext] = flattenContexts?.filter((context) => context.id === contextId) || [];
    if (currentContext && currentContext?.displayName) {
      setSelectedContext(currentContext?.displayName);
    } else {
      setSelectedContext(defaultContext);
    }
  }, [flattenContexts, contextId]);
  return {
    selectedContext,
    flattenContexts
  };
};
