import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import GetMyCompaniesItem from './GetMyCompaniesItem';
import parseJwt from '../../helpers/decryptAuthToken';

class MyCompanies extends Component {
  state = {
    MyCompanies: [],
    msg:'',
    investorid:''
  }

  async componentDidMount() {
    const data = parseJwt(localStorage.jwtToken)
    await this.setState({investorid:data.id})
    const id =this.state.investorid;
    axios.get(`api/investors/myCompanies/${id}`)
    .then(res => {
      if(Array.isArray(res.data.data))
        this.setState({MyCompanies: res.data.data})
      else{
        this.setState({msg:res.data.msg})
      }
    })
    .catch(err =>{
      this.setState({msg:err.response.data.error})
    })
  }

  render() {
    return (this.state.MyCompanies.length===0?<h1>{this.state.msg}</h1>:
      this.state.MyCompanies.map((company) => (
        <GetMyCompaniesItem key={company._id} company={company} />
        ))
      )
  }
}
export default MyCompanies
