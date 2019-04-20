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
import WorkIcon from "@material-ui/icons/Work";
import CommentIcon from "@material-ui/icons/CommentOutlined";
import AcceptedIcon from "@material-ui/icons/Check";
import RejectedIcon from "@material-ui/icons/Close";
import PendingIcon from "@material-ui/icons/RotateRight";

import InvestorIcon from "@material-ui/icons/Person";
import CreationDateIcon from "@material-ui/icons/DateRange";


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
    backgroundColor : "#3480E3"
  },
  cardActions:{
    height: 50
  },
  avatarCardAction: {
    margin: -5,
    width: 25,
    height: 25,
    backgroundColor : "#3480E3"
  },
  iconCardAction: {
    width: 15,
    height: 15,
  },
  actionCardFont:{
    fontSize : 12,
    //color:"#3480E3"
  },
  actionCardFont2:{

    color:"#E53167"
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
                  <Avatar style={classes.avatar}>
                    <InvestorIcon />
                  </Avatar>
                  <ListItemText primary="Investor Name" secondary={this.state.investorName} />
                </ListItem>
                <ListItem>
                  <Avatar style={classes.avatar}>
                    <WorkIcon />
                  </Avatar>
                  <ListItemText primary="Company Type" secondary={this.props.case.companyType} />
                </ListItem>
                <ListItem>
                  <Avatar style={classes.avatar}>
                    <CreationDateIcon />
                  </Avatar>
                  <ListItemText primary="Creation Date" secondary={this.props.case.caseCreationDate} />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={classes.cardActions}>
          <ListItem>
              <Avatar style={classes.avatarCardAction}>
                {this.props.case.caseStatus==="Rejected"?<RejectedIcon style={classes.iconCardAction}/>:this.props.case.caseStatus==="Accepted"?<AcceptedIcon style={classes.iconCardAction}/>:<PendingIcon style={classes.iconCardAction}/>}
              </Avatar>
              <ListItemText disableTypography primary={<Typography variant="body1">Status</Typography>} secondary={<Typography style={{color:this.props.case.caseStatus==="Rejected"?"#E53167":this.props.case.caseStatus==="Accepted"?"#2DD07B":"#3480E3"}} variant="caption">{this.props.case.caseStatus}</Typography>}/>
              {/* <ListItemText primary="Status" secondary={this.props.case.caseStatus} /> */}
          </ListItem>
          <ListItem>
              <Avatar style={classes.avatarCardAction}>
                <CommentIcon style={classes.iconCardAction} />
              </Avatar>
              <ListItemText disableTypography primary={<Typography variant="body1">Comments</Typography>} secondary={<Typography variant="caption">{this.props.case.comments.length}</Typography>}/>
              {/* <ListItemText primary="Comments" secondary={this.props.case.comments.length} /> */}
          </ListItem>
        </CardActions>
        <Button size="small" color="primary">
            View Details
          </Button>
      </Card>
    );
  }
}

export default withStyles(styles)(CasePreview);
