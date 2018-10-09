import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/play-logo.svg';
import './header.scss';

export namespace Header {
  export interface Props {}
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
          <Link to="/upload">
            <div className="navigation-entry">Upload</div>
          </Link>
          <Link to="/overview">
            <div className="navigation-entry">Overview</div>
          </Link>
          <Link to="/login">
            <div className="navigation-entry">Login</div>
          </Link>
        </div>
      </header>
    );
  }
}
