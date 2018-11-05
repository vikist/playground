import * as React from 'react';
import './style.scss';
import * as Cookies from 'js-cookie';
import { RouteComponentProps } from 'react-router';
export interface Props {
}

export class Callback extends React.Component<RouteComponentProps<Props>> {
  public static defaultProps: Partial<Props> = {
  };

  public render() {
    this.authenticate();
    return (
      <div className="callback-container">
        Authenticating user...
      </div>
    );
  }

  private authenticate(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const returnedState = urlParams.get('state');
    const storedState = Cookies.get('state');
    // const url = window.location.search;
    if (returnedState === storedState) {
      const redirectUri = process.env.APP_BASE_URL + '/callback';
      const params: any = {
        // grant_tpye: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri,
        state: storedState
      };
      const paramsString = Object.keys(params).map((key) => `${key}=${encodeURI(params[key])}`).join('&');
      // const options: RequestInit = { method: 'POST' };
      const headers = new Headers({ Accept: 'application/json' });
      const path = `${process.env.TOKEN_URL}?${paramsString}`;
      fetch(path, { method: 'POST', headers: headers }).then((response) => {
        debugger;
        console.dir('response', response);
        return response.json();
      }).then((result) => {
        Cookies.set('access_token', result.access_token, { expires: 3500 });
        this.props.history.push('/');
      });
    }

  }
}
