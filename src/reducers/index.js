import { combineReducers } from 'redux'
import { MESSAGE_COMPOSE, MESSAGES_REMOVE, MESSAGES_REMOVE_LABEL, MESSAGES_ADD_LABEL, MESSAGES_ALL_CHECKED, MESSAGE_STARRED, MESSAGE_CHECKED, MESSAGE_EXPAND, MESSAGE_READ, MESSAGES_RECEIVED, MESSAGE_CREATED, MESSAGES_MARKED_READ } from '../actions'
import { routerReducer } from 'react-router-redux'

function messages(currentState, action) {
  const state = !!currentState ? {...currentState} : { byId: {}, all: [] }
  switch (action.type) {
    case MESSAGES_RECEIVED:
      const allMsgsExpand = action.messages.map(message => (
        (state.byId.hasOwnProperty(message.id) && state.byId[message.id] !== undefined && !!state.byId[message.id].expand)
          ? {...message, expand: true, read: true}
          : {...message, expand: false}
      ) )
      const msgsByIdExpand = allMsgsExpand.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
        return {
          ...state,
          compose: false,
          byId: msgsByIdExpand,
          all: allMsgsExpand
        }
    case MESSAGE_CREATED:
      return {
        ...state,
        all: [
          ...state.all,
          action.message,
        ]
      }
    case MESSAGE_COMPOSE:
      return  {
        ...state,
        compose: action.compose,
      }
    case MESSAGES_REMOVE_LABEL:
      if (action.label === "Remove label") {
        return state
      }
      const messagesRemoveLabel = state.all.map(message => {
        let n = action.ids.indexOf(message.id)
        if (n < 0) {
          return {...message}
        }
        let id = action.ids[n]
        if (message.id === id && !!message.checked && message.checked) {
          let i = message.labels.indexOf(action.label)
          let labels = (i < 0) ? [...message.labels] : [...message.labels.slice(0, i), ...message.labels.slice(i + 1)]
          return {...message, labels: [...labels]}
        } else {
          return {...message}
        }
      })
      const messagesRemoveLabelById = messagesRemoveLabel.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
        return {
          ...state,
          byId: messagesRemoveLabelById,
          all: messagesRemoveLabel
        }
    case MESSAGES_ADD_LABEL:
      if (action.label === "Apply label") {
        return state
      }
      const messagesAddLabel = state.all.map(message => {
        let n = action.ids.indexOf(message.id)
        if (n < 0) {
          return {...message}
        }
        let id = action.ids[n]
        if (message.id === id && !!message.checked && message.checked) {
          let i = message.labels.indexOf(action.label)
          let labels = (i < 0) ? [...message.labels, action.label] : [...message.labels]
          return {...message, labels: [...labels]}
        } else {
          return {...message}
        }
      })
      const messagesAddLabelById = messagesAddLabel.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
        return {
          ...state,
          byId: messagesAddLabelById,
          all: messagesAddLabel
        }
    case MESSAGE_READ:
      const readMessageById = {...state.byId[action.id], read: action.read}
      return  {
        ...state,
        byId: {...state.byId, [action.id]: readMessageById},
        all: state.all.map(message => ( message.id === action.id ? {...message, read: action.read} : {...message} ) ),
      }
    case MESSAGE_EXPAND:
      const expandMessageById = {...state.byId[action.id], expand: action.expand, read: true}
      return  {
        ...state,
        byId: {...state.byId, [action.id]: expandMessageById},
        all: state.all.map(message => ( message.id === action.id ? {...message, expand: action.expand, read: true} : {...message, expand: false} ) ),
      }
    case MESSAGE_CHECKED:
      const checkMessageById = {...state.byId[action.id], checked: action.checked}
      return  {
        ...state,
        byId: {...state.byId, [action.id]: checkMessageById},
        all: state.all.map(message => ( message.id === action.id ? {...message, checked: action.checked} : {...message} ) ),
      }
    case MESSAGE_STARRED:
      const starMessageById = {...state.byId[action.id], starred: action.star}
      return  {
        ...state,
        byId: {...state.byId, [action.id]: starMessageById},
        all: state.all.map(message => ( message.id === action.id ? {...message, starred: action.star} : {...message} ) ),
      }
    case MESSAGES_ALL_CHECKED:
      let checked = false;
      const checkedMessagesTotal = state.all.reduce((count, message) => message.checked ? count + 1 : count, 0)
      if (checkedMessagesTotal < state.all.length) {
        checked = true
      }
      const allMessagesChecked = state.all.map((message) => ({...message, checked}) )
      const checkedMessagesById = allMessagesChecked.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
      return  {
        ...state,
        byId: checkedMessagesById,
        all: allMessagesChecked,
      }
    case MESSAGES_MARKED_READ:
      const allMessagesRead = state.all.map((message) => (action.ids.indexOf(message.id) > -1 ? {...message, read: action.read} : {...message}) )
      const readMessagesById = allMessagesRead.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
      return  {
        ...state,
        byId: readMessagesById,
        all: allMessagesRead,
      }
    case MESSAGES_REMOVE:
      const remainingMsgs = state.all.filter(message => action.ids.indexOf(message.id) < 0)
      const msgsReIndexed = remainingMsgs.map((message,index) => ({...message, id: index+1}) )
      const remainingMsgsById = msgsReIndexed.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
      return  {
        ...state,
        byId: remainingMsgsById,
        all: msgsReIndexed,
      }
    default:
      return state
  }
}

// Add the reducer to your store on the `router` key
export default combineReducers({
  messages,
  router: routerReducer,
})
