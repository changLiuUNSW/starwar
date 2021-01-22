import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState } from '..';
import { ApiService } from '../../services/apiService';
import { peopleActions } from './actions';

export const init: Epic<RootAction, RootAction, RootState, ApiService> = (action$, _, { initPeople }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.init)),
    switchMap(() =>
      initPeople().pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      )
    )
  );

export const prev: Epic<RootAction, RootAction, RootState, ApiService> = (action$, state$, { getPeopleByLink }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.prev)),
    withLatestFrom(state$),
    filter(([_, state]) => !!state.people.previous),
    switchMap(([_, state]) => {
      return getPeopleByLink(state.people.previous).pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      );
    })
  );

export const next: Epic<RootAction, RootAction, RootState, ApiService> = (action$, state$, { getPeopleByLink }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.next)),
    withLatestFrom(state$),
    filter(([_, state]) => !!state.people.next),
    switchMap(([_, state]) =>
      getPeopleByLink(state.people.next).pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      )
    )
  );

export const epics = [init, prev, next];
