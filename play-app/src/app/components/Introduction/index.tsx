import * as React from 'react';
import './introduction.scss';
import Spinner from '../Spinner';

export namespace Introduction {
  export interface Props {
  }

  export interface State {
    loading: boolean;
    run: boolean;
  }
}

export class Introduction extends React.Component<Introduction.Props, Introduction.State> {
  constructor(props: Introduction.Props, context?: any) {
    super(props, context);
    this.state = {
      loading: false,
      run: false
    };
  }

  public handleReloadClick() {
    this.setState({ loading: true, run: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  public render() {
    const element = (
      <div>
        <button
          className={'btn' + (this.state.loading ? ' inactive' : '')}
          onClick={() => {
            this.handleReloadClick();
          }}
        >
          Start tour
        </button>
        {this.state.loading ? <Spinner /> : null}
      </div>
    );

    return (
      <div className="introduction-container">
        <div>{element}</div>
        <div className="dummy-text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
    );
  }
}
