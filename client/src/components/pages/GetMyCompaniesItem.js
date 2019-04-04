import React, { Component } from 'react'
import PropTypes from 'prop-types';

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

// GetMyCompaniesItem.propTypes = {
//   company: PropTypes.object.isRequired
// }
export default GetMyCompaniesItem
