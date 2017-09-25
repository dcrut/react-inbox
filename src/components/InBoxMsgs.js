import React from 'react';
import '../index.css';
import Message from './Message'

const InBoxMsgs = ({messages, readMessage, checkedMessage, expandMessage, starredMessage}) => (
      <div>
      {
        messages.map( (message,i) => {
          return (
            <Message key={i}
              id={message.id}
              subject={message.subject}
              read={ !!message.read ? message.read : !!message.read}
              starred={message.starred}
              readMessage={readMessage}
              checkedMessage={checkedMessage}
              checked={!!message.checked ? message.checked : !!message.checked}
              expand={!!message.expand ? message.expand : !!message.expand}
              expandMessage={expandMessage}
              starredMessage={starredMessage}
              body={!!message.body ? message.body : !!message.body}
              labels={!!message.labels ? message.labels : []}
            />
          )
        })
      }
      </div>
);


export default InBoxMsgs;
