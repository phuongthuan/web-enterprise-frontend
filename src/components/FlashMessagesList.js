import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../actions/flashMessageActions';
import FlashMessage from './FlashMessage';

class FlashMessagesList extends Component {
  static propTypes = {
    flashMessage: PropTypes.array.isRequired,
  }

  render() {
    const messages = this.props.flashMessage.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );
    return (
      <div>{messages}</div>
    );
  }
}

const mapStateToProps = state => ({
  flashMessage: state.flashMessage
});

export default connect(
  mapStateToProps,
  { deleteFlashMessage }
)(FlashMessagesList);
