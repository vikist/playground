import * as React from 'react';
import './introduction.scss';
import Spinner from '../Spinner';
import { User } from 'app/models/TodoModel';

export interface Props { }
export interface State {
  loading: boolean;
  run: boolean;
  workload: string;
  threads: string;
  users?: User[];
  computationResult?: string;
}

const dummyText = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
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
sanctus est Lorem ipsum dolor sit amet.`;

export class Introduction extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      loading: false,
      run: false,
      workload: '',
      threads: ''
    };
  }

  public startComputation() {
    this.setState({ loading: true, run: true });
    const path = `${process.env.API_URL}/work?threads=${this.state.threads}&workload=${this.state.workload}`;
    fetch(path)
      .then((response) => {
        return response.json();
      }).then((result) => {
        this.setState({ loading: false, computationResult: result });
      });

    // this.setState({ loading: false, users: undefined });
  }

  public render() {
    const element = (
      <div>
        <div>
          <input value={this.state.workload} onChange={(event) => this.setState({ workload: event.target.value })} placeholder="workload" />
        </div>
        <div>
          <input value={this.state.threads} onChange={(event) => this.setState({ threads: event.target.value })} placeholder="threads" />
        </div>
        <div>{this.state.computationResult}</div>
        <button
          disabled={(this.state.loading || this.state.workload.length === 0 || this.state.threads.length === 0) ? true : false}
          className={'btn' + (this.state.loading || this.state.workload.length === 0 || this.state.threads.length === 0 ? ' inactive' : '')}
          onClick={() => {
            this.startComputation();
          }}
        >
          Start work
        </button>
        <button
          className={'btn' + (this.state.loading ? ' inactive' : '')}
          style={{ float: 'right' }}
          onClick={() => {
            this.setState({ loading: true, run: true });
            this.fetchUsers().then(() => {
              this.setState({ loading: false, run: false });
            }).catch((err) => {
              this.setState({ loading: false, run: false });
            });
          }}
        >
          Show users
        </button>
        {this.state.loading ? <Spinner /> : null}
      </div>
    );

    return (
      <div className="introduction-container">
        <div>{element}</div>
        <div className="dummy-text">
          {this.state.users ? this.state.users.map((user, index) => <li key={index}> {user.name}</li>) : dummyText}
        </div>
      </div>
    );
  }

  private fetchUsers(): Promise<void> {
    const path = `${process.env.API_URL}/list`;
    return fetch(path)
      .then((response) => {
        return response.json();
      }).then((result) => {
        this.setState({ users: result });
      });
  }
}
