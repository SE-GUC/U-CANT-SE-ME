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
            let res = await axios.post(`api/${this.props.match.params.type}/reset/${this.props.match.params.token}`, req)
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
        <br />
        <br />
        <FormControl>    
            <InputLabel htmlFor="adornment-password">New Password</InputLabel>
            <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
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
        <label id="Success" style={styles.error} class="text-success">
            Password successfully reset.
        </label>
        <label id="Token" style={styles.error} class="text-danger">
            Link has expired.
        </label>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
            Submit
        </Button>
    </div>
    )}
}

export default ExternalLogin;
