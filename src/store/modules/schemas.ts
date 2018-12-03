import { JSONSchema6 } from 'json-schema';
import { Dispatch } from 'redux';

import { schemaUris } from '../../config';
import { IAction } from './index';

type Schema = JSONSchema6;

export interface ISchemaState {
  schema: Schema;
  uri: string;
  title: string;
  isFetching: boolean;
  hasFailed: boolean;
}

export interface ISchemasState {
  schemas: ISchemaState[];
}

const initialSchemasState: ISchemasState = {
  schemas: []
};

const initialSchemaState: ISchemaState = {
  schema: {},
  uri: '',
  title: '',
  isFetching: false,
  hasFailed: false
};

export const fetchSchemaStart = (uri: string): IAction<string> => {
  return {
    type: 'SCHEMAS/FETCH/START',
    payload: uri
  };
};

export const fetchSchemaSuccess = (
  uri: string,
  schema: Schema
): IAction<{}> => {
  return {
    type: 'SCHEMAS/FETCH/SUCCESS',
    payload: {
      uri,
      schema
    }
  };
};

export const fetchSchemaFailed = (
  uri: string,
  error: PromiseRejectionEvent
): IAction<{}> => {
  return {
    type: 'SCHEMAS/FETCH/FAILED',
    payload: {
      uri,
      message: error.reason
    },
    error: true
  };
};

export const fetchSchema = (uri: string) => {
  fetchSchemaStart(uri);
  return (dispatch: Dispatch) => {
    fetch(uri)
      .then(
        (response: Response) => response.json(),
        (err: PromiseRejectionEvent) => dispatch(fetchSchemaFailed(uri, err))
      )
      .then(result => dispatch(fetchSchemaSuccess(uri, result)));
  };
};

const compareByIndex = (a: ISchemaState, b: ISchemaState) => {
  return schemaUris.indexOf(a.uri) - schemaUris.indexOf(b.uri);
};

const findSchemaByUri = (uri: string, state: ISchemasState) => {
  return state.schemas.find((schema: ISchemaState) => schema.uri === uri);
};

const reducer = (
  state: ISchemasState = initialSchemasState,
  action: IAction<any>
): ISchemasState => {
  switch (action.type) {
    case 'SCHEMAS/FETCH/START': {
      const { uri } = action.payload;
      const { schemas } = state;
      const schemaState = findSchemaByUri(uri, state) || initialSchemaState;
      return {
        ...state,
        schemas: [
          ...schemas,
          {
            ...schemaState,
            uri,
            isFetching: true,
            hasFailed: false
          }
        ].sort(compareByIndex)
      };
    }

    case 'SCHEMAS/FETCH/SUCCESS': {
      const { uri, schema } = action.payload;
      const { schemas } = state;
      const schemaState = findSchemaByUri(uri, state) || initialSchemaState;
      return {
        ...state,
        schemas: [
          ...schemas,
          {
            ...schemaState,
            uri,
            schema,
            title: schema.title,
            isFetching: false,
            hasFailed: false
          }
        ].sort(compareByIndex)
      };
    }

    case 'SCHEMAS/FETCH/FAILED': {
      const { uri } = action.payload;
      const { schemas } = state;
      const schemaState = findSchemaByUri(uri, state) || initialSchemaState;
      return {
        ...state,
        schemas: [
          ...schemas,
          {
            ...schemaState,
            isFetching: false,
            hasFailed: true
          }
        ].sort(compareByIndex)
      };
    }
    default:
      return state;
  }
};

export default reducer;
