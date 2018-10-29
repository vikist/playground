import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/play-logo.svg';
import './header.scss';
import { Hamburger } from '../Hamburger/Hamburger';

export interface Props { }

interface Greeting {
  name: string;
  id: number;
}

export class Header extends React.Component<Props> {
  constructor(props: Props, context?: any) {
    super(props, context);
  }

  public render() {
    return (
      <header className="play-header-container">
        <img className="logo" src={logo} />
        <div className="navigation-list">
          <Link className="navigation-entry" to="/upload">
            <div >Upload</div>
          </Link>
          <Link className="navigation-entry" to="/overview">
            <div >Overview</div>
          </Link>
          <Link className="navigation-entry" to="/login">
            <div>Login</div>
          </Link>
          <div onClick={this.registerOnServer} className="navigation-entry">Subscribe</div>
          <Hamburger />
        </div>
      </header>
    );
  }

  private registerOnServer(): void {
    const path = `${process.env.API_URL}/register`;
    const eventSource = new EventSource(path);
    eventSource.addEventListener('message', (event: any) => {
      const user: Greeting = JSON.parse(event.data);
      alert('user greeted: ' + user.name);
    });
  }
}
