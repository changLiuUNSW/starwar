import { getType } from 'typesafe-actions';
import { Film } from '../../models/Film';
import { FilmAction, filmActions } from './actions';

export interface State {
  films: Film[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  loading: false,
  films: null,
  error: null,
};

export function reducer(state: State = initialState, action: FilmAction): State {
  switch (action.type) {
    case getType(filmActions.load):
      return { ...initialState, loading: true };
    case getType(filmActions.success):
      return { ...state, loading: false, films: action.payload };
    case getType(filmActions.fail):
      return { ...state, loading: false, error: action.payload };
    case getType(filmActions.reset):
      return initialState;
    default:
      return state;
  }
}

export const getFilms = (state: State) => state.films;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
