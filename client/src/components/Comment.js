import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            // background: '#D5DBDB',
            // padding: '5px',
            // borderBottom: '1px #34495E solid',
            // borderRight: '1px #34495E solid',
            // borderTop: '1px #34495E solid',
            // borderLeft: '1px #34495E solid',
            // marginTop: '0px', 
            // margin: '0px 0'
            // borderStyle: 'dotted'
        }
    }
    commentStyle = () => {
        return{
            background: '#f4f4f4',
            padding: '10px',
            fontFamily: 'Consolas'
            // border: '3px dotted burlywood'
            // borderBottom: '3px #34495E solid',
            // borderRight: '3px #34495E solid',
            // borderTop: '3px #34495E solid',
            // borderLeft: '3px #34495E solid',
            // borderStyle: 'dotted'
        }
    }
    dateStyle = () => {
        return{
            fontFamily: 'Perpetua'
            // fontWeight: '800'
        }
    }

    formatTime(t) {
        return moment.utc(t.substring(0, 23)).format('DD, MMM, HH:mm').toUpperCase();
    }

  render() {
    const {author, body, date} = this.props.comment;
    return (
      <div style={this.getStyle()}>
        <p>
            {/* <input type="checkbox" onChange={this.props.markRead.bind(this, _id)} /> {' '} */}
          {/* { author } */}
          {/* { '\n' } */}
          {/* { body } */}
          {/* { '\n' } */}
          {/* { date } */}
        </p>
        <p>
            <h3 style={this.authorStyle()}>{author}</h3>
            <h4 style={this.commentStyle()}>{body}</h4>
            <h5 style={this.dateStyle()}>{this.formatTime(date)}</h5>
        </p>
      </div>
    )
  }
}

// PropTypes
Comment.propTypes = {
    comments: PropTypes.object.isRequired
}

export default Comment
