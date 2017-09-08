import React from 'react';
import '../index.css';

const checkedMessageIDs = messages => {
  const checkedMsgs = messages.filter(message => !!message.checked && message.checked)
  const messageIDs = checkedMsgs.map(message => message.id)
  console.log('checkedMessageIDs: ', messageIDs )
  return messageIDs
}

const checkedMessagesTotal = messages => messages.reduce((count, message) => message.checked ? count + 1 : count, 0)

const selectedItemsButtonImage = (messages) => {
  const checkedMessagesCount = checkedMessagesTotal(messages)
  console.log('checked messages count: ', checkedMessagesCount)
  const imageStyle = ((checkedMessagesCount > 0) && (checkedMessagesCount < messages.length)) ?
                        '-minus' :
                            (checkedMessagesCount === messages.length ? '-check' : '')
  return(`${imageStyle}`)
}

const unreadMessagesTotal = messages => messages.reduce((count, message) => message.read ? count : count + 1, 0)

const ToolBar = ({
  messages, compose, toggleCompose, checkAllMessages, markCheckedMessagesAsRead, addLabel, applyLabel, removeLabel, deleteLabel, removeMessages
}) => (

      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ unreadMessagesTotal(messages) }</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={e => { toggleCompose() }}>
            <i className={"fa fa-" + (compose ? "plus" : "minus") }></i>
          </a>

          <button className="btn btn-default" onClick={e => { checkAllMessages() }}>
            <i className={"fa fa" + selectedItemsButtonImage(messages) + "-square-o"}></i>
          </button>

          <button className="btn btn-default" onClick={e => { markCheckedMessagesAsRead(true) }} disabled={(checkedMessagesTotal(messages) > 0) ? false : true}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={e => { markCheckedMessagesAsRead(false) }} disabled={(checkedMessagesTotal(messages) > 0) ? false : true}>
            Mark As Unread
          </button>

          <select value={applyLabel} className="form-control label-select" onChange={e => { addLabel(checkedMessageIDs(messages), e.target.value) }} disabled={(checkedMessagesTotal(messages) > 0) ? false : true}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select value={removeLabel} className="form-control label-select" onChange={e => { deleteLabel(checkedMessageIDs(messages), e.target.value) }} disabled={(checkedMessagesTotal(messages) > 0) ? false : true}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={e => { removeMessages(checkedMessageIDs(messages)) }} disabled={(checkedMessagesTotal(messages) > 0) ? false : true}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
)

export default ToolBar
