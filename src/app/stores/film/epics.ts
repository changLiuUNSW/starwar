import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Dependencies, RootAction, RootState } from '..';
import { filmActions } from './actions';

const load: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, _, { apiService }) =>
  action$.pipe(
    filter(isActionOf(filmActions.load)),
    switchMap((action) =>
      apiService.getFilmsByLinks(action.payload).pipe(
        map((data) => filmActions.success(data)),
        catchError(() => of(filmActions.fail('Server Error - Retrieve film information failed')))
      )
    )
  );

export const epics = [load];
