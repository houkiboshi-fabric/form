import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { TabProps } from 'react-bootstrap';

import Forms from '../components/Forms';
import { IRootState } from '../store/createStore';
import { IAction } from '../store/modules';
import { changeTab } from '../store/modules/tabs';

const mapStateToProps = (state: IRootState) => {
  return {
    activeIndex: state.tabs.activeIndex,
    defaultActiveIndex: state.tabs.defaultActiveIndex,
    schemas: state.schemas.schemas
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction<{}>>) => {
  return {
    onSelectTab: (eventKey: Pick<TabProps, 'eventKey'>): void => {
      dispatch(changeTab(eventKey));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);
