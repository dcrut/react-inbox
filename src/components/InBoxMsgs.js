import React from 'react';
import '../index.css';
import Message from './Message'

const InBoxMsgs = ({messages, readMessage, checkedMessage, expandMessage, starredMessage}) => (
// class InBoxMsgs extends Component {

  // render() {
  //   return(
      <Message
        id={messages[1].id}
        subject={messages[1].subject}
        read={messages[1].read}
        starred={messages[1].starred}
        readMessage={readMessage}
        checkedMessage={checkedMessage}
        checked={!!messages[1].checked ? messages[1].checked : false}
        expand={!!messages[1].expand ? messages[1].expand : false}
        expandMessage={expandMessage}
        starredMessage={starredMessage}
      />

//     )
//   }
//
// }
)

export default InBoxMsgs
