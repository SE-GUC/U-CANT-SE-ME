import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import moment from "moment";
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

class InvestorProfile extends Component {
  state = {
    fullName: "",
    dateOfBirth: "",
    password: "",
    gender: "",
    showPassword: false,
    edit: false,
    lang: "",
    finished: false
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    try {
      await axios.get("../api/investors/auth");
    } catch (err) {
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
    try {
      await this.setState({ investorId: parseJwt(localStorage.jwtToken).id });
    } catch {
      this.setState({ investorId: null });
    }
    const res = await axios.get(`../api/investors/${this.state.investorId}`);
    if (res.data.data.fullName)
      this.setState({ fullName: res.data.data.fullName });
    if (res.data.data.dateOfBirth)
      this.setState({ dateOfBirth: res.data.data.dateOfBirth });
    if (res.data.data.gender) this.setState({ gender: res.data.data.gender });
    if (res.data.data.nationality)
      this.setState({ nationality: res.data.data.nationality });
    if (res.data.data.email) this.setState({ email: res.data.data.email });
    if (res.data.data.fax) this.setState({ fax: res.data.data.fax });
    if (res.data.data.telephoneNumber)
      this.setState({ telephoneNumber: res.data.data.telephoneNumber });
    await this.setState({ finished: true });
  }

  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("DD MMM, YYYY")
      .toUpperCase();
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
          <div style={{ paddingTop: "10vh" }}>
            <NavBarDashboard
              dashboardRedirect="/InvestorDashBoard"
              sumergiteColor="#3480E3"
              boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
              dashboard="lighter"
              profile="bold"
              homepage="lighter"
              DASHBOARDD={true}
              PROFILEE={true}
              ProfileMargin="120px"
              HomePageMargin="0px"
            />
          </div>
          <div>
            <CircularProgress style={{ marginTop: "100px" }} />
            <h3>Fetching Data</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: "10vh" }}>
          <NavBarDashboard
            dashboardRedirect="/InvestorDashBoard"
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="lighter"
            profile="bold"
            homepage="lighter"
            DASHBOARDD={true}
            PROFILEE={true}
            ProfileMargin="120px"
            HomePageMargin="0px"
          />
          <Card style={{ pointerEvents: "none" }}>
            <CardActionArea>
              <CardContent>
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
                        this.state.lang === "eng" ? "Birthday" : "تاريخ الميلاد"
                      }
                      secondary={this.formatTime(this.state.dateOfBirth)}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={this.state.lang === "eng" ? "Gender" : "الجنس"}
                      secondary={this.state.gender}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </CardActionArea>
            <CardActions />
          </Card>
          <br />
          <Card style={{ pointerEvents: "none" }}>
            <CardActionArea>
              <CardContent>
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
                        this.state.lang === "eng"
                          ? "Email"
                          : "البريد الإلكتروني"
                      }
                      secondary={this.state.email}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={
                        this.state.lang === "eng" ? "Telephone" : "الهاتف"
                      }
                      secondary={this.state.telephoneNumber}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={this.state.lang === "eng" ? "Fax" : "الفاكس"}
                      secondary={this.state.fax}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </CardActionArea>
            <CardActions />
          </Card>
          <br />
          {this.state.investorId === null ? (
            <Redirect to={{ pathname: "/Login" }} />
          ) : this.state.edit === true ? (
            <Redirect to={{ pathname: "/updateInvestorProfile" }} />
          ) : (
            <label />
          )}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              this.setState({ edit: true });
            }}
          >
            {this.state.lang === "eng" ? "Edit Profile" : "تعديل الملف الشخصي"}{" "}
            <EditIcon />
          </Button>
          <br />
          <br />
        </div>
      );
    }
  }
}

export default withStyles(styles)(InvestorProfile);
