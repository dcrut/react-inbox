import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Apply our middleware for navigating
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
    middleware,
  )
)

export default store
