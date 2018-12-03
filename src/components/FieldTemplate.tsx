import React from 'react';
// import Marker from './Marker';

import { FieldTemplateProps } from 'react-jsonschema-form';

import DescriptionHelp from './DescriptionHelp';

export default (props: FieldTemplateProps) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children
  } = props;

  const descriptionText = description.props.description;
  const descriptionInfo = descriptionText ? (
    <DescriptionHelp id={id} description={descriptionText} />
  ) : null;

  return (
    <div className={classNames}>
      {descriptionInfo}

      <label className="control-label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      {children}

      {/* rawErrors && rawErrors.length > 0 && <Marker rawErrors={rawErrors} />*/}

      {errors}
      {help}
    </div>
  );
};
