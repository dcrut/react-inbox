import React, { Component } from 'react';
import '../index.css';

class Message extends Component {
// const Message = ({id, subject, read, starred, readMessage, checkedMessage, checked}) => (

  state = {
    expand: this.props.expand,
    starred: this.props.starred,
    checked: this.props.checked
  }

  expandMsg = () => {
    this.props.readMessage(this.props.id)
    this.props.expandMessage(this.props.id, !this.state.expand)
    this.setState({
      expand: !this.state.expand
    })
  }

  toggleStar = () => {
    this.props.starredMessage(this.props.id, !this.state.starred)
    this.setState({
      starred: !this.state.starred
    })
  }

  showStar = () => (
    <i className={"star fa " + (this.state.starred ? "fa-star" : "fa-star-o") }></i>
  )

  showCheckbox = () => (
    this.state.checked ?
      <input type="checkbox" checked={true} onChange={this.toggleCheckbox} /> :
      <input type="checkbox" checked={false} onChange={this.toggleCheckbox} />
  )

  toggleStar = () => {
    this.props.starredMessage(this.props.id, !this.state.starred)
    this.setState({
      starred: !this.state.starred
    })
  }

  toggleCheckbox = () => {
    this.props.checkedMessage(this.props.id, !this.state.checked)
    this.setState({
      checked: !this.state.checked
    })
  }

  showMessage = () => (
    <div className={"row message " + (this.props.read ? "read" : "unread") }>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            {this.showCheckbox()}
          </div>
          <div className="col-xs-2" onClick={this.toggleStar}>
            {this.showStar()}
          </div>
        </div>
      </div>
      <div id="msgbody" className="col-xs-11" onClick={this.expandMsg}>
        <a name="msgbody">
          {this.props.subject}
        </a>
      </div>
    </div>
  )

  showBody = () => (
      this.state.expand ?
        <div className="row message-body">
           <div className="col-xs-11 col-xs-offset-1">
              {!!this.props.body ? this.props.body : 'No Body Found'}
           </div>
        </div>
      :
        <div />
  )

  render() {
    return(
      <div>
        {this.showMessage()}
        {this.showBody()}
      </div>
    )
  }
// )
}

export default Message
