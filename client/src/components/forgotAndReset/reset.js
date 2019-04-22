import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Fab from '@material-ui/core/Fab'
class ExternalLogin extends Component {
    state = {
        password: '',
        showPassword: false
    }
    handleSubmit = async () => {
        const req = {
            password: this.state.password
        }
        document.getElementById('Token').style.display = 'none'
        try{
            let res = await axios.post(`/api/${this.props.match.params.type}/reset/${this.props.match.params.token}`, req)
            document.getElementById('Success').style.display = 'inline'
        }
        catch(error){
            if(error.message === 'Network Error')
                document.getElementById('Token').style.display = 'inline'
            document.getElementById('Success').style.display = 'none'
        }
        if(document.getElementById('Token').style.display === 'none')
            document.getElementById('Success').style.display = 'inline'
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

render(){
    const styles = {
        error: {
            display: 'none'
        },
        label: {
            width: '35%',
            margin: 'auto'
        }
    }
    return(
    <div style={{paddingTop: '10vh'}}>
        <br />
        <br />
        <div style={{paddingTop: '10vh'}}>
               <div class="wrapper">
                   <div class="page-header" style={{backgroundImage: "url('../assets/img/login-image.jpg')"}}>
                       <div class="filter"></div>
                           <div class="container">
                               <div class="row">
                                   <div class="col-lg-4 col-sm-6 mr-auto ml-auto">
                                       <div class="card card-register" style={{backgroundColor: '#FFFFFF', boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"}}>
                                           <h3 class="title" style={{fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '30px', fontWeight: 'bold', color: '#223242'}}>Forget Password</h3>
                                           <form class="login-form"></form>
                                           <br/>
        <FormControl>    
            <br/>
            <InputLabel htmlFor="adornment-password">New Password</InputLabel>
            <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
            />
        </FormControl>
        <br />
        <label id="Success" style={styles.error} class="text-success">
            Password successfully reset.
        </label>
        <label id="Token" style={styles.error} class="text-danger">
            Link has expired.
        </label>
        <br />
        <br/>
        <br/>
        
                                            <Fab variant="extended" size="large" color = "secondary" style = {{color: '#FFFFFF', height: '31px', width: '107px',fontSize: '13px', boxShadow: 'none', marginRight: '240px', marginTop: '6px', display: 'block', margin: '0 auto'}} aria-label="Delete" onClick={this.handleSubmit}>
                                                SUBMIT
                                            </Fab>
                                           </div>
                                           <br/>
                             </div>
                                   </div>      
                               </div>
                           </div>
                       </div>
                      
                   </div>
               </div>
    )}
}

export default ExternalLogin;
