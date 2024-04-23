import { act, render } from '@testing-library/react';
import { ReactNode, useContext } from 'react';
import { RequiredKeys } from 'utils/typescript/types';
import {
  getBasicContext,
  ContextType,
  useContextSetters,
  ReducerActions,
  UseContextSettersReturn,
  getBasicReducer,
  errorMessage,
} from '../contextApi';

type State = {
  heroName: string;
  realName: string;
  typeOfPowers: string;
  powerLevel: {
    strength: number;
    stamina: number;
    speed: number;
    others?: {
      money?: number;
      intelligence?: number;
    };
  };
};

const initialState: RequiredKeys<State> = {
  heroName: 'Iron Man',
  realName: 'Tony Stark',
  typeOfPowers: 'Technology',
  powerLevel: {
    strength: 6,
    stamina: 6,
    speed: 8,
    others: {
      intelligence: 10,
      money: undefined,
    },
  },
};

const secondState: State = {
  heroName: 'Captain America',
  realName: 'Steve Rogers',
  typeOfPowers: 'Physical',
  powerLevel: {
    strength: 4,
    stamina: 7,
    speed: 3,
  },
};

const actions = {
  removeSpaces: (state: State) => {
    const keys = Object.keys(state) as Array<keyof State>;
    return keys.reduce((result, key) => {
      const value = state[key];
      let partial: Partial<State> = {};
      if (typeof value === 'string') {
        partial = { [key]: value.replace(' ', '') };
      }
      return {
        ...result,
        ...partial,
      };
    }, {} as State);
  },
};

type Context = ContextType<State, typeof actions>;

const consumeContext = (
  context: React.Context<any>,
  Parent: React.ComponentType<{ children: ReactNode }>,
) => {
  let returnVal: Context | undefined;
  const TestComponent = () => {
    returnVal = useContext(context);
    return null;
  };
  render(
    <Parent>
      <TestComponent />
    </Parent>,
  );
  return returnVal;
};

const consumeContextHook = (
  context: React.Context<any>,
  Parent: React.ComponentType<{ children: ReactNode }>,
  onChange?: (value: any) => void,
) => {
  let returnVal:
    | UseContextSettersReturn<
        State,
        ReducerActions<keyof typeof actions, State>
      >
    | undefined;
  const TestComponent = () => {
    returnVal = useContextSetters(context, actions);
    onChange?.(returnVal);

    return null;
  };
  render(
    <Parent>
      <TestComponent />
    </Parent>,
  );
  return returnVal;
};

describe('getBasicReducer', () => {
  const reducer = getBasicReducer(initialState, actions);

  test('When reducer is called with action without type, it should return the initial state complemented by the payload', () => {
    const payload = { heroName: 'Spider-Man' };
    expect(reducer(initialState, { payload })).toMatchObject({
      ...initialState,
      ...payload,
    });
  });
});

describe('Create context', () => {
  const { Context, ContextProvider } = getBasicContext(initialState, actions);
  const NonProviderParent = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );

  test('When context is consumed outside provider, dispatch should log error', async () => {
    console.error = jest.fn();
    const consumedContext = consumeContext(Context, NonProviderParent);
    consumedContext?.dispatch(undefined as any);
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  test('State should be equal to initialState before making changes', async () => {
    const consumedContext = consumeContext(Context, ContextProvider);
    expect(consumedContext?.state).toMatchObject(initialState);
  });

  test('State should be updated after setter is called', async () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const {
      setters: { setHeroName, setRealName, setTypeOfPowers, setPowerLevel },
    } = state;
    setHeroName(secondState.heroName);
    setRealName(secondState.realName);
    setTypeOfPowers(secondState.typeOfPowers);
    setPowerLevel(secondState.powerLevel);
    expect(result.state).toMatchObject(secondState);
  });

  test('State should be transformed by action after action is called', () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const {
      actions: { removeSpaces },
    } = state;
    removeSpaces(undefined);
    expect(result.state).toMatchObject(actions.removeSpaces(initialState));
  });

  test('State subkey should be transformed by setter after setter is called', () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const {
      setters: {
        setPowerLevel: { setSpeed },
      },
    } = state;
    const newSpeed = 10;
    act(() => setSpeed(newSpeed));
    expect(result.state).toMatchObject({
      ...initialState,
      powerLevel: { ...initialState.powerLevel, speed: newSpeed },
    });
  });

  test('State subkey of third level should be transformed by setter after setter is called', () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const {
      setters: {
        setPowerLevel: { setOthers },
      },
    } = state;
    const newIntelligence = 10;
    act(() => setOthers.setIntelligence(newIntelligence));
    expect(result.state).toMatchObject({
      ...initialState,
      powerLevel: {
        ...initialState.powerLevel,
        others: {
          ...initialState.powerLevel.others,
          intelligence: newIntelligence,
        },
      },
    });
  });

  test('Setter updates when value is undefined', () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const {
      setters: {
        setPowerLevel: { setOthers },
      },
    } = state;
    const newIntelligence = undefined;
    act(() => setOthers.setIntelligence(newIntelligence));
    expect(result.state.powerLevel.others.intelligence).toBe(newIntelligence);
  });

  test('Optional subkeys should show up as setters', () => {
    const result: any = {};
    const onChange = (value: any) => Object.assign(result, value);
    const state = consumeContextHook(Context, ContextProvider, onChange);
    if (!state) {
      return;
    }
    const { setters } = state;
    expect(setters.setPowerLevel.setOthers.setMoney).toBeInstanceOf(Function);
  });
});
