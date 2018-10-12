import * as React from 'react';
import './footer.scss';

export interface Props {
}

export class Footer extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    activeCount: 0,
    completedCount: 0
  };

  public render() {
    return (
      <footer className="play-footer-container">
        <div className="dummy-text">Dummy text</div>
      </footer>
    );
  }
}
