import * as React from 'react';

export interface Props {
  users?: string[];
  getUsers?(): Promise<string[]>;
}

export class Overview extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    users: []
  };

  public render() {
    return (
      <div className="dummy-text">Here comes an overview</div>
    );
  }
}
