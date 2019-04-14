import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'

class ExternalLogin extends Component {
    state = {
        email: "",
        type: ""
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email
        }
        try{
            if(this.state.type.toString()==="")
                throw new Error('You Have To Select an Account Type')
            let type = this.state.type.toString().toLowerCase()+'s'
            console.log('type', type)
            let res = await axios.post(`http://localhost:5000/api/${type}/forgot`, req)
            document.getElementById('Error').style.display = 'none'
            document.getElementById('Error_Type').style.display = 'none'
            document.getElementById('Success').style.display = 'inline'
            console.log('res', res)
        }
        catch(error){
            if(error.message === 'You Have To Select an Account Type'){
                document.getElementById('Error_Type').style.display = 'inline'
                document.getElementById('Error').style.display = 'none'
            }
            else{
                document.getElementById('Error_Type').style.display = 'none'
                document.getElementById('Error').style.display = 'inline'
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
            width: '35%',
            margin: 'auto'
        }
    }
    return(
    <div>
        <br />
        <br />
        <label>Select Your Account Type</label>
        <br />
        <select className="form-control" id="type" style={styles.label} onChange={this.handleChange}>
          <option value="" />
          <option value="Investor">Investor</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Lawyer">Lawyer</option>
        </select>
        <label id="Error_Type" style={styles.error} class="text-danger">
          You Have to Select an Account Type
        </label>
        <div className = "form">
            <label class="text-info">Email</label>
            <input class="form-control" onChange={this.handleChange} type="text" id="email" style={styles.label}/>
        </div>
        <label id="Success" style={styles.error} class="text-success">
            Email has been successfully sent.
        </label>
        <label id="Error" style={styles.error} class="text-danger"> Email does not exist </label>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
            Submit
        </Button>
        <div className="dropdown-divider"></div>
            <Button variant="primary" size="large">
                New around here? Sign up.
            </Button>
    </div>
    )}
}

export default ExternalLogin;
