import React, { Fragment, memo, TextareaHTMLAttributes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import CopyToClipboard from 'react-copy-to-clipboard';

const style = {
  width: '100%',
  minHeight: '90vh',
  fontSize: '14px',
  fontFamily: 'monospace'
};

export interface IOutputProps {
  value: string;
}

const Output = memo(({ value }: IOutputProps) => {
  const textareaProps: TextareaHTMLAttributes<any> = {
    name: 'output',
    id: 'output',
    style,
    className: 'form-control',
    readOnly: true,
    value
  };

  return (
    <Fragment>
      <p style={{textAlign: 'right'}}>
        <CopyToClipboard text={value}>
          <Button bsSize="xsmall">
            <Glyphicon glyph="copy" />
            &nbsp;Copy to clipboard
          </Button>
        </CopyToClipboard>
      </p>
      <textarea {...textareaProps} />
    </Fragment>
  );
});

export default Output;
