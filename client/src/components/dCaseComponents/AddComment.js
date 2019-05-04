import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import Comment from "../ViewComments/Comment";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import { Fab } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class AddComment extends Component {
  state = {
    case: {},
    text: "",
    authorID: "",
    type: "",
    actionMsg: "",
    home: 0
  };

  handleTextBox = async event => {
    await this.setState({ text: event.target.value, actionMsg: "" });
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      await this.setState({ home: 1 });
      return;
    }
    const data = await parseJwt(localStorage.jwtToken);
    await this.setState({ authorID: data.id, type: data.type });
    if (this.state.type === "investor") {
      try {
        await axios.get("api/investors/auth");
      } catch (err) {
        alert("You are not allowed to access this page");
        await this.setState({ home: 1 });
        return;
      }
      await this.setState({ home: 2 });
    } else if(this.state.type==='reviewer' || this.state.type ==='lawyer') {
      try {
        await axios.get("api/lawyers/authReviewerOrLawyer");
      } catch (err) {
        alert("You are not allowed to access this page");
        await this.setState({ home: 1 });
        return;
      }
      await this.setState({ home: 2 });
    }
    else {
      try {
        await axios.get("api/admins/auth");
      } catch (err) {
        alert("You are not allowed to access this page");
        await this.setState({ home: 1 });
        return;
      }
      await this.setState({ home: 2 });
    }

    if (this.props.caseID) {
      axios
        .get(`api/cases/${this.props.caseID}`)
        .then(res => {
          if (res.data.data) {
            this.setState({ case: res.data.data });
          }
        })
        .catch(err => {
          this.setState({ case: err.response.data.error });
        });
    }
  }

  render() {
    if (this.state.home === 0) return <div />;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <header className="Comments">
        <div>
          <Fab
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.props.handleCommentsBack}
          >
            {"Back"}
          </Fab>
        </div>
        <Card style={this.props.classes.card}>
          <CardContent>
            <div>
              {this.state.case.comments !== undefined ? (
                this.state.case.comments.length === 0 ? (
                  <h1>No Comments Yet</h1>
                ) : (
                  this.state.case.comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                  ))
                )
              ) : null}
            </div>
          </CardContent>
        </Card>
        {(this.state.type === "investor" || this.state.type=== "admin") ? (
          <div />
        ) : (
          <div>
            <Card style={this.props.classes.card}>
              <CardContent>
                <div>
                  <TextField
                    id="standard-full-width"
                    label="Comment"
                    style={{ margin: 8 }}
                    placeholder="Type Comment Here..."
                    helperText="Make it descriptive!"
                    fullWidth
                    multiline
                    margin="normal"
                    onChange={this.handleTextBox}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  {this.state.actionMsg === "" ? null : (
                    <div
                      className={
                        this.state.actionMsg === "Comment added successfully!"
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.actionMsg}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <br />
            <br />
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={async () => {
                  try {
                    const body = {
                      body: this.state.text
                    };
                    if (this.state.type === "reviewer") {
                      await axios.put(
                        `api/reviewers/addCommentAsReviewer/${
                          this.state.authorID
                        }/${this.state.case._id}`,
                        body
                      );
                      this.setState({
                        actionMsg: "Comment added successfully!"
                      });
                    } else if (this.state.type === "lawyer") {
                      await axios.put(
                        `api/lawyers/addCommentAsLawyer/${
                          this.state.authorID
                        }/${this.state.case._id}`,
                        body
                      );
                      this.setState({
                        actionMsg: "Comment added successfully!"
                      });
                    }
                    this.componentDidMount();
                  } catch (err) {
                    this.setState({ actionMsg: err.response.data.error });
                  }
                }}
              >
                Add Comment
                <SendIcon />
              </Button>
              <br />
              <br />
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default AddComment;
