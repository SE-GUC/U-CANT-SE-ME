import React, { Component } from 'react'
import moment from 'moment'

export class Comment extends Component {
    getStyle = () => {
        return{
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.comment.read? 'line-through': 'none'
        } 
    }
    authorStyle = () => {
        return{
            fontFamily: 'Century Gothic'
        }
    }
    commentStyle = () => {
        return{
            background: '#f4f4f4',
            padding: '10px',
            fontFamily: 'Consolas'
        }
    }
    dateStyle = () => {
        return{
            fontFamily: 'Perpetua'
        }
    }

    formatTime(t) {
        return moment.utc(t.substring(0, 23)).format('DD, MMM, HH:mm').toUpperCase();
    }

  render() {
    const {author, body, date} = this.props.comment;
    return (
      <div style={this.getStyle()}>
        <h3 style={this.authorStyle()}>{author}</h3>
        <h4 style={this.commentStyle()}>{body}</h4>
        <h5 style={this.dateStyle()}>{this.formatTime(date)}</h5>
      </div>
    )
  }
}

export default Comment
