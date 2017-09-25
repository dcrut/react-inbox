const getMessageBodyAPI = async ( href ) => {
  const msgsResponse = await fetch(`${href}`)
  const msgsJson = await msgsResponse.json()
  return msgsJson.body
}

const getMsgsWithBody = async (messages) => {
  let msgWithBody = []
  for ( let i = 0; i < messages.length; i++) {
    let body = await getMessageBodyAPI(messages[i]._links.self.href)
    msgWithBody = [...msgWithBody, {...messages[i], body}]
  }
  return msgWithBody
}

export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`)
    const json = await response.json()
    const serverMsgs = json._embedded.messages
    const serverMsgsWithBody = await getMsgsWithBody(serverMsgs)
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: serverMsgsWithBody
    })
  }
}

export const MESSAGE_COMPOSE = 'MESSAGE_COMPOSE'
export function toggleCompose(compose) {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE_COMPOSE,
      compose
    })
  }
}

export const MESSAGE_CHECKED = 'MESSAGE_CHECKED'
export function checkedMessage(id, value) {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE_CHECKED,
      id,
      checked: value,
    })
  }
}

export const MESSAGES_ALL_CHECKED = 'MESSAGES_ALL_CHECKED'
export function checkAllMessages() {
  return async (dispatch) => {
    dispatch({
      type: MESSAGES_ALL_CHECKED,
    })
  }
}

export const MESSAGES_MARKED_READ = 'MESSAGES_MARKED_READ'
export function markCheckedMessagesAsRead(ids, value) {
  return async (dispatch) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...ids],
        command: 'read',
        read: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: MESSAGES_MARKED_READ,
      ids,
      read: value,
    })
  }
}

export const MESSAGE_READ = 'MESSAGE_READ'
export function readMessage(id, value) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'read',
        read: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: MESSAGE_READ,
      id,
      read: value,
    })
  }
}

export const MESSAGE_EXPAND = 'MESSAGE_EXPAND'
export function expandMessage(id, value) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'read',
        read: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: MESSAGE_EXPAND,
      id,
      expand: value,
    })
  }
}

export const MESSAGE_STARRED = 'MESSAGE_STARRED'
export function starredMessage(id, value) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'star',
        star: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: MESSAGE_STARRED,
      id,
      star: value,
    })
  }
}

export const MESSAGES_ADD_LABEL = 'MESSAGES_ADD_LABEL'
export function addLabel(ids, label) {
  return async (dispatch) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...ids],
        command: 'addLabel',
        label
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: MESSAGES_ADD_LABEL,
      ids,
      label,
    })
  }
}

export const MESSAGES_REMOVE_LABEL = 'MESSAGES_REMOVE_LABEL'
export function removeLabel(ids, label) {
  return async (dispatch) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...ids],
        command: 'removeLabel',
        label
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: MESSAGES_REMOVE_LABEL,
      ids,
      label,
    })
  }
}

export const MESSAGES_REMOVE = 'MESSAGES_REMOVE'
export function removeMessages(ids) {
  return async (dispatch) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...ids],
        command: 'delete',
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: MESSAGES_REMOVE,
      ids,
    })
  }
}

export const MESSAGE_CREATED = 'MESSAGE_CREATED'
export function createMessage(message) {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify({
        subject: message.subject,
        body: message.body,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const serverMsg = await response.json()

    dispatch({
      type: MESSAGE_CREATED,
      message: serverMsg,
    })
  }
}
