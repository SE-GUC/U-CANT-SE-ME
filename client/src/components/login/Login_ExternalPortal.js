import React, { Component } from 'react'
import axios from 'axios'

class ExternalLogin extends Component {
    state = {
        email: "",
        password: "",
        id: ""
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email,
            password: this.state.password
        }
        try{
            let res = await axios.post('http://localhost:5000/api/investors/login', req)
            document.getElementById('Error').style.display = 'none'
            this.setState({
                id: res.data._id
            })
        }
        catch(error){
            document.getElementById('Error').style.display = 'inline'
            // alert('Wrong Email or Password')
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
            width: '35%',
            margin: 'auto'
        }
    }
    return(
    <div>
        <br />
        <br />
        <h3 class="text-center text-info">Login</h3>
        <br />
        <div className = "form">
            <label class="text-info">Email</label>
            <input class="form-control" onChange={this.handleChange} type="text" id="email" style={styles.label}/>
        </div>
        <div className = "form">
            <label class="text-info">Password</label>
            <input class="form-control" onChange={this.handleChange} type="password" id="password" style={styles.label}/>
        </div>
        <label id="Error" style={styles.error} class="text-danger"> Wrong Email or Password</label>
        <br />
        <button type="button" class="btn btn-outline-primary" onClick={this.handleSubmit}>Login</button>
        <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">New around here? Sign up</a>
            <a className="dropdown-item" href="#">Forgot password?</a>
    </div>
    )}
}

export default ExternalLogin;
