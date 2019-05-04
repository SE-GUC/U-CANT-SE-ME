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
import CircularProgress from "@material-ui/core/CircularProgress";

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
    email: "",
    lang: "",
    finished: false
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
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    const res = await axios.get(`../../../api/lawyers/${this.state.lawyerId}`);

    if (res.data.data.fullName)
      this.setState({ fullName: res.data.data.fullName });
    if (res.data.data.username)
      this.setState({ username: res.data.data.username });
    if (res.data.data.email) this.setState({ email: res.data.data.email });
    await this.setState({ finished: true });
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
    const classes = { ...styles };
    if (this.state.home === 0) return <div> </div>;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    if (!this.state.finished) {
      return (
        <div>
          <NavBarDashboard
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="lighter"
            profile="bold"
            homepage="lighter"
            electronicJournals="lighter"
            DASHBOARDD={true}
            PROFILEE={true}
            ProfileMargin="120px"
            HomePageMargin="0px"
          />
          <CircularProgress style={{ marginTop: "100px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: "10vh" }}>
          <NavBarDashboard
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="lighter"
            profile="bold"
            homepage="lighter"
            electronicJournals="lighter"
            DASHBOARDD={true}
            PROFILEE={true}
            ProfileMargin="120px"
            HomePageMargin="0px"
          />
          <Card style={classes.card}>
            <Typography gutterBottom variant="h5" component="h2" />
            <List style={classes.root}>
              <ListItem>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Profile" : "الملف الشخصي"
                  }
                />
                <Avatar style={styles.purpleAvatar}>
                  {this.state.fullName.toString().charAt(0)}
                </Avatar>
              </ListItem>
              <Divider light />
              <Divider />
              <ListItem>
                <ListItemText
                  primary={this.state.lang === "eng" ? "Name" : "الأسم"}
                  secondary={this.state.fullName}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Username" : "اسم المستخدم"
                  }
                  secondary={this.state.username}
                />
              </ListItem>
            </List>
            <CardActions />
          </Card>
          <br />
          <Card style={classes.card}>
            <Typography gutterBottom variant="h5" component="h2" />
            <List style={classes.root}>
              <ListItem>
                <ListItemText
                  primary={
                    this.state.lang === "eng"
                      ? "Contact info"
                      : "معلومات الاتصال"
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Email" : "البريد الإلكتروني"
                  }
                  secondary={this.state.email}
                />
              </ListItem>
            </List>
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
}

export default withStyles(styles)(LawyerProfile);
