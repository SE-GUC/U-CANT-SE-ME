import React, { Component } from 'react';
import Combobox from 'react-widgets/lib/Combobox'

export class Manager extends Component {
    updateManagerName = (e) =>{
        this.props.updateManagerName(e.target.value)
    }
    updateManagerType = (e) =>{
        this.props.updateManagerType(e.target.value)
    }
    updateManagerGender = (e) =>{
        this.props.updateManagerGender(e)
    }
    updateManagerNationality = (e) =>{
        this.props.updateManagerNationality(e.target.value)
    }
    updateManagerIDType = (e) =>{
        this.props.updateManagerIDType(e.target.value)
    }
    updateManagerIDNumber = (e) =>{
        this.props.updateManagerIDNumber(e.target.value)
    }
    updateManagerDateBirth = (e) =>{
        this.props.updateManagerDateBirth(e.target.value)
    }
    updateManagerAdrress = (e) =>{
        this.props.updateManagerAdrress(e.target.value)
    }
    updateManagerPosition = (e) =>{
        this.props.updateManagerPosition(e.target.value)
    }
    render(){
    let genders = ["Male","Female"]
    return (
        <div>
            <h4>Info</h4>
            <input
                type="text"
                placeholder="manager name"
                onChange={this.updateManagerName}
            />
             <br/>
            <input
                type="text"
                placeholder="manager type "
                onChange={this.updateManagerType}
            />
            <br/>
            <Combobox
                data={genders}
                defaultValue={'Gender'}
                onChange={this.updateManagerGender}
            />
            <br/>
            <input
                type="text"
                placeholder="manager nationality"
                onChange={this.updateManagerNationality}
            />
            <br/>
            <input
                type="text"
                placeholder="manager ID Type"
                onChange={this.updateManagerIDType}
            />
            <br/>
            <input
                type="text"
                placeholder="manager ID number"
                onChange={this.updateManagerIDNumber}
            />
            <br/>
            <input
                type="text"
                placeholder="manager date of birth"
                onChange={this.updateManagerDateBirth}
            />
            <br/>
            <input
                type="text"
                placeholder="manager residence address"
                onChange={this.updateManagerAdrress}
            />
            <br/>
            <input
                type="text"
                placeholder="manager position in board of directors"
                onChange={this.updateManagerPosition}
            />
        </div>
    );
}
}
export default Manager;


