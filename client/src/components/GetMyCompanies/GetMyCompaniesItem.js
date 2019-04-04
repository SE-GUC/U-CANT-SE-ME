import React, { Component } from 'react'

export class GetMyCompaniesItem extends Component {
  render() {
    return (
      <div>
        <h4>Company Name: {this.props.company.companyName}</h4>
        <h4>Company Type: {this.props.company.companyType}</h4>  
        <h4>Company Creation Date: {this.props.company.dateOfCreation} </h4> 
        <h4>Company Social Insurance Number: {this.props.company.socialInsuranceNumber}</h4>
      </div>
    )
  }
}
export default GetMyCompaniesItem
