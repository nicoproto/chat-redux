import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Message from '../components/message';
import { getMessages } from '../actions';
import MessageForm from '../containers/message_form';

class MessageList extends Component {
  componentWillMount() {
    this.getMessages();
  }

  componentDidMount() {
    this.intervalGetMsg = setInterval(this.getMessages, 5000);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.messages);
    console.log(prevProps.messages);
    console.log(this.props.messages !== prevProps.messages);

    if (this.props.messages !== prevProps.messages) {
      this.list.scrollTop = this.list.scrollHeight;
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalGetMsg);
  }

  getMessages = () => {
    this.props.getMessages(this.props.selectedChannel);
  }

  renderList() {
    return this.props.messages.map((message) => {
      return (
        <Message key={message.created_at} message={message} />
      );
    });
  }

  render() {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          {this.renderList()}
        </div>
        <MessageForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    selectedChannel: state.selectedChannel
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
