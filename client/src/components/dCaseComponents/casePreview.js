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
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const styles= {
  card: {
    width: 345,
    margin: "1%"
  },
  media: {
    height: 140
  },
  root: {
    width: 345
  }
}


class CasePreview extends Component {
  state = {
    companyNameArabic: "",
    investorName: "",
    caseStatus: "",
    caseCreationDate: "",
    companyType: "",
    commentsNumber: 0
  };

  render() {
    const classes = { ...styles };
    console.log(this.props.investorName)
    // console.log("###############################");
    // console.log(JSON.stringify(this.props.case))
    // console.log(Object.keys(this.props.case));
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
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary="Investor Name" secondary={this.props.investorName} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                  <ListItemText primary="Company Type" secondary={this.props.case.companyType} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                  <ListItemText primary="Creation Date" secondary={this.props.case.caseCreationDate} />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CasePreview);
