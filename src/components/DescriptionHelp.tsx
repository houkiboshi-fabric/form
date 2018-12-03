import React, { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTriggerProps } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';

import autolink from '../lib/autolink';
import nl2br from '../lib/nl2br';

export interface IDescriptionHelpProps {
  description: string;
  id: string;
}

const DescriptionHelp: FunctionComponent<IDescriptionHelpProps> = ({
  description,
  id
}: IDescriptionHelpProps) => {
  const popover = <Popover id={id}>{autolink(nl2br(description))}</Popover>;
  const overlayTriggerProps: OverlayTriggerProps = {
    overlay: popover,
    placement: 'top',
    rootClose: true,
    trigger: ['click', 'focus']
  };
  return (
    <span className="help-description">
      <OverlayTrigger {...overlayTriggerProps}>
        <FontAwesomeIcon icon="info-circle" className="icon" />
      </OverlayTrigger>
    </span>
  );
};

export default DescriptionHelp;
