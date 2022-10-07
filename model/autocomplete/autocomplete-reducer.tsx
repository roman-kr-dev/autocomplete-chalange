import React from 'react';

export interface State {
  value: string;
  items: string[];
  userSelection: string;
  error: Error | null;
}

type SetValueAction = {
  type: 'SET_VALUE';
  payload: Partial<State>;
}

type SetItemsAction = {
  type: 'SET_ITEMS',
  payload: Partial<State>;
}

type SetUserSelectionAction = {
  type: 'SET_USER_SELECTION',
  payload: Partial<State>;
}

type SetErrorAction = {
  type: 'SET_ERROR',
  payload: Partial<State>;
}


export type Action = SetValueAction | SetItemsAction | SetUserSelectionAction | SetErrorAction;

export const AUTOCOMPLETE_INITIAL_STATE = {
  value: '',
  items: [],
  userSelection: '',
  error: null,
};

const SET_VALUE = 'SET_VALUE';
const SET_ITEMS = 'SET_ITEMS';
const SET_USER_SELECTION = 'SET_USER_SELECTION';
const SET_ERROR = 'SET_ERROR';

export const autocompleteReducer = (state: State, action: Action): State => {
  switch(action.type) {
    case SET_VALUE:
    case SET_ITEMS:
    case SET_ERROR:
      return ({
        ...state,
        ...action.payload,
      });
    case SET_USER_SELECTION:
      return ({
        userSelection: action.payload.userSelection as string,
        value: '',
        items: [],
        error: null,
      });
    default: return state;
  }
}

export const setValueAction = (dispatch: React.Dispatch<SetValueAction>, value: string) => dispatch({
  type: SET_VALUE,
  payload: { value },
});

export const setItemsAction = (dispatch: React.Dispatch<SetItemsAction>,  payload: Partial<State>) => dispatch({
  type: SET_ITEMS,
  payload,
});

export const setUserSelection = (
  dispatch: React.Dispatch<SetUserSelectionAction>,
  userSelection: string,
) => dispatch({
  type: SET_USER_SELECTION,
  payload: { userSelection },
});

export const setErrorAction = (
  dispatch: React.Dispatch<SetErrorAction>,
  error: Error | null,
) => dispatch({
  type: SET_ERROR,
  payload: { error },
});
