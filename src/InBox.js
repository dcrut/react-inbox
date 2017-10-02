import React, { PureComponent } from 'react';
import './index.css';
import ComposeMessage from './components/ComposeMessage'
import InBoxMsgs from './components/InBoxMsgs'
import ToolBar from './components/ToolBar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleCompose, removeMessages, removeLabel, addLabel, readMessage, checkAllMessages, expandMessage, checkedMessage, starredMessage, markCheckedMessagesAsRead } from './actions'

class InBox extends PureComponent {

  state = {
    compose: !!this.props.edit ? this.props.edit : this.props.compose,
    fetchingServerMsgs: true,
    apiRoute: !!this.props.apiRoute ? this.props.apiRoute : false,
  }

  async componentDidMount() {
    let id = null
    if (this.state.apiRoute) {
      const pItems = !!this.props.router.location ? this.props.router.location.pathname.split(/[/]+/) : []
      const idStr = pItems[pItems.length - 1]
      id = isNaN(idStr) ? 0 : parseInt(idStr, 10)

      if (id > 0) {
        this.props.expandMessage(id, true)
      }
    }
    this.setState({
      ...this.state,
      fetchingServerMsgs: false,
      apiRouteId: id,
    })

  }

  localToggleCompose = () => {
    this.setState({
      compose: !this.state.compose
    })
    this.props.toggleCompose(!this.state.compose)
  }

  render() {
    return (
      <div className="InBox">
        <h3>Welcome to InBox</h3>
        <ToolBar
          messages={this.props.messages}
          compose={this.state.compose}
          toggleCompose={this.localToggleCompose}
          checkAllMessages={this.props.checkAllMessages}
          markCheckedMessagesAsRead={this.props.markCheckedMessagesAsRead}
          addLabel={this.props.addLabel}
          applyLabel='Apply label'
          removeLabel={this.props.removeLabel}
          deleteLabel='Remove label'
          removeMessages={this.props.removeMessages}
        />
            {
              this.state.compose ?
                <ComposeMessage messages={this.props.messages} localToggle={this.localToggleCompose} history={this.props.history}/>
                                  :
                <hr />
            }

            {
              this.state.fetchingServerMsgs ?
                <div />
                                            :
                <InBoxMsgs
                  messages={this.props.messages}
                  readMessage={this.props.readMessage}
                  checkedMessage={this.props.checkedMessage}
                  expandMessage={this.props.expandMessage}
                  starredMessage={this.props.starredMessage}
                />
            }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  messages: state.messages.all,
  compose: state.compose,
  msgsById: state.messages.byId,
  router: state.router,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  readMessage,
  expandMessage,
  checkedMessage,
  starredMessage,
  checkAllMessages,
  markCheckedMessagesAsRead,
  addLabel,
  removeLabel,
  removeMessages,
  toggleCompose,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InBox);
