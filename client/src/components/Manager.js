import React, { Component } from 'react';
const Joi = require("joi");

export class Manager extends Component {
    constructor() {
        super();
        this.state = {
            messageManagerName : '',
            messageManagerType : '',
            messageManagerGender : '',
            messageManagerNat : '',
            messageManagerIDType : '',
            messageManagerID : '',
            messageManagerBirth : '',
            messageManagerAddress : '',
            messageManagerPos : ''
            };
    }
    updateManagerName = (e) =>{
        this.props.updateManagerName(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerName:'Manager Name is required'})
                else
                    me.setState({messageManagerName:'Invalid Manager Name'});
            }
            else
                me.setState({messageManagerName:''});
        });
    }
    updateManagerType = (e) =>{
        this.props.updateManagerType(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerType:'Manager Type is required'})
                else
                    me.setState({messageManagerType:'Invalid Manager Type'});
            }
            else
                me.setState({messageManagerType:''});
        });
    }
    updateManagerGender = (e) =>{
        this.props.updateManagerGender(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerGender:'Manager Gender is required'})
                else
                    me.setState({messageManagerGender:'Invalid Manager Gender'});
            }
            else
                me.setState({messageManagerGender:''});
        });
    }
    updateManagerNationality = (e) =>{
        this.props.updateManagerNationality(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerNat:'Manager Nationality is required'})
                else
                    me.setState({messageManagerNat:'Invalid Manager Nationality'});
            }
            else
                me.setState({messageManagerNat:''});
        });
    }
    updateManagerIDType = (e) =>{
        this.props.updateManagerIDType(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerIDType:'Manager ID Type is required'})
                else
                    me.setState({messageManagerIDType:'Invalid Manager ID Type'});
            }
            else
                me.setState({messageManagerIDType:''});
        });
    }
    updateManagerIDNumber = (e) =>{
        this.props.updateManagerIDNumber(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerID:'Manager ID Number is required'})
                else
                    me.setState({messageManagerID:'Invalid Manager ID Number'});
            }
            else
                me.setState({messageManagerID:''});
        });
    }
    updateManagerDateBirth = (e) =>{
        this.props.updateManagerDateBirth(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.date()}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerBirth:'Manager Date of birth is required'})
                else
                    me.setState({messageManagerBirth:'Invalid Manager Date of birth'});
            }
            else
                me.setState({messageManagerBirth:''});
        });

    }
    updateManagerAdrress = (e) =>{
        this.props.updateManagerAdrress(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerAddress:'Manager Address is required'})
                else
                    me.setState({messageManagerAddress:'Invalid Manager Manager Address'});
            }
            else
                me.setState({messageManagerAddress:''});
        });
    }
    updateManagerPosition = (e) =>{
        this.props.updateManagerPosition(e.target.value)
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageManagerPos:'Manager Position is required'})
                else
                    me.setState({messageManagerPos:'Invalid Manager Position'});
            }
            else
                me.setState({messageManagerPos:''});
        });
    }
    render(){
    return (
        <div>
            <h4>Info</h4>
            <label>Manager Name: </label>
            <input
                type="text"
                placeholder="manager name"
                onChange={this.updateManagerName}
            />
            <label>{this.state.messageManagerName}</label>
             <br/>
            <label>Manager Type: </label>
            <input
                type="text"
                placeholder="manager type "
                onChange={this.updateManagerType}
            />
            <label>{this.state.messageManagerType}</label>
            <br/>
            <label>Manager Gender: </label>
            <select onChange={this.updateManagerGender}>
                <option value="" />
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label>{this.state.messageManagerGender}</label>
            <br/>
            <label>Manager Nationality: </label>
            <input
                type="text"
                placeholder="manager nationality"
                onChange={this.updateManagerNationality}
            />
            <label>{this.state.messageManagerNat}</label>
            <br/>
            <label>Manager ID Type: </label>

            <select onChange={this.updateManagerIDType}>
                <option value="NID">NID</option>
                <option value="passport">passport</option>
            </select>
            <label>{this.state.messageManagerIDType}</label>
            <br/>
            <label>Manager ID Number: </label>
            <input
                type="text"
                placeholder="manager ID number"
                onChange={this.updateManagerIDNumber}
            />
            <label>{this.state.messageManagerID}</label>
            <br/>
            <label>Manager Date Of Birth: </label>
            <input
                type="date"
                placeholder="manager date of birth"
                onChange={this.updateManagerDateBirth}
            />
            <label>{this.state.messageManagerBirth}</label>
            <br/>
            <label>Manager Residence Address: </label>
            <input
                type="text"
                placeholder="manager residence address"
                onChange={this.updateManagerAdrress}
            />
            <label>{this.state.messageManagerAddress}</label>
            <br/>
            <label>Manager Position In Board Of Directors: </label>
            <input
                type="text"
                placeholder="manager position in board of directors"
                onChange={this.updateManagerPosition}
            />
            <label>{this.state.messageManagerPos}</label>
        </div>
    );
}
}
export default Manager;


