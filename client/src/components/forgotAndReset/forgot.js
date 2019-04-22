import React, { Component } from 'react'
import axios from 'axios'
import NavBarBlue from '../NavBarBlue'
import Fab from '@material-ui/core/Fab'
class ExternalLogin extends Component {
    state = {
        email: '',
        type: ''
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email
        }
        
        try{
            if(this.state.type.toString()==="")
                throw new Error('You Have To Select an Account Type')
            let type = this.state.type.toString().toLowerCase()+'s'

            let email = this.state.email.toString()
            let res = await axios.post(`/api/${type}/forgot`, req)

            document.getElementById('Error').style.display = 'none'
            document.getElementById('Error_Type').style.display = 'none'
            document.getElementById('Success').style.display = 'inline'
 
        }
        catch(error){

            if(error.message === 'You Have To Select an Account Type'){
                document.getElementById('Error_Type').style.display = 'inline'
                document.getElementById('Error').style.display = 'none'
            }
            else{
                document.getElementById('Error').style.display = 'inline'
                document.getElementById('Error_Type').style.display = 'none'
            }
        }
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
            width: '100%',
            margin: 'auto',
        }
    }
    return(
        <div>
           <NavBarBlue sumergiteColor= '#3480E3' backgroundColor='#FFFFFF' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)'/>
           <div style={{paddingTop: '10vh'}}>
               <div class="wrapper">
                   <div class="page-header" style={{backgroundImage: "url('../assets/img/login-image.jpg')"}}>
                       <div class="filter"></div>
                           <div class="container">
                               <div class="row">
                                   <div class="col-lg-4 col-sm-6 mr-auto ml-auto">
                                       <div class="card card-register" style={{backgroundColor: '#FFFFFF', boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"}}>
                                           <h3 class="title" style={{fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '30px', fontWeight: 'bold', color: '#223242'}}>Forget Password</h3>
                                           <form class="login-form">
                                              
                                           <h5 style={{marginTop: '5px',fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', fontWeight: 'lighter', color: '#222529', textAlign: 'center'}}>Select Your Account Type</h5>
                                            <br />
                                            <select className="form-control" id="type" style={styles.label} onChange={this.handleChange} >
                                              <option value="" />
                                              <option value="Investor">Investor</option>
                                              <option value="Reviewer">Reviewer</option>
                                              <option value="Lawyer">Lawyer</option>
                                             </select>
                                             <br/>
                                             <label id="Error_Type" style={styles.error} class="text-danger"> You Have to Select an Account Type</label>
                                             <br/>
                                           <h4 style={{marginTop: '5px',fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', fontWeight: 'lighter', color: '#222529', textAlign: 'center'}}>Enter Your Email</h4>
                                              <input type="text" id="email" value={this.state.email} onChange={this.handleChange} class="form-control" placeholder="email" autocomplete="username"/>
                                              
                                           <br />
                                            <label id="Success" style={styles.error} class="text-success">Email has been successfully sent.</label>
                                            <label id="Error" style={styles.error} class="text-danger"> Email does not exist </label>
                                           </form>
                                           <br/>

                                           <div class="forgot">
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
           </div>
       )}
}

export default ExternalLogin;
