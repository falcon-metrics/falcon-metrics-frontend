import assignWith from 'lodash/assignWith';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import upperFirst from 'lodash/upperFirst';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { isStringRecord } from 'utils/typescript/assertions';
import {
  RequiredKeys,
  TransformedName,
  // SubType,
  // ArrayItemType,
} from 'utils/typescript/types';

export type ObjectConstraint = Record<string, unknown>;
type PayloadConstraint = ObjectConstraint;

type CombinedPayloadsActionsConstraint = Record<
  string | number | symbol,
  <Payload>(state: any, payload: Payload) => void
>;

type GetPayload<Actions extends CombinedPayloadsActionsConstraint> = {
  [K in keyof Actions]: Parameters<Actions[K]>[1];
};

type CombinedPayloads<
  Actions extends CombinedPayloadsActionsConstraint
> = Partial<
  Extract<GetPayload<Actions>[keyof Actions], Record<string, unknown>>
>;

export type ContextType<State extends ObjectConstraint, Action> = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type NormalAction<Payload extends PayloadConstraint, Actions> = {
  payload: Payload;
  type: keyof Actions;
};

type PartialStateAction<State> = {
  payload: Partial<State>;
  type?: undefined;
};

export type ReducerAction<Actions, State, Payload extends PayloadConstraint> =
  | NormalAction<Payload, Actions>
  | PartialStateAction<State>;

function isPartialStateAction<
  Actions,
  State,
  Payload extends PayloadConstraint
>(
  arg: ReducerAction<Actions, State, Payload>,
): arg is PartialStateAction<State> {
  return !('type' in arg);
}

export type ReducerActions<
  ActionTypes extends number | symbol | string,
  State extends ObjectConstraint
> = {
  [K in ActionTypes]: (
    state: RequiredKeys<State>,
    payload: any,
  ) => Partial<State>;
};

function mergeOverridingUndefined(objValue: Object, srcValue: Object) {
  if (isPlainObject(objValue)) {
    return assignWith({}, objValue, srcValue, mergeOverridingUndefined);
  }
  return srcValue;
}

export function getBasicReducer<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State>
>(initialState: RequiredKeys<State>, actions?: Actions) {
  function reducer<Payload extends PayloadConstraint = Partial<State>>(
    state = initialState,
    action: ReducerAction<Actions, State, Payload>,
  ): RequiredKeys<State> {
    if (!action) {
      return state;
    }
    let newStateValues: Partial<State>;
    if (isPartialStateAction(action)) {
      newStateValues = action.payload;
    } else {
      const { type, payload } = action;
      const actionFromList = actions?.[type];
      newStateValues =
        actionFromList?.(state, payload) ?? (state as Partial<State>);
    }

    return mergeOverridingUndefined(state, newStateValues);
  }
  return reducer;
}

export const errorMessage =
  'Cannot dispatch because Context was used outside of a provider';

export const errorDispatch = () => console.error(errorMessage);

export function createDefaultContext<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State>
>(initialState: RequiredKeys<State>) {
  return createContext<
    ContextType<
      RequiredKeys<State>,
      ReducerAction<Actions, State, CombinedPayloads<Actions>>
    >
  >({
    state: initialState,
    dispatch: errorDispatch,
  });
}

/**
 * Returns a React context with default settings.
 *
 * @param initialState must be typed using the utility @typedef RequiredKeys, to enforce the
 * contexts hability to create a setter for each of the states keys.
 * @example: const initialState : RequiredKeys<State> = {key1: '', key2: undefined}
 */
