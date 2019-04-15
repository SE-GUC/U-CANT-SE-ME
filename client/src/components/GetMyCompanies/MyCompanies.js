import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import GetMyCompaniesItem from './GetMyCompaniesItem';

const serverURI = require("../../config/keys").serverURI;

class MyCompanies extends Component {
  state = {
    MyCompanies: []
  }

  componentDidMount() {
    axios.get(serverURI + `/investors/myCompanies/5ca6229afd83c24bf091758e`)
    .then(res => {
      if(Array.isArray(res.data.data))
        this.setState({MyCompanies: res.data.data})
})}

  render() {
    return this.state.MyCompanies.map((company) => (
        <GetMyCompaniesItem key={company._id} company={company} />
        ))
  }
}
export default MyCompanies
