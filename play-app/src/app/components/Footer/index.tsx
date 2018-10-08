import * as React from 'react';
import { TodoModel } from 'app/models';
import './footer.scss';

export namespace Footer {
  export interface Props {
    filter: TodoModel.Filter;
    activeCount?: number;
    completedCount?: number;
    onClickFilter: (filter: TodoModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export class Footer extends React.Component<Footer.Props> {
  public static defaultProps: Partial<Footer.Props> = {
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
