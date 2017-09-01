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

  addMessage = message => {
    this.setState({
      messages: this.state.messages.concat(message)
    })
  }

  readMessage = id => {
    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, read: true} : {...message} ) )
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

  expandMessage = (id, value) => {
    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, expand: value} : {...message} ) )
    })
  }

  starredMessage = (id, value) => {
    this.setState({
      messages: this.state.messages.map(message => ( message.id === id ? {...message, starred: value} : {...message} ) )
    })
  }

  render() {
    return (
      <div className="InBox">
        <h3>Welcome to InBox</h3>
        <ToolBar messages={this.state.messages} compose={this.state.compose} toggleCompose={this.toggleCompose} />
        {
          this.state.compose ?
            <ComposeMessage messages={this.props.messages} addMessage={this.addMessage} />
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
