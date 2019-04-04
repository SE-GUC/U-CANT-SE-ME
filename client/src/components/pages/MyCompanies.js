import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import GetMyCompaniesItem from './GetMyCompaniesItem';

class MyCompanies extends Component {
  state = {
    MyCompanies: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/investors/myCompanies/5ca6229afd83c24bf091758e`)
    .then(res => {
      if(Array.isArray(res.data.data))
        this.setState({MyCompanies: res.data.data})
      else{
        
      }
})}

  render() {
    return this.state.MyCompanies.map((company) => (
        <GetMyCompaniesItem key={company._id} company={company} />
        ))
    // return (
    //   <div className="MyCompanies">
    //     <h1>My Companies</h1>
    //   </div>
    // )
  }
}
export default MyCompanies
