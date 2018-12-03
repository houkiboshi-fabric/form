import React, { memo } from 'react';

import { TabsProps } from 'react-bootstrap';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';

import { ISchemaState } from '../store/modules/schemas';
import Form, { FormProps } from './Form';

export interface IFormsProps {
  activeIndex: number;
  defaultActiveIndex: number;
  onSelectTab: (eventKey: any) => void;
  schemas: ISchemaState[];
}

export interface ITabProps {
  eventKey: number;
  title: string;
}

export default memo(
  ({ defaultActiveIndex, onSelectTab, schemas }: IFormsProps) => {
    const tabsProps: TabsProps = {
      // activeKey: activeIndex,
      defaultActiveKey: defaultActiveIndex,
      id: 'tabs',
      className: 'forms',
      onSelect: onSelectTab
    };

    const tabs = schemas.map(
      (
        { hasFailed, isFetching, schema, title, uri }: ISchemaState,
        i: number
      ) => {
        const tabProps: ITabProps = {
          eventKey: i,
          title
        };
        const formProps: FormProps = {
          hasFailed,
          isFetching,
          schema,
          title,
          uri
        };

        return (
          <Tab {...tabProps} key={i}>
            <Form {...formProps} />
          </Tab>
        );
      }
    );

    return <Tabs {...tabsProps}>{tabs}</Tabs>;
  }
);
