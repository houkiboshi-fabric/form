import { ActionCreator } from 'redux';

import { schemaUris } from '../../config';
import { IAction } from './index';

export interface ITabState {
  index: number;
  title: string;
  isFetching: boolean;
  hasFailed: boolean;
}

export interface ITabsState {
  defaultActiveIndex: number;
  activeIndex: number;
  items: ITabState[];
}

const initialTabsState: ITabsState = {
  defaultActiveIndex: 0,
  activeIndex: 0,
  items: []
};

const initialTabState: ITabState = {
  index: 0,
  title: '',
  isFetching: false,
  hasFailed: false
};

export const changeTab: ActionCreator<IAction<{}>> = (
  activeIndex: number
): IAction<{}> => {
  return {
    type: 'TABS/CHANGE',
    payload: {
      activeIndex
    }
  };
};

const findItemByIndex = (index: number, state: ITabsState) => {
  return state.items.find((tab: ITabState) => tab.index === index);
};

const sortByIndex = (items: ITabState[]) => {
  return items.sort((a: ITabState, b: ITabState) => a.index - b.index);
};

const reducer = (
  state: ITabsState = initialTabsState,
  action: IAction<any>
): ITabsState => {
  switch (action.type) {
    case 'SCHEMAS/FETCH/START': {
      const { uri } = action.payload;
      const index = schemaUris.indexOf(uri);
      const item = findItemByIndex(index, state) || initialTabState;
      return {
        ...state,
        items: sortByIndex([
          ...state.items,
          {
            ...item,
            index: schemaUris.indexOf(uri),
            title: 'Fetching...',
            isFetching: true,
            hasFailed: false
          }
        ])
      };
    }

    case 'SCHEMAS/FETCH/SUCCESS': {
      const {
        uri,
        schema: { title }
      } = action.payload;
      const index = schemaUris.indexOf(uri);
      const item = findItemByIndex(index, state) || initialTabState;
      return {
        ...state,
        items: sortByIndex([
          ...state.items,
          {
            ...item,
            index,
            title,
            isFetching: false,
            hasFailed: false
          }
        ])
      };
    }

    case 'SCHEMAS/FETCH/FAILED': {
      const { uri } = action.payload;
      const index = schemaUris.indexOf(uri);
      const item: ITabState = findItemByIndex(index, state) || initialTabState;
      return {
        ...state,
        items: sortByIndex([
          ...state.items,
          {
            ...item,
            index,
            isFetching: false,
            hasFailed: true
          }
        ])
      };
    }

    case 'TABS/CHANGE': {
      return {
        ...state,
        activeIndex: action.payload.activeIndex
      };
    }

    default:
      return state;
  }
};

export default reducer;
