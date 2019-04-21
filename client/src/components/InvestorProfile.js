import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import EditIcon from '@material-ui/icons/Edit'
import axios from "axios"
import Divider from '@material-ui/core/Divider'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import moment from 'moment'
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


class InvestorProfile extends Component {
  state = {
    fullName: '',
    dateOfBirth: '',
    password: '',
    gender: '',
    showPassword: false,
    edit: false,
  };

  async componentDidMount (){
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try{
        await axios.get('../api/investors/auth')
    }catch(err){
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
      const data = parseJwt(localStorage.jwtToken)
    try{
        await this.setState({investorId : parseJwt(localStorage.jwtToken).id})
      }catch
      {
        this.setState({investorId : null})
      }
    const res = await axios.get(`../api/investors/${this.state.investorId}`)
    if (res.data.data.fullName)
      this.setState({ fullName: res.data.data.fullName})
    if (res.data.data.dateOfBirth)
      this.setState({ dateOfBirth: res.data.data.dateOfBirth})
    if (res.data.data.gender)
      this.setState({ gender: res.data.data.gender})
    if (res.data.data.nationality)
      this.setState({ nationality: res.data.data.nationality})
    if (res.data.data.email)
      this.setState({ email: res.data.data.email})
    if (res.data.data.fax)
      this.setState({ fax: res.data.data.fax})
    if (res.data.data.telephoneNumber)
      this.setState({ telephoneNumber: res.data.data.telephoneNumber})  
    
  }

    formatTime(t) {
        return moment.utc(t.substring(0, 23)).format('DD MMM, YYYY').toUpperCase();
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
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
    if (this.state.home===0) return <div> </div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div style={{paddingTop: '10vh'}}>
      <Card style={{pointerEvents: 'none'}}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {/* {this.props.case.form.companyNameArabic} */}
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
                  <ListItemText primary="Name" secondary={this.state.fullName} />
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Birthday" secondary={this.formatTime(this.state.dateOfBirth)} />
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary="Gender" secondary={this.state.gender}/>
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
      <br/>
      <Card style={{pointerEvents: 'none'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {this.props.case.form.companyNameArabic} */}
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
              <Divider/>
              <ListItem>
                <ListItemText primary="Telephone" secondary={this.state.telephoneNumber} />
              </ListItem>
              <Divider/>
              <ListItem>
                  <ListItemText primary="Fax" secondary={this.state.fax}/>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
    <br/>
    {this.state.investorId===null? <Redirect to={{pathname: "/Login"}}/>:
      this.state.edit===true? <Redirect to={{pathname: "/updateInvestorProfile"}}/>:<label/>
    }
      <Button size="small" color="primary"  onClick={() => {this.setState({edit: true})}}>
        Edit Profile <EditIcon/>
      </Button>
    <br/>
    <br/>
    </div>
    );
  }
}

export default withStyles(styles)(InvestorProfile);
