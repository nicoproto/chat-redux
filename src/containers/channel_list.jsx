import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChannel, getMessages } from '../actions/index';

class ChannelList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChannel !== this.props.selectedChannel) {
      console.log("received props");
      this.props.getMessages(nextProps.selectedChannel);
    }
  }

  handleClick(channel) {
    this.props.selectChannel(channel);
  }

  renderList() {
    return this.props.channels.map((channel) => {
      return (
        <li
          className={channel === this.props.selectedChannel ? "active" : ""}
          onClick={() => this.handleClick(channel)}
        >{channel}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="channels-container">
        <span>Channels</span>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
    selectedChannel: state.selectedChannel
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChannel, getMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
