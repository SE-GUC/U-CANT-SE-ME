import React, { Component } from 'react'

export default class Manager extends Component {
  render() {
    return (
      <div>
        <h1>Manager</h1>
        <h3>managerName:{this.props.manager.managerName}</h3>
        <h3>managerType:{this.props.manager.managerType}</h3>
        <h3>managerGender:{this.props.manager.managerGender}</h3>
        <h3>managerNationality:{this.props.manager.managerNationality}</h3>
        <h3>managerIdType:{this.props.manager.managerIdType}</h3>
        <h3>managerIdNumber:{this.props.manager.managerIdNumber}</h3>
        <h3>managerDateOfBirth:{this.props.manager.managerDateOfBirth}</h3>
        <h3>managerResidenceAddress:{this.props.manager.managerResidenceAddress}</h3>
        <h3>managerPositionInBoardOfDirectors:{this.props.manager.managerPositionInBoardOfDirectors}</h3>
      </div>
    )
  }
}
