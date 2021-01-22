import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState } from '..';
import { ApiService } from '../../services/apiService';
import { filmActions } from './actions';

const load: Epic<RootAction, RootAction, RootState, ApiService> = (action$, _, { getFilmsByLinks }) =>
  action$.pipe(
    filter(isActionOf(filmActions.load)),
    switchMap((action) =>
      getFilmsByLinks(action.payload).pipe(
        map((data) => filmActions.success(data)),
        catchError(() => of(filmActions.fail('Server Error - Retrieve film information failed')))
      )
    )
  );

export const epics = [load];
