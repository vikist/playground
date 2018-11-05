import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/play-logo.svg';
import loggedInIcon from 'assets/loggedInIcon.svg';
import './header.scss';
import { Hamburger } from '../Hamburger/Hamburger';
import * as Cookies from 'js-cookie';

export interface Props { }

export class Header extends React.Component<Props> {
  constructor(props: Props, context?: any) {
    super(props, context);
  }

  public render() {
    const loginIndicator = Cookies.get('access_token') !== undefined ? <img className="logged-in-user" src={loggedInIcon} /> : null;
    return (
      <header className="play-header-container">
        <img className="logo" src={logo} />
        {loginIndicator}
        <div className="navigation-list">
          <Link className="navigation-entry" to="/upload">
            <div >Upload</div>
          </Link>
          <Link className="navigation-entry" to="/overview">
            <div >Overview</div>
          </Link>
          <div className="navigation-entry" onClick={this.handleGithubLogin.bind(this)}>
            <div>Login</div>
          </div>
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
      const object: any = JSON.parse(event.data);
      if (object.name !== undefined) {
        alert('user greeted: ' + object.name);
      } else if (object.jobId !== undefined) {
        alert('job finished: ' + object.jobId);
      } else {
        alert('undefined event');
      }
    });
    alert('You subscribed successfully to the notification service');
  }

  private handleGithubLogin(): void {
    const params: any = {
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.APP_BASE_URL + '/callback',
      scope: 'user public_repo',
      state: this.generateId()
    };
    document.cookie = `state=${params.state}`;
    const paramsString = Object.keys(params).map((key) => `${key}=${encodeURI(params[key])}`).join('&');
    const path = `${process.env.AUTH_URL}`;

    window.location.href = `${path}?${paramsString}`;
  }

  private generateId(): string {
    let nonce = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nonce;
  }
}
