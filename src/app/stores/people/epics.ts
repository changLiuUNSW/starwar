import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Dependencies, RootAction, RootState } from '..';
import { peopleActions } from './actions';

const init: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, _, { apiService }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.init)),
    switchMap(() =>
      apiService.initPeople().pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      )
    )
  );

const prev: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, state$, { apiService }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.prev)),
    withLatestFrom(state$),
    filter(([_, state]) => !!state.people.previous),
    switchMap(([_, state]) =>
      apiService.getPeopleByLink(state.people.previous).pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      )
    )
  );

const next: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, state$, { apiService }) =>
  action$.pipe(
    filter(isActionOf(peopleActions.next)),
    withLatestFrom(state$),
    filter(([_, state]) => !!state.people.next),
    switchMap(([_, state]) =>
      apiService.getPeopleByLink(state.people.next).pipe(
        map((data) => peopleActions.success(data)),
        catchError(() => of(peopleActions.fail('Server Error - Retrieve people information failed')))
      )
    )
  );

export const epics = [init, prev, next];
