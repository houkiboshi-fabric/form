import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import schemas, { ISchemasState } from './modules/schemas';
import tabs, { ITabsState } from './modules/tabs';

export interface IRootState {
  schemas: ISchemasState;
  tabs: ITabsState
}

const reducer = combineReducers({ tabs, schemas });

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
