import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import parseJwt from "../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import NavBarDashboard from "./NavBarDashboard";
const styles = {
  card: {
    width: 345,
    borderRadius: 12,
    fontFamily: "Helvetica Neue",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    margin: "1%"
  },
  media: {
    height: 140
  },
  root: {
    width: 345
  }
};

class LawyerProfile extends Component {
  state = {
    lawyerId: "",
    username: "",
    fullName: "",
    email: ""
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("../../../api/lawyers/auth");
    } catch (err) {
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
    try {
      await this.setState({ lawyerId: parseJwt(localStorage.jwtToken).id });
    } catch {
      this.setState({ lawyerId: null });
    }
    const res = await axios.get(`../../../api/lawyers/${this.state.lawyerId}`);

    if (res.data.data.fullName)
      this.setState({ fullName: res.data.data.fullName });
    if (res.data.data.username)
      this.setState({ username: res.data.data.username });
    if (res.data.data.email) this.setState({ email: res.data.data.email });
  }

  render() {
    const classes = { ...styles };
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
      },
      card: {
        width: 345,
        borderRadius: 12,
        fontFamily: "Helvetica Neue",
        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
        margin: "1%"
      },
      media: {
        height: 140
      },
      root: {
        width: 345
      }
    };
    if (this.state.home === 0) return <div> </div>;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div style={{ paddingTop: "10vh" }}>
        <NavBarDashboard
          sumergiteColor="#3480E3"
          boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
          dashboard="lighter"
          profile="bold"
          homepage="lighter"
          DASHBOARD={true}
          PROFILE={true}
          ProfileMargin="120px"
          HomePageMargin="0px"
        />
        <Card style={classes.card}>
          <Typography gutterBottom variant="h5" component="h2" />
          <Typography component="p">
            <List style={classes.root}>
              <ListItem>
                <ListItemText primary="Profile" />
                <Avatar style={styles.purpleAvatar}>
                  {this.state.fullName.toString().charAt(0)}
                </Avatar>
              </ListItem>
              <Divider light />
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Full Name"
                  secondary={this.state.fullName}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Username"
                  secondary={this.state.username}
                />
              </ListItem>
            </List>
          </Typography>
          <CardActions />
        </Card>
        <br />
        <Card style={classes.card}>
          <Typography gutterBottom variant="h5" component="h2" />
          <Typography component="p">
            <List style={classes.root}>
              <ListItem>
                <ListItemText primary="Contact info" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary={this.state.email} />
              </ListItem>
            </List>
          </Typography>
          <CardActions />
        </Card>
        <br />
        {this.state.lawyerId === null ? (
          <Redirect to={{ pathname: "/LoginInternalPortal" }} />
        ) : (
          <label />
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(LawyerProfile);
