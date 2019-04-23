import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import {login} from '../../globalState/actions/authActions'
import './login.scss'
import NavBarBlue from '../NavBarBlue'
import NavBarDashboard from '../NavBarDashboard'
class Login extends Component {
    state = {
        email: '',
        password: '',
        id: '',
        showPassword: false,
        forgot: false,
        signUp: false,
        res: '',
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email,
            username: this.state.email,
            password: this.state.password,
        }
        try{
            const res = await login(req)
            this.setState({res: res})
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
     <div>
         {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={true} PROFILE={true} ProfileMargin='120px' HomePageMargin='0px'/>  */}
         {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={false} PROFILE={false} HomePageMargin='120px'/>  */}
         {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={false} PROFILE={false} HomePageMargin='120px' LeftButton={true}/>  */}
         {/* <NavBarBlue sumergiteColor= '#FFFFFF' backgroundColor='#3480E3' loginColor='#FFFFFF'/> */}
        <NavBarBlue sumergiteColor= '#3480E3' backgroundColor='#FFFFFF' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' popUpRegister={true}/>
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
                                            <input type="text" id="email" onChange={this.handleChange} class="form-control" placeholder="email or username" autocomplete="username"/>
                                            <br/>
                                            <input type="password" id="password" onChange={this.handleChange} class="form-control" placeholder="password" autocomplete = "current-password"/>
                                            <br/>
                                            <label id="Error" style={styles.error} class="text-danger"> Wrong Email or Password</label>
                                            <br/>
                                            <Fab variant="extended" size="large" color = "secondary" style = {{color: '#FFFFFF', height: '31px', width: '107px',fontSize: '13px', boxShadow: 'none', marginRight: '240px', marginTop: '6px', display: 'block', margin: '0 auto'}} aria-label="Delete" onClick={this.handleSubmit}>
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
                                        <div style={{textAlign:'left', color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '11px'}}>Don't have an account?<a class="btn btn-link btn-info" style={{textAlign:'left', color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '11px', marginTop: '-1px', outline: 'none', border: 'none'}} onClick={() => {this.setState({register: true})}}>Create one.</a></div>   
                                    </div>
                                </div>      
                                {
                                    this.state.forgot===true? <Redirect to={{pathname: "/forgot"}}/>:
                                    this.state.register===true? <Redirect to={{pathname: "/InvestorRegister"}}/>:<label/> //to be set to unified registration page
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.res.toString()==='investor'? <Redirect to={{pathname: "/profile"}}/>:
                        this.state.res.toString()==='lawyer'? <Redirect to={{pathname: "/internalPortal/lawyer/profile"}}/>:
                        this.state.res.toString()==='reviewer'? <Redirect to={{pathname: "/internalPortal/reviewer/profile"}}/>:
                        this.state.res.toString()==='admin'? <Redirect to={{pathname: "/AdminDashBoard"}}/>:<label/>
                    }
                </div>
            </div>
        </div>
    )}
}

export default Login;
