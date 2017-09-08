import React, { Component } from 'react';
import './index.css';
import ComposeMessage from './components/ComposeMessage'
import InBoxMsgs from './components/InBoxMsgs'
import ToolBar from './components/ToolBar'

class InBox extends Component {

  state = {
    messages: !!this.props.messages ? [...this.props.messages] : [],
    compose: false,
  }

  removeMessages = (ids) => {
    const remainingMsgs = this.state.messages.filter(message => ids.indexOf(message.id) < 0)
    this.setState({
        messages: remainingMsgs.map((message,index) => ({...message, id: index+1}) )
      })
  }

  deleteLabel = (ids, label) => {
    if (label === "Remove label") {
      return
    }

    this.setState({
      messages: this.state.messages.map(message => {
        let n = ids.indexOf(message.id)
        if (n < 0) {
          return {...message}
        }
        let id = ids[n]
        if (message.id === id && !!message.checked && message.checked) {
          let i = message.labels.indexOf(label)
          let labels = null
          if (i < 0) {
            labels = [...message.labels]
            console.log('Remove labels = ', labels)
          } else {
            labels = [...message.labels.slice(0, i), ...message.labels.slice(i + 1)]
            console.log('Remove LABELS = ', labels)
          }
          console.log('RemoveLabel new message: ', {...message, labels: [...labels]})
          return {...message, labels: [...labels]}
        } else {
          console.log('RemoveLabel old message: ', {...message})
          return {...message}
        }
      })
    })

  }

  addLabel = (ids, label) => {
    if (label === "Apply label") {
      return
    }

      this.setState({
        messages: this.state.messages.map(message => {
          let n = ids.indexOf(message.id)
          if (n < 0) {
            return {...message}
          }
          let id = ids[n]
          if (message.id === id && !!message.checked && message.checked) {
            let i = message.labels.indexOf(label)
            let labels = null
            if (i < 0) {
              labels = [...message.labels, label]
              console.log('LABELS = ', labels)
            } else {
              labels = [...message.labels]
              console.log('labels = ', labels)
            }
            console.log('AddLabel new message: ', {...message, labels: [...labels]})
            return {...message, labels: [...labels]}
          } else {
            console.log('AddLabel old message: ', {...message})
            return {...message}
          }
        })
      })

  }

  addMessage = message => {
    console.log('Add Message: ', message)
    this.setState({
      messages: this.state.messages.concat(message)
    })
    console.log('Last Added Message: ', this.state.messages[-1])
  }

  readMessage = (id, value) => {
    console.log('Message read id: ', id)
    console.log('Message read value: ', value)
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

  starredMessage = (id, value) => {
    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, starred: value} : {...message} ) )
    })
  }

  expandMessage = (id, value) => {
    console.log('Expand Message value: ', value)
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

  markCheckedMessagesAsRead = (status) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if (!!message.checked && message.checked && message.read === !status) {
          return {...message, read: status}
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
          deleteLabel={this.deleteLabel}
          removeLabel='Remove label'
          removeMessages={this.removeMessages}
        />
        {
          this.state.compose ?
            <ComposeMessage messages={this.state.messages} addMessage={this.addMessage} />
                              :
            <hr />
        }

        <InBoxMsgs
          messages={this.state.messages}
          readMessage={this.readMessage}
          checkedMessage={this.checkedMessage}
          expandMessage={this.expandMessage}
          starredMessage={this.starredMessage}
        />
      </div>
    );
  }
}

export default InBox;
