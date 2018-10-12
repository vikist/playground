import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/play-logo.svg';
import './header.scss';
import { Hamburger } from '../Hamburger/Hamburger';

export interface Props { }

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
          <Hamburger />
        </div>
      </header>
    );
  }
}
