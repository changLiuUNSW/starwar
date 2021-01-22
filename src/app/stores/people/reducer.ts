import { getType } from 'typesafe-actions';
import { People } from '../../models/People';
import { PeopleAction, peopleActions } from './actions';

export interface State {
  loading: boolean;
  previous: string;
  next: string;
  results: People[];
  error: string;
}

const initialState: State = {
  loading: false,
  previous: null,
  next: null,
  results: null,
  error: null,
};

export function reducer(state: State = initialState, action: PeopleAction): State {
  switch (action.type) {
    case getType(peopleActions.init):
      return { ...initialState, loading: true };
    case getType(peopleActions.prev):
    case getType(peopleActions.next):
      return { ...state, error: null, loading: true };
    case getType(peopleActions.success):
      return { ...state, loading: false, ...action.payload };
    case getType(peopleActions.fail):
      return { ...state, loading: false, error: action.payload };
    case getType(peopleActions.reset):
      return initialState;
    default:
      return state;
  }
}

export const getResults = (state: State) => state.results;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getPrevious = (state: State) => state.previous;
export const getNext = (state: State) => state.next;
