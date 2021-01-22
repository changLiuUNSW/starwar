import { ActionType, createAction } from 'typesafe-actions';
import { PeopleResponse } from '../../models/People';

export enum PeopleActionTypes {
  Init = '[People] Init',
  Prev = '[People] Prev',
  Next = '[People] Next',
  Success = '[People] Success',
  Fail = '[People] Fail',
  Reset = '[People] Reset',
}

export const peopleActions = {
  init: createAction(PeopleActionTypes.Init)(),
  prev: createAction(PeopleActionTypes.Prev)(),
  next: createAction(PeopleActionTypes.Next)(),
  fail: createAction(PeopleActionTypes.Fail)<string>(),
  success: createAction(PeopleActionTypes.Success)<PeopleResponse>(),
  reset: createAction(PeopleActionTypes.Reset)(),
};

export type PeopleAction = ActionType<typeof peopleActions>;
