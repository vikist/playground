import * as React from 'react';
import './introduction.scss';

export namespace Introduction {
  export interface Props {
  }

  export interface State {
    loading: boolean;
    run: boolean;
    steps: any[]
  }
}

export class Introduction extends React.Component<Introduction.Props, Introduction.State> {
  constructor(props: Introduction.Props, context?: any) {
    super(props, context);
    this.state = {
      loading: false,
      run: false,
      steps: [{
        target: '.feature-tour-step-1',
        content: 'You can upload your pictures here'
      }
      ]
    };
  }

  handleReloadClick() {
    this.setState({ loading: true, run: true });
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1500);
  }

  render() {
    let element;
    if (this.state.loading) {
      element = (
        <div>loading...</div>
      );
    } else {
      element = (
        <button
          className="btn"
          onClick={() => {
            this.handleReloadClick();
          }}
        >Start tour</button>
      );
    }

    return (
      <div className="introduction-container">
          <div className="feature-tour-step-1">{element}</div>
          <div className="dummy-text feature-tour-step-1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
      </div>
    );
  }
}
