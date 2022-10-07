import React, { Dispatch, ReducerAction, SetStateAction} from 'react';
import {
  autocompleteReducer,
  AUTOCOMPLETE_INITIAL_STATE,
  Action,
  State,
} from './autocomplete-reducer';

interface AutocompleteContextValue {
  state: State,
  dispatch: React.Dispatch<Action>,
};

const AutocompleteContext = React.createContext<AutocompleteContextValue | null>(null);

export const useAutocompleteContext = () => {
  const context = React.useContext(AutocompleteContext)

  if (!context) {
    throw new Error(`useAutocompleteContext must be used inside AutoCompleteProvider`);
  }

  return context;
}

interface AutoCompleteProviderProps {
  children: React.ReactNode;
  className?: string;
}

export const AutoCompleteProvider: React.FC<AutoCompleteProviderProps> = (props) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    autocompleteReducer,
    AUTOCOMPLETE_INITIAL_STATE,
  );

  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <AutocompleteContext.Provider value={value} {...props} />
}
