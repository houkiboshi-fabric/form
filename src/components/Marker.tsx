import Observer from '@researchgate/react-intersection-observer';
import React, { Component } from 'react';

export interface IMarkerProps {
  rawErrors: string[];
}

export interface IMarkerState {
  isErrorIntersecting: boolean;
}

export default class Marker extends Component<IMarkerProps, IMarkerState> {
  constructor(props: IMarkerProps) {
    super(props);
    this.state = {
      isErrorIntersecting: false
    };
  }

  public render() {
    const rawErrors = this.props.rawErrors || [];
    const { isErrorIntersecting } = this.state;
    const { onChangeIntersection } = this;
    return (
      <Observer onChange={onChangeIntersection}>
        <div
          style={{
            height: 100,
            backgroundColor: isErrorIntersecting ? 'red' : '#888'
          }}
        >
          <ul>
            {rawErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      </Observer>
    );
  }

  private onChangeIntersection = (event: IntersectionObserverEntry) => {
    this.setState({
      isErrorIntersecting: event.isIntersecting
    });
  };
}
