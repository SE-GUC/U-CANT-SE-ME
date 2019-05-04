import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import EstablishedIcon from "@material-ui/icons/VerifiedUser";
import Language from "@material-ui/icons/Language";
import InvestorIcon from "@material-ui/icons/Person";
import Public from "@material-ui/icons/Public";
import CreationDateIcon from "@material-ui/icons/DateRange";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Email from "@material-ui/icons/Email";
import moment from "moment";

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
  },
  avatar: {
    margin: -10,
    width: 35,
    height: 35,
    backgroundColor: "#3480E3"
  },
  cardActions: {
    height: 50
  },
  avatarCardAction: {
    margin: -5,
    width: 25,
    height: 25,
    backgroundColor: "#3480E3"
  },
  iconCardAction: {
    width: 15,
    height: 15
  }
};
class ElectronicJournal extends Component {
  state = {
    lang: ""
  };
  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
  }
  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("DD MMM, YYYY")
      .toUpperCase();
  }
  render() {
    const classes = { ...styles };

    return (
      <Card style={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2" />
            <List style={classes.root}>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <InvestorIcon />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Investor Name" : "اسم المستثمر"
                  }
                  secondary={this.props.electronicJournal.fullName}
                />
                <EstablishedIcon />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <Public />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Nationality" : "الجنسية"
                  }
                  secondary={this.props.electronicJournal.nationality}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <Email />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Email" : "البريد الإلكتروني"
                  }
                  secondary={this.props.electronicJournal.email}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <LocalPhone />
                </Avatar>
                <ListItemText
                  primary={this.state.lang === "eng" ? "Telephone" : "الهاتف"}
                  secondary={this.props.electronicJournal.telephoneNumber}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <LocalPhone />
                </Avatar>
                <ListItemText
                  primary={this.state.lang === "eng" ? "Fax" : "الفاكس"}
                  secondary={this.props.electronicJournal.fax}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <CreationDateIcon />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng"
                      ? "Date of Birth"
                      : "تاريخ الميلاد"
                  }
                  secondary={this.formatTime(
                    this.props.electronicJournal.dateOfBirth
                  )}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <Language />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng"
                      ? "Arabic Company Name"
                      : "اسم الشركة العربي"
                  }
                  secondary={this.props.electronicJournal.companyNameArabic}
                />
              </ListItem>
              {this.props.electronicJournal.companyNameEnglish ? (
                <ListItem>
                  <Avatar style={classes.avatar}>
                    <Language />
                  </Avatar>
                  <ListItemText
                    primary={
                      this.state.lang === "eng"
                        ? "English Company Name"
                        : "اسم الشركة الإنجليزي"
                    }
                    secondary={this.props.electronicJournal.companyNameEnglish}
                  />
                </ListItem>
              ) : (
                <label />
              )}
              <ListItem>
                <Avatar style={classes.avatar}>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng" ? "Company Type" : "نوع الشركة"
                  }
                  secondary={this.props.electronicJournal.companyType}
                />
              </ListItem>
              <ListItem>
                <Avatar style={classes.avatar}>
                  <CreationDateIcon />
                </Avatar>
                <ListItemText
                  primary={
                    this.state.lang === "eng"
                      ? "Creation Date"
                      : "تاريخ الإنشاء"
                  }
                  secondary={this.formatTime(
                    this.props.electronicJournal.dateOfCreation
                  )}
                />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(ElectronicJournal);
