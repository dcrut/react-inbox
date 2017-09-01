import React from 'react';
import '../index.css';

const selectedItemsButtonImage = (messages) => {
  // const checkedMessages = messages.reduce((count, message) => message.checked ? count + 1 : count, 0)
  // console.log('checkedMessages: ', checkedMessages)
  const imageStyle = ''
  // const imageStyle = ((checkedMessages > 0) && (checkedMessages < messages.length)) ?
  //                       '-minus' :
  //                           (checkedMessages === messages.length ? '-check' : '')
  return(`${imageStyle}`)
}

const ToolBar = ({messages, compose, toggleCompose}) => (
// class ToolBar extends Component {

  // render() {
  //   return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ messages.reduce((count, message) => !message.read ? count + 1 : count, 0) }</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={toggleCompose}>
            <i className={"fa fa-" + (compose ? "plus" : "minus") }></i>
          </a>

          <button className="btn btn-default">
            <i className={"fa fa" + selectedItemsButtonImage(messages) + "-square-o"}></i>
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Read
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
  //   )
  // }
)
// }

export default ToolBar
