import React from 'react';
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import InBox from './InBox'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import NotFound from './pages/NotFound'

const Routes = (props) => (
  <ConnectedRouter {...props}>
    <Switch>
      <Route exact path="/" component={ props => <InBox {...props} /> } />
      <Route path="/compose" component={ props => <InBox edit={true} {...props} /> } />
      <Route path="/api/messages/*" component={ props => <InBox apiRoute={true} {...props} /> } />
      <Route path="/*" component={NotFound} />
    </Switch>
  </ConnectedRouter>
)
export default Routes
