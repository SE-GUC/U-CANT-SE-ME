import React, { Component } from 'react'


export class ViewMyFeesItem extends Component {
    getStyle = () => {
        return{
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        } 
    }
   companyNameStyle = () => {
        return{
            fontFamily: 'Century Gothic'
        }
    }
    feesStyle = () => {
        return{
            background: '#f4f4f4',
            padding: '10px',
            fontFamily: 'Consolas'
        }
    }
    
  render() {
    const valid=this.props.valid;
    if(valid){
        const {companyName, fees} = this.props.fees;
    return (
      <div style={this.getStyle()}>
        <h3 style={this.companyNameStyle()}>{companyName}</h3>
        <h4 style={this.feesStyle()}>{fees}</h4>
       </div>
    )
    
    }
    else
    {
        return (
            <div style={this.getStyle()}>
              <h3 style={this.companyNameStyle()}>{this.props.message}</h3>
             </div>
          )
    }
    
  }
}

export default ViewMyFeesItem
