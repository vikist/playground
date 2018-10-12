import * as React from 'react';

export namespace Overview {
  export interface Props {
    users?: string[];
    getUsers?(): Promise<string[]>;
  }
}

export class Overview extends React.Component<Overview.Props> {
  public static defaultProps: Partial<Overview.Props> = {
    users: []
  };

  public render() {
    return (
      <div className="dummy-text">Here comes an overview</div>
    );
  }
}
