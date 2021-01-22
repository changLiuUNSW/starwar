import { ActionType, createAction } from 'typesafe-actions';
import { Film } from '../../models/Film';

export enum FilmActionTypes {
  Load = '[Film] Load',
  Success = '[Film] Success',
  Fail = '[Film] Fail',
  Reset = '[Film] Reset',
}

export const filmActions = {
  load: createAction(FilmActionTypes.Load)<string[]>(),
  fail: createAction(FilmActionTypes.Fail)<string>(),
  success: createAction(FilmActionTypes.Success)<Film[]>(),
  reset: createAction(FilmActionTypes.Reset)(),
};

export type FilmAction = ActionType<typeof filmActions>;
