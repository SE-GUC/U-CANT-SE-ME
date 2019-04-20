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
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import commentIcon from "@material-ui/icons/CommentOutlined";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import axios from "axios";

const styles= {
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
  },
  cardActions:{
    height: 50
  }
}


class CasePreview extends Component {
  state = {
    investorName: "",
    caseStatus: "",
    commentsNumber: 0
  };

  componentDidMount (){
    axios
      .get(`api/investors/${this.props.case.creatorInvestorId}`)
      .then(res => {
        this.setState({investorName:res.data.fullName});
      })
      .catch(err => {
        this.setState({investorName:"NA"});
      })
  }

  render() {
    const classes = { ...styles };
    console.log(this.props.investorName)
    return (
      <Card style={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.case.form.companyNameArabic}
            </Typography>
            <Typography component="p">
            <List style={classes.root}>
                <ListItem>
                  {/* <Avatar>
                    <ImageIcon />
                  </Avatar> */}
                  <ListItemText primary="Investor Name" secondary={this.state.investorName} />
                </ListItem>
                <ListItem>
                  {/* <Avatar>
                    <WorkIcon />
                  </Avatar> */}
                  <ListItemText primary="Company Type" secondary={this.props.case.companyType} />
                </ListItem>
                <ListItem>
                  {/* <Avatar>
                    <BeachAccessIcon />
                  </Avatar> */}
                  <ListItemText primary="Creation Date" secondary={this.props.case.caseCreationDate} />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={classes.cardActions}>
          <ListItem>
              <Avatar style={classes.avatar}>
                <WorkIcon />
              </Avatar>
              <ListItemText primary="Status" secondary={this.props.case.caseStatus} />
          </ListItem>
          <ListItem>
              <Avatar style={classes.avatar}>
                <commentIcon />
              </Avatar>
              <ListItemText primary="Comments" secondary={this.props.case.comments.length} />
          </ListItem>
          <Button size="small" color="primary">
            View Details
          </Button>
        </CardActions>
        <Button size="small" color="primary">
            View Details
          </Button>
      </Card>
    );
  }
}

export default withStyles(styles)(CasePreview);
