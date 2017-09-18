import React, { Component } from 'react';
import './index.css';
import ComposeMessage from './components/ComposeMessage'
import InBoxMsgs from './components/InBoxMsgs'
import ToolBar from './components/ToolBar'

class InBox extends Component {

  state = {
    messages: [],
    compose: false,
    fetchingServerMsgs: true
  }

  async componentDidMount() {
    const msgsResponse = await fetch('/api/messages')
    const msgsJson = await msgsResponse.json()
    const serverMsgs = msgsJson._embedded.messages
    const serverMsgsWithBody = await this.getMsgsWithBody(serverMsgs)

    this.setState({
      ...this.state,
      messages: [...serverMsgsWithBody],
      fetchingServerMsgs: false
    })
  }

  getMsgsWithBody = async (messages) => {
    let msgWithBody = []
    for ( let i = 0; i < messages.length; i++) {
      let body = await this.getMessageBodyAPI(messages[i]._links.self.href)
      msgWithBody = [...msgWithBody, {...messages[i], body}]
    }
    return msgWithBody
  }

  removeMessages = async (ids) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...ids],
        command: 'delete'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const remainingMsgs = this.state.messages.filter(message => ids.indexOf(message.id) < 0)
    this.setState({
      messages: remainingMsgs.map((message,index) => ({...message, id: index+1}) )
    })
  }

  removeLabel = async (ids, label) => {
    if (label === "Remove label") {
      return
    }

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

    this.setState({
      messages: this.state.messages.map(message => {
        let n = ids.indexOf(message.id)
        if (n < 0) {
          return {...message}
        }
        let id = ids[n]
        if (message.id === id && !!message.checked && message.checked) {
          let i = message.labels.indexOf(label)
          let labels = (i < 0) ? [...message.labels] : [...message.labels.slice(0, i), ...message.labels.slice(i + 1)]
          return {...message, labels: [...labels]}
        } else {
          return {...message}
        }
      })
    })

  }

  addLabel = async (ids, label) => {
    if (label === "Apply label") {
      return
    }

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

    this.setState({
      messages: this.state.messages.map(message => {
        let n = ids.indexOf(message.id)
        if (n < 0) {
          return {...message}
        }
        let id = ids[n]
        if (message.id === id && !!message.checked && message.checked) {
          let i = message.labels.indexOf(label)
          let labels = (i < 0) ? [...message.labels, label] : [...message.labels]
          return {...message, labels: [...labels]}
        } else {
          return {...message}
        }
      })
    })

  }

  addMessage = async (message) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        subject: message.subject,
        body: message.body,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const serverMsg = await response.json()

    this.setState({
      messages: this.state.messages.concat(serverMsg)
    })
    this.toggleCompose()
  }

  readMessage = async (id, value) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'read',
        read: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, read: value} : {...message} ) )
    })
  }

  toggleCompose = () => {
    this.setState({
      compose: !this.state.compose
    })
  }

  checkedMessage = (id, value) => {
    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, checked: value} : {...message} ) )
    })
  }

  starredMessage = async (id, value) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'star',
        star: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, starred: value} : {...message} ) )
    })
  }

  getMessageBodyAPI = async ( href ) => {
    const msgsResponse = await fetch(`${href}`)
    const msgsJson = await msgsResponse.json()
    return msgsJson.body
  }

  expandMessage = async (id, value) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [id],
        command: 'read',
        read: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, expand: value, read: true} : {...message} ) )
    })
  }

  checkAllMessages = () => {
    const checkedMessages = this.state.messages.reduce((count, message) => message.checked ? count + 1 : count, 0)
      if (checkedMessages < this.state.messages.length) {
        this.setState({
          messages: this.state.messages.map(message => ({...message, checked: true}) )
        })
      } else {
        this.setState({
          messages: this.state.messages.map(message => ({...message, checked: false}) )
        })
      }
  }

  markCheckedMessagesAsRead = async (ids, value) => {
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

    this.setState({
      messages: this.state.messages.map(message => {
        if (!!message.checked && message.checked && message.read === !value) {
          return {...message, read: value}
        } else {
          return {...message}
        }
      })
    })
  }

  render() {
    return (
      <div className="InBox">
        <h3>Welcome to InBox</h3>
        <ToolBar
          messages={this.state.messages}
          compose={this.state.compose}
          toggleCompose={this.toggleCompose}
          checkAllMessages={this.checkAllMessages}
          markCheckedMessagesAsRead={this.markCheckedMessagesAsRead}
          addLabel={this.addLabel}
          applyLabel='Apply label'
          removeLabel={this.removeLabel}
          deleteLabel='Remove label'
          removeMessages={this.removeMessages}
        />
        {
          this.state.compose ?
            <ComposeMessage messages={this.state.messages} addMessage={this.addMessage} />
                              :
            <hr />
        }

        {
          this.state.fetchingServerMsgs ?
            <div />
                                        :
            <InBoxMsgs
              messages={this.state.messages}
              readMessage={this.readMessage}
              checkedMessage={this.checkedMessage}
              expandMessage={this.expandMessage}
              starredMessage={this.starredMessage}
            />
        }


      </div>
    );
  }
}

export default InBox;
