import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/play-logo.svg';
import './header.scss';
import { Hamburger } from '../Hamburger/Hamburger';

export namespace Header {
  export interface Props { }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
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
          <Hamburger />
        </div>
      </header>
    );
  }
}
