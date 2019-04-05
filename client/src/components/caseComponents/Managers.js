import React, { Component } from 'react';
import Manager from './Manager';
export default class Managers extends Component {
  render() {
    return (
      this.props.managersArray.map((x) => (
       <Manager key={x._id} manager={x} />
         ))
         
    )
    
  }
}
