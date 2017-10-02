import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createMessage } from '../actions'

const ComposeMessage = ({messages, addMessage, localToggle, history}) => (
 <div>
  <form className="form-horizontal well" onSubmit={ e => { addMessage(
          {
            // id: messages.length+1,
            subject: !!e.target.subject.value && e.target.subject.value !== '' ? e.target.subject.value : 'No Subject',
            body: !!e.target.body.value && e.target.body.value !== '' ? e.target.body.value : '',
            read: false,
            starred: false,
            labels: []
          }
        )

        localToggle()
        e.preventDefault()
        e.target.reset()
        history.push("/")
     } }>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
      </div>

  </form>

</div>
)

const mapStateToProps = state => ({
  // compose: state.compose,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage: createMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeMessage)
