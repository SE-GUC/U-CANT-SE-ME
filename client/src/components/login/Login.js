import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { Redirect } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import {login} from '../../globalState/actions/authActions'
import './login.scss'
class Login extends Component {
    state = {
        email: '',
        password: '',
        id: '',
        showPassword: false,
        forgot: false,
        signUp: false
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email,
            username: this.state.email,
            password: this.state.password,
        }
        console.log('req', req)
        try{
            await login(req)
            document.getElementById('Error').style.display = 'none'
        }
        catch(error){
            document.getElementById('Error').style.display = 'inline'
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
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
        <div class="wrapper">
    <div class="page-header" style={{backgroundImage: "url('../assets/img/login-image.jpg')"}}>
        <div class="filter"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-sm-6 mr-auto ml-auto">
                        <div class="card card-register" style={{backgroundColor: '#FFFFFF', boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"}}>
                            <h3 class="title" style={{fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '30px', fontWeight: 'bold', color: '#223242'}}>Welcome Back!</h3>
                            <h5 style={{marginTop: '5px',fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', fontWeight: 'lighter', color: '#222529', textAlign: 'center'}}>Login back to your dashboard</h5>
                            <form class="login-form">
                                {/* <label>Email</label> */}
                                <input type="text" id="email" onChange={this.handleChange} class="form-control" placeholder="email or username" autocomplete="username"/>
                                {/* <label>Password</label> */}
                                <br/>
                                <input type="password" id="password" onChange={this.handleChange} class="form-control" placeholder="password" autocomplete = "current-password"/>
                                {/* <button class="btn btn-success btn-block" onClick={this.handleSubmit} style={{backgroundColor: '#E53167'}}>Login</button> */}
                                <br/>
                                <br/>
                                <Fab variant="extended" size="large" color = "secondary" style = {{color: '#FFFFFF', height: '31px', width: '107px',fontSize: '13px', boxShadow: 'none', marginRight: '240px', marginTop: '6px', display: 'block', margin: '0 auto'}} aria-label="Delete" onClick={() => {this.setState({register: true})}}>
                                    Login
                                </Fab>
                              </form>
                              <br/>
                            <div class="forgot">
                                <Button variant="primary" style={{fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#E53167', fontSize:'11px', fontWeight: 'bold'}} size="small" onClick={() => {this.setState({forgot: true})}}>
                                    Forgot password?
                                </Button>
                            </div>
                            <br/>
                            <br/>
                            <div style={{textAlign:'left', color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '11px'}}>Don't have an account?<a class="btn btn-link btn-info" style={{textAlign:'left', color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '11px', marginTop: '-1px', outline: 'none', border: 'none'}}>Create one.</a></div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
    </div>
</div>
      
        {/* <br />
        <br />
        <h3 class="text-center text-info">Login</h3>
        <br />

        <FormControl>    
            <InputLabel>Email</InputLabel>
            <Input
                id="email"
                type='text'
                value={this.state.email}
                style={{ width: 200 }}
                onChange={this.handleChange}
                
            />
        </FormControl>
        <br />
        <br />
        <FormControl>    
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
                style={{ width: 200 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
            />
        </FormControl>
        <br />
        <label id="Error" style={styles.error} class="text-danger"> Wrong Email or Password</label>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
            Login
        </Button>
        {
            this.state.id? 
                <Redirect to={{pathname: "/Home"}}/>:
                (this.state.forgot? <Redirect to={{pathname: "/forgot"}}/>:
                (this.state.signUp? <Redirect to={{pathname: "/InvestorRegister"}}/>:<div/>))
        }
        <div className="dropdown-divider"></div>
            <Button variant="primary" size="large" onClick={() => {this.setState({signUp: true})}}>
                New around here? Sign up.
            </Button>
            <Button variant="primary" size="large" onClick={() => {this.setState({forgot: true})}}>
                Forgot password?
            </Button> */}
    </div>
    )}
}

export default Login;