export function getBasicContext<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State>
>(initialState: RequiredKeys<State>, actions?: Actions) {
  const Context = createDefaultContext<State, Actions>(initialState);

  const reducer = getBasicReducer<State, Actions>(initialState, actions);

  type Props = {
    children: ReactNode;
    initialStateProp?: Partial<State>;
  };

  const ContextProvider = ({ children, initialStateProp }: Props) => {
    const [state, dispatch] = useReducer(
      reducer,
      merge(initialState, initialStateProp),
    );

    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  return {
    Context,
    ContextProvider,
  };
}

type StringKeyOf<State> = Extract<keyof State, string>;

type SetterFunction<ValueType> = (value: ValueType) => void;

// const pushToPrefix = 'pushTo';
// type ToPushKey<K extends string> = TransformedName<K, typeof pushToPrefix>;
// const removeAtPrefix = 'remove';
// const removeAtSuffix = 'AtIndex';
// type ToRemoveAtKey<K extends string> = TransformedName<
//   K,
//   typeof removeAtPrefix,
//   typeof removeAtSuffix
// >;

// type ArrayHelper<T> = StringKeyOf<JustArrayKeys<Required<T>>>;

export type SetterWithSubsetters<ValueType> = SetterFunction<ValueType> &
  (Exclude<ValueType, undefined> extends ObjectConstraint
    ? Setters<Exclude<ValueType, undefined>>
    : {});

// type JustArrayKeys<T> = SubType<T, Array<unknown>>;

type Setters<T extends ObjectConstraint> = {
  [K in StringKeyOf<T> as ToSetterKey<K>]: SetterWithSubsetters<T[K]>;
};

// type ArrayMethods<T extends ObjectConstraint> = {
//   [K in ArrayHelper<T> as ToPushKey<K>]: (
//     value: ArrayItemType<Exclude<T[K], undefined>>,
//   ) => void;
// } &
//   {
//     [K in ArrayHelper<T> as ToRemoveAtKey<K>]: (index: number) => void;
//   };

type SettersAndArrayMethods<T extends ObjectConstraint> = Setters<T>; // & ArrayMethods<T>;

type ActionFunctions<
  Actions extends ReducerActions<keyof Actions, State>,
  State extends ObjectConstraint
> = {
  [K in keyof Actions]: Parameters<Actions[K]>[1] extends undefined
    ? () => void
    : undefined extends Parameters<Actions[K]>[1]
    ? (payload?: Parameters<Actions[K]>[1]) => void
    : (payload: Parameters<Actions[K]>[1]) => void;
};

export type UseContextSettersReturn<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State> = never
> = {
  setState: (newStateValues: Partial<State>) => void;
  dispatch: React.Dispatch<
    ReducerAction<
      Actions,
      State,
      CombinedPayloads<ReducerActions<keyof Actions, State>>
    >
  >;
  state: State;
  setters: Setters<State>;
  actions: ActionFunctions<Actions, State>;
};

type ContextArgConstraint<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State> = never
> = React.Context<
  ContextType<
    RequiredKeys<State>,
    ReducerAction<Actions, State, CombinedPayloads<Actions>>
  >
>;

export function useContextSetters<State extends ObjectConstraint>(
  context: ContextArgConstraint<State>,
): UseContextSettersReturn<State>;
export function useContextSetters<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State>
>(
  context: ContextArgConstraint<State, Actions>,
  actions: Actions,
): UseContextSettersReturn<State, Actions>;
export function useContextSetters<
  State extends ObjectConstraint,
  Actions extends ReducerActions<keyof Actions, State>
>(context: ContextArgConstraint<State, Actions>, actions?: Actions) {
  const { state, dispatch } = useContext(context);
  const initialStateRef = useRef(state);
  const setters = useMemo(() => {
    return reduceToSetters(initialStateRef.current, (value: any) =>
      dispatch({ payload: value }),
    );
  }, [dispatch]);

  const dispatchedActions = useMemo(() => {
    if (!actions) {
      return undefined;
    }
    const actionTypes = Object.keys(actions) as Array<keyof Actions>;
    return actionTypes.reduce((result, key) => {
      result[key] = ((payload) => dispatch({ type: key, payload })) as any;
      return result;
    }, {} as ActionFunctions<Actions, State>);
  }, [actions, dispatch]);

  const setState = useCallback(
    (newValues: Partial<State>) => {
      dispatch({ payload: newValues });
    },
    [dispatch],
  );

  return {
    setState,
    state,
    setters,
    actions: dispatchedActions,
  };
}

export function reduceToSetters<T extends ObjectConstraint>(
  object: T,
  parentSetter: (arg: Partial<T>) => void,
) {
  const keys = Object.keys(object) as Array<keyof T>;
  const stringKeys = keys.filter(
    (k) => typeof k === 'string',
  ) as StringKeyOf<T>[];
  return stringKeys.reduce((result, key) => {
    const setter = (value: Partial<T[typeof key]>) => {
      parentSetter({ [key]: value } as Partial<T>);
    };

    const setterWithSubSetters = setter;

    const stateValue = object[key];
    if (isStringRecord(stateValue)) {
      Object.assign(
        setterWithSubSetters,
        reduceToSetters(stateValue, setter),
        // getArrayMethods(stateValue, setter),
      );
    }

    const setterKey = getSetterKey(key);
    // @ts-ignore
    result[setterKey] = setterWithSubSetters;
    return result;
  }, {} as SettersAndArrayMethods<T>);
}

// function getArrayMethods<T extends ObjectConstraint>(
//   object: T,
//   parentSetter: (arg: Partial<T>) => void,
// ) {
//   const keys = Object.keys(object) as Array<keyof object>;
//   const methods = keys.reduce((result, key) => {
//     if (isArray(object[key])) {
//       //@ts-ignore
//       result[getTransformedName<T, typeof pushToPrefix>(key, pushToPrefix)] =
//         (value : T[typeof K]) => parentSetter([key]: value)
//     }
//     return result;
//   }, {} as ArrayMethods<T>);
// }

const setterPrefix = 'set';
export type ToSetterKey<K extends string> = TransformedName<
  K,
  typeof setterPrefix
>;

export function getSetterKey<T>(key: Extract<keyof T, string>) {
  return `${setterPrefix}${upperFirst(key)}` as ToSetterKey<typeof key>;
}

// function getTransformedName<T, Prefix extends string | undefined, Suffix extends string | undefined>(key: Extract<keyof T, string>, prefix ?: Prefix, suffix ?: Suffix) {
//   return `${prefix ?? ''}${prefix ? upperFirst(key) : key}${suffix ?? ''}` as TransformedName<StringKeyOf<T>, Prefix, Suffix>;
// }
