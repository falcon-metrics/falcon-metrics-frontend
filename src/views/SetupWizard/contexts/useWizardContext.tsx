import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  generatePath,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import { StepConfig } from '../interfaces/StepConfig';
import {
  defaultWizardRouteParams,
  pathParamsStructure,
  WizardAction,
  WizardRouteParams,
} from '../interfaces/WizardRouteParams';
import {
  getBackAndNextPath,
  getRelativeSteps,
  getStepIndex,
  stepIsCompatibleWithParams,
} from '../utils/utils';

type State = {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isDirty: boolean;
  highestValidStepVisited: number;
  stepConfigs: StepConfig[];
};

export const initialState: State = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  highestValidStepVisited: 0,
  stepConfigs: [],
};

type Payload = Partial<State>;
type Action = Payload & { type: ActionTypes | keyof State };

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export enum ActionTypes {}
const actions: Record<
  ActionTypes,
  (payload: Payload, state: State) => Partial<State>
> = {};

const setContextState = (newStateValues: Partial<State>, state: State) => ({
  ...state,
  ...newStateValues,
});

const wizardReducer = (state = initialState, action: Action): State => {
  const { type, ...payload } = action;
  const actionFunction = actions[type] ?? setContextState;
  return {
    ...state,
    ...actionFunction(payload, state),
  };
};

export const WizardContext = createContext<Context>({
  state: initialState,
  dispatch: () =>
    console.error(
      'Cannot dispatch because Context was used outside of a provider',
    ),
});

type Props = {
  children: ReactNode;
  steps: StepConfig[];
};

export const WizardProvider = ({ children, steps }: Props) => {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialState,
    stepConfigs: steps,
  });
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const match = useRouteMatch<WizardRouteParams>(pathParamsStructure);
  const routeParams = useMemo(
    () => ({
      ...defaultWizardRouteParams,
      ...match?.params,
    }),
    [match],
  );
  const { state, dispatch } = useContext(WizardContext);
  const history = useHistory();
  const { step, action } = routeParams;
  const activeStepIndex = getStepIndex(state.stepConfigs, step);

  const generateWizardPath = useCallback(
    (params?: Partial<WizardRouteParams>) => {
      return generatePath<typeof pathParamsStructure>(pathParamsStructure, {
        ...routeParams,
        ...params,
      });
    },
    [routeParams],
  );

  const [previousStep, nextStep] = getRelativeSteps(
    state.stepConfigs,
    step,
  ).map((s) => s.step);
  const [previousPath, nextPath] = getBackAndNextPath(
    state.stepConfigs,
    routeParams,
  );

  const setWizardState = useCallback(
    (newValues: Partial<State>) => {
      const type = Object.keys(newValues)[0] as keyof typeof newValues;
      dispatch({ type, ...newValues });
    },
    [dispatch],
  );

  const highestValidStepVisited = useMemo(() => {
    const selectedStep = state.stepConfigs.find(
      (s) => s.step === routeParams.step,
    );
    if (!selectedStep) {
      return state.highestValidStepVisited;
    }
    const isCompatible = stepIsCompatibleWithParams(selectedStep, routeParams);
    const activeIndex = isCompatible ? activeStepIndex : -1;
    return Math.max(state.highestValidStepVisited, activeIndex);
  }, [
    state.highestValidStepVisited,
    activeStepIndex,
    routeParams,
    state.stepConfigs,
  ]);

  useEffect(() => {
    setWizardState({
      highestValidStepVisited,
    });
  }, [setWizardState, highestValidStepVisited]);

  const actions = {
    setIsSubmitting: useCallback(
      (isSubmitting: boolean) => setWizardState({ isSubmitting }),
      [setWizardState],
    ),
    setIsSubmitted: useCallback(
      (isSubmitted: boolean) => setWizardState({ isSubmitted }),
      [setWizardState],
    ),
    setIsDirty: useCallback((isDirty: boolean) => {
      return setWizardState({ isDirty });
    }, [
      setWizardState,
    ]),
    goToNext: useCallback(() => history.push(nextPath ?? '/'), [
      history,
      nextPath,
    ]),
    goToPrevious: useCallback(
      () => history.push(previousPath ?? '/datasources'),
      [history, previousPath],
    ),
  };

  const stepFormId = `form-${step}`;
  const isEditMode = action === WizardAction.edit;
  const redirectOnSave =
    !isEditMode && activeStepIndex === highestValidStepVisited;

  return {
    ...state,
    ...actions,
    ...routeParams,
    isEditMode,
    stepFormId,
    setWizardState,
    redirectOnSave,
    previousPath,
    nextPath,
    previousStep,
    nextStep,
    activeStepIndex,
    generateWizardPath,
    highestValidStepVisited,
  };
};

export type WizardState = ReturnType<typeof useWizardContext>;
