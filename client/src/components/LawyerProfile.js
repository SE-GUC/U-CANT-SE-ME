import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import axios from "axios"
import Divider from '@material-ui/core/Divider'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import parseJwt from '../helpers/decryptAuthToken'
import { Redirect } from 'react-router-dom'
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
  }
}


class LawyerProfile extends Component {
  state = {
    lawyerId: '',
    username: '',
    fullName: '',
    email: ''
  };

  async componentDidMount (){
    try
      {
        await this.setState({lawyerId : parseJwt(localStorage.jwtToken).id})
        console.log(this.state.lawyerId)
      }
      catch
      {
        this.setState({lawyerId : null})
      }
      const res = await axios.get(`../api/lawyers/${this.state.lawyerId}`)
      // const res = await axios.get(`http://localhost:5000/api/lawyers/${this.state.lawyerId}`)
      
    if (res.data.data.fullName)
      this.setState({ fullName: res.data.data.fullName})
    if (res.data.data.username)
      this.setState({ username: res.data.data.username})
    if (res.data.data.email)
      this.setState({ email: res.data.data.email}) 
    
  }

  render() {
    const classes = { ...styles }
    const styles = {
        avatar: {
          margin: 10,
      },
      orangeAvatar: {
        margin: 'auto',
        color: '#fff',
        backgroundColor: deepOrange[500],
        },
      purpleAvatar: {
        margin: 'auto',
        color: '#fff',
        backgroundColor: deepPurple[500],
      },
      author: {
          margin: 'auto',
          padding: '0px'
      },
      card: {
        width: 345,
        borderRadius: 12,
        fontFamily: 'Helvetica Neue',
        boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.16)',
        margin: '1%'
      },
      media: {
        height: 140
      },
      root: {
        width: 345
      }
    }
    return (
      <div>
      <Card style={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            </Typography>
            <Typography component="p">
            <List style={classes.root}>
                <ListItem>
                    <ListItemText primary="Profile"/>
                    <Avatar style={styles.purpleAvatar}>{this.state.fullName.toString().charAt(0)}</Avatar>
                </ListItem>
                <Divider light/>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Full Name" secondary={this.state.fullName} />
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Username" secondary={this.state.username} />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
      <br/>
      <Card style={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          </Typography>
          <Typography component="p">
          <List style={classes.root}>
              <ListItem>
                  <ListItemText primary="Contact info"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary="Email" secondary={this.state.email} />
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
    <br/>
    {this.state.lawyerId===null? <Redirect to={{pathname: "/LoginInternalPortal"}}/>:<label/>}
    <br/>
    <br/>
    </div>
    );
  }
}

export default withStyles(styles)(LawyerProfile);
