import React, { Fragment, memo, useState } from 'react';
import SchemaForm, {
  FormProps as SchemaFormProps,
  IChangeEvent,
  ISubmitEvent
} from 'react-jsonschema-form';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import { ISchemaState } from '../store/modules/schemas';
import FieldTemplate from './FieldTemplate';
import Output, { IOutputProps } from './Output';

export type FormProps = ISchemaState;

// disable these fields
const TitleField = () => null;
const DescriptionField = () => null;

export default ({ schema }: FormProps) => {
  const [formData, setFormData] = useState({});

  const schemaFormProps: SchemaFormProps<any> = {
    schema,
    onChange: (event: IChangeEvent) => {
      console.log(event.formData);
      setFormData(event.formData);
    },
    onError: (...errors: any[]) => console.log('error', ...errors),
    liveValidate: true,
    showErrorList: false,
    FieldTemplate,
    fields: {
      TitleField,
      DescriptionField
    },
    formData
  };

  const outputProps: IOutputProps = {
    value: JSON.stringify(formData, null, 2)
  };

  const outputColStyle = {
    position: 'sticky',
    top: '8px'
  };

  return (
    <Grid>
      <Row>
        <Col xs={7} md={7}>
          <SchemaForm {...schemaFormProps} />
        </Col>
        {/*
        // @ts-ignore "CSS typings are not working" */}
        <Col xs={5} md={5} style={outputColStyle}>
          <Output {...outputProps} />
        </Col>
      </Row>
    </Grid>
  );
};
