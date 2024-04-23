import { SelectedContextIdContext, SelectedLeftNavContext } from 'components/UserStateProvider/UserStateProvider';
import find from 'lodash/find';
import {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { BaseRoutes } from 'utils/routes';
import {
  Context
} from 'views/Dashboard/views/AnalyticsDashboard/interfaces/Context';
import ContextDropdown from './components/ContextDropdown';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export type Props = {
  levels: string[];
  contexts: Context[] | undefined;
  contextId: string;
  setContextId(contextId: string): void;
};

export const getNestedContexts = (contexts: Context[], depth: number): Context[] => {
  if (!depth) {
    return contexts;
  }
  const children = contexts
    .flatMap((context) => context.children)
    .filter((children): children is Context => typeof children !== 'undefined');
  return getNestedContexts(children, depth - 1);
};

/**
 * Get the children of the given context. 
 * 
 * Returns an empty list if there are no children
 */
export const getChildren = (selectedContextId: string, allContexts: Context[]) => {
  // Only top level contexts have the obeya id
  const level1Contexts = allContexts
    .filter(c => c.obeyaId === null);
  const level2Contexts = level1Contexts
    .map(c => c.children ?? [])
    .reduce((accum, current) => [...accum, ...current], []);
  const level3Contexts = level2Contexts
    .map(c => c.children ?? [])
    .reduce((accum, current) => [...accum, ...current], []);

  // Handle top level "All" as a special case
  if (level1Contexts.find(c => c.id === selectedContextId)?.displayName === 'All') {
    return level1Contexts.filter(c => c.displayName !== 'All');
  }

  let context = level3Contexts.find(c => c.id === selectedContextId);
  // If 3rd level context - no children
  if (context !== undefined) {
    return [];
  }

  // If 2nd level context
  context = level2Contexts.find(c => c.id === selectedContextId);
  if (context !== undefined) {
    return context.children;
  }

  // If 1st level context
  context = level1Contexts.find(c => c.id === selectedContextId);
  if (context !== undefined) {
    return context.children;
  }

  // Fallback
  return [];
};

const ContextNavigation = ({
  levels,
  contexts,
  setContextId,
  contextId,
}: Props) => {
  const history = useHistory();
  const { setTab } = useContext(SelectedLeftNavContext);
  const { contextId: globalContextId, setContextId: setGlobalContextId, setSelectedKeys: setGlobalSelectedKeys } = useContext(SelectedContextIdContext);

  const buildSelectedKeys = useCallback((contextId: string) => {
    // There exists a currently selected context id, and the top level is empty
    // The top level has to always be selected, so we must find a value for it here
    // So we will find the matching context and its top level and select both
    let newSelectedKeys: string[] | null = null;
    for (const c of contexts ?? []) {
      if (c.id === contextId) {
        newSelectedKeys = [c.id, '', ''];
      }
      for (const context1 of c.children ?? []) {
        if (context1.id === contextId) {
          newSelectedKeys = [c.id, context1.id, ''];
        }
        for (const context2 of context1.children ?? []) {
          if (context2.id === contextId) {
            newSelectedKeys = [c.id, context1.id, context2.id];
          }
        }
      }

    }
    return newSelectedKeys;
  }, [contexts]);


  /**
   * This effect is triggered whenever the context id is set by any other 
   * component than the context selector component. 
   * 
   * At the time of writing this, the context id is set only when 
   * switching to a specific strategy page
   */
  useEffect(() => {
    const newSelectedKeys = buildSelectedKeys(globalContextId);

    if (newSelectedKeys) {
      setSelectedKeys(newSelectedKeys);
    }
  }, [globalContextId]);



  const getOptions = useCallback(
    (levelIndex: number, selectedKeys: string[]) => {
      const previousSelected = selectedKeys.filter((_, i) => i < levelIndex);
      const options = previousSelected.reduce((res, selectedKey) => {
        if (selectedKey) {
          const selectedMap = find(res, { id: selectedKey });
          return selectedMap?.children ?? [];
        }
        return getNestedContexts(res, 1);
      }, contexts ? contexts : []);
      return options;
    },
    [contexts],
  );

  const [selectedKeys, setSelectedKeyState] = useState(['', '', '']);

  const setSelectedKeys = useCallback((values) => {
    setSelectedKeyState(values);
    setContextId(getLastSelectedKey(values));
    setGlobalContextId(getLastSelectedKey(values));
  }, [setSelectedKeyState]);

  useEffect(() => {
    setGlobalSelectedKeys(selectedKeys);
  }, [selectedKeys]);

  useEffect(() => {
    if (contextId && selectedKeys[0] === '') {
      // There exists a currently selected context id, and the top level is empty
      // The top level has to always be selected, so we must find a value for it here
      // So we will find the matching context and its top level and select both
      const newSelectedKeys = buildSelectedKeys(contextId);
      if (newSelectedKeys) {
        setSelectedKeys(newSelectedKeys);
      }
    }
  }, [getOptions, selectedKeys, contextId, contexts, levels]);

  const onDropdownMenuOptionChanged = useCallback((key: string, levelIndex: number) => {
    const newSelectedKeys = [selectedKeys[0], selectedKeys[1], selectedKeys[2]];
    if (levelIndex === 0) {
      // When the first context menu is selected, the second and third one have to be reseted
      newSelectedKeys[1] = '';
      newSelectedKeys[2] = '';
    } else if (levelIndex === 1) {
      // When the second context menu is selected, the third one has to be reseted
      newSelectedKeys[2] = '';
    }
    newSelectedKeys[levelIndex] = key;
    setSelectedKeys(newSelectedKeys);
    return;
  }, [selectedKeys, setSelectedKeys]);



  const getLastSelectedKey = (keys: string[]) => {
    const filledSelectedKeys = keys.filter((k) => !!k);
    return filledSelectedKeys[filledSelectedKeys.length - 1];
  };


  if (contexts?.find(context => context.id === contextId)?.obeyaId) {
    return <div className='widget-title' onClick={() => { setTab(BaseRoutes.InitiativeSocialFeed); history.push(BaseRoutes.InitiativeSocialFeed); }}> <ArrowBackIcon className='obeya-name-link obeya-name-arrow' /><div className='obeya-name-link'>{contexts.find(context => context.id === contextId)?.displayName}</div></div>;
  }

  return (
    <div className="context-container">
      <div className="context-selection" data-tour="boards-and-aggregations">
        {levels.map((level, levelIndex) => {
          const subContextMap = getOptions(levelIndex, selectedKeys);
          const dropdownId = 'contextDropdown' + levelIndex.toString();
          return (
            <div
              key={level}
              style={{ position: 'relative', paddingTop: 20 }}
              data-cy={dropdownId}
            >
              <ContextDropdown
                label={level}
                addAllOption={levelIndex !== 0}
                options={Array.from(subContextMap).map(
                  ({ id, displayName }) => ({
                    key: id,
                    text: displayName,
                  }),
                )}
                onChange={(key: string) => onDropdownMenuOptionChanged(key, levelIndex)}
                selectedKey={selectedKeys[levelIndex]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextNavigation;