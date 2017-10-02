import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider } from 'react-redux'
import { fetchMessages } from './actions'
import createHistory from 'history/createBrowserHistory'
import Routes from './routes'

store.dispatch(fetchMessages())

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>, document.getElementById('root')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <InBox messages={seedMsgs} />
//   </Provider>, document.getElementById('root')
// );
// registerServiceWorker(); // remove line
