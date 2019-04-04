import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class Comments extends Component {
render(){
  return this.props.comments.map((comment) => (
    <Comment key={comment.id} comment={comment} markRead={this.props.markRead} />
  ))
  }
}

// PropTypes
Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments;
