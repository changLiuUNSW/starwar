import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createSelector } from 'reselect';
import { PeopleAction } from './people/actions';
import { FilmAction } from './film/actions';
import * as fromFilm from './film/reducer';
import * as fromPeople from './people/reducer';
import { epics as peopleEipcs } from './people/epics';
import { epics as filmEipcs } from './film/epics';
import { ApiService, apiService } from '../services/apiService';

export type RootAction = PeopleAction | FilmAction;

export interface RootState {
  people: fromPeople.State;
  film: fromFilm.State;
}

const rootReducer = combineReducers<RootState>({
  people: fromPeople.reducer,
  film: fromFilm.reducer,
});

const rootEpic = combineEpics(...peopleEipcs, ...filmEipcs);

function configureStore() {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, ApiService>({
    dependencies: apiService,
  });

  const store =
    process.env.NODE_ENV === 'development'
      ? createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(immutableStateInvariantMiddleware(), epicMiddleware))
        )
      : createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}

export default configureStore;

export const store = configureStore();

export const getPeopleState = (state: RootState) => state.people;

export const getPeopleLoading = createSelector(getPeopleState, fromPeople.getLoading);
export const getPeopleResults = createSelector(getPeopleState, fromPeople.getResults);
export const getPeopleError = createSelector(getPeopleState, fromPeople.getError);
export const getPeoplePrevious = createSelector(getPeopleState, fromPeople.getPrevious);
export const getPeopleNext = createSelector(getPeopleState, fromPeople.getNext);

export const getFilmState = (state: RootState) => state.film;

export const getFilmFilms = createSelector(getFilmState, fromFilm.getFilms);
export const getFilmLoading = createSelector(getFilmState, fromFilm.getLoading);
export const getFilmError = createSelector(getFilmState, fromFilm.getError);
