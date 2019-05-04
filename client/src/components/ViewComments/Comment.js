import React, { Component } from "react";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import "semantic-ui-css/semantic.min.css";
import { Card } from "semantic-ui-react";

export class Comment extends Component {
  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("DD, MMM, HH:mm")
      .toUpperCase();
  }

  render() {
    const styles = {
      avatar: {
        margin: 10
      },
      orangeAvatar: {
        margin: "auto",
        color: "#fff",
        backgroundColor: deepOrange[500]
      },
      purpleAvatar: {
        margin: "auto",
        color: "#fff",
        backgroundColor: deepPurple[500]
      },
      author: {
        margin: "auto",
        padding: "0px"
      }
    };
    const { author, body, date } = this.props.comment;
    const avatarName = author.toString().charAt(0);
    return (
      <Card.Group itemsPerRow={1}>
        <Card color="blue">
          <Card.Content>
            <Avatar style={styles.purpleAvatar}>{avatarName}</Avatar>
            {`Author:  ${author}`}
          </Card.Content>
          <Card.Content description={body} />
          <Card.Content extra>{`On ${this.formatTime(date)}`}</Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default Comment;
