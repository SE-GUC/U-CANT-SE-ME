import React, { Component } from 'react'
import axios from 'axios'

class ExternalLogin extends Component {
    state = {
        password: ""
    }
    handleSubmit = async () => {
        const req = {
            password: this.state.password
        }
        document.getElementById('Token').style.display = 'none'
        try{
            let res = await axios.post(`http://localhost:5000/api/${this.props.match.params.type}/reset/${this.props.match.params.token}`, req)
            document.getElementById('Success').style.display = 'inline'
            console.log('res', res)
        }
        catch(error){
            console.log('in catch', error)
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
    <div>
        <br />
        <br />
        <div className = "form">
            <label class="text-info">New Password</label>
            <input class="form-control" onChange={this.handleChange} type="password" id="password" style={styles.label}/>
        </div>
        <label id="Success" style={styles.error} class="text-success">
            Password successfully reset.
        </label>
        <label id="Token" style={styles.error} class="text-danger">
            Link has expired.
        </label>
        <br />
        <button type="button" class="btn btn-outline-primary" onClick={this.handleSubmit}>Submit</button>
    </div>
    )}
}

export default ExternalLogin;
