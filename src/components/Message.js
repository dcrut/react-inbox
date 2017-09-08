import React from 'react';
import '../index.css';

const showBody = (expand, body) => (
    expand ?
      <div className="row message-body">
         <div className="col-xs-11 col-xs-offset-1">
            {!!body ? body : 'No Body Found'}
         </div>
      </div>
    :
      <div />
)

const Message = ({
  id, subject, read, starred, readMessage, checkedMessage, checked, expand, expandMessage, starredMessage, body, labels
}) => (

      <div>
        <div className={"row message " + (read ? "read" : "unread") }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={checked} onChange={e => checkedMessage(id, !checked)}/>
              </div>
              <div className="col-xs-2" onClick={e => { starredMessage(id, !starred) }}>
                <i className={"star fa " + (starred ? "fa-star" : "fa-star-o") }></i>
              </div>
            </div>
          </div>
          <div id="msgbody" className="col-xs-11" onClick={e => { expandMessage(id, !expand) }}>
            {labels.map((label, i) => <span key={i} className="label label-warning">{label}</span>)}
            <a name="msgbody">
              {subject}
            </a>
          </div>
        </div>
        { showBody(expand, body) }
      </div>

)

export default Message
