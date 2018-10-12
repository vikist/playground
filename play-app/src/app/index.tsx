import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as MyApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { Overview } from './components/Overview';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/overview" component={Overview} />
    <Route path="/" component={MyApp} />
  </Switch>
));
