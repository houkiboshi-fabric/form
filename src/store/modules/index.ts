export type ActionType =
  | 'SCHEMAS/FETCH/START'
  | 'SCHEMAS/FETCH/SUCCESS'
  | 'SCHEMAS/FETCH/FAILED'
  | 'TABS/CHANGE';

export interface IAction<T> {
  type: ActionType;
  payload: T;
  meta?: any;
  error?: boolean;
}
