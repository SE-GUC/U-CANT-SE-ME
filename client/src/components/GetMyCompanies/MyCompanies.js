import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import GetMyCompaniesItem from './GetMyCompaniesItem';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'
class MyCompanies extends Component {
  state = {
    MyCompanies: [],
    msg:'',
    investorid:'',
    home:0
  }

  async componentDidMount() {

    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try{
        await axios.get('../api/investors/auth')
    }catch(err){
        alert("You are not allowed to access this page");
        this.setState({ home: 1 });
        return;
    }
    this.setState({home:2})
    const data = parseJwt(localStorage.jwtToken)
    await this.setState({investorid:data.id})
    const id =this.state.investorid;
    axios.get(`../api/investors/myCompanies/${id}`)
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
    if (this.state.home===0) return <div></div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    else return (this.state.MyCompanies.length===0?<h1>{this.state.msg}</h1>:
      this.state.MyCompanies.map((company) => (
        <GetMyCompaniesItem key={company._id} company={company} />
        ))
      )
  }
}
export default MyCompanies;
