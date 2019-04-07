import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Manager from './Manager';
import Combobox from 'react-widgets/lib/Combobox'
import axios from 'axios';


class Managers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        managers:[{ managerName: "" ,managerType: "", managerGender: "" , managerNationality: "" , 
        managerIdType: "" , managerIdNumber: "" , managerDateOfBirth: "" , managerResidenceAddress: "" , managerPositionInBoardOfDirectors: ""}]
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleRemoveManager = this.handleRemoveManager.bind(this);
      this.updateManagerName = this.updateManagerName.bind(this);
      this.updateManagerType = this.updateManagerType.bind(this);
      this.updateManagerGender = this.updateManagerGender.bind(this);
      this.updateManagerNationality = this.updateManagerNationality.bind(this);
      this.updateManagerIDType = this.updateManagerIDType.bind(this);
      this.updateManagerIDNumber = this.updateManagerIDNumber.bind(this);
      this.updateManagerDateBirth = this.updateManagerDateBirth.bind(this);
      this.updateManagerAdrress = this.updateManagerAdrress.bind(this);
      this.updateManagerPosition = this.updateManagerPosition.bind(this);
    }

    handleChange(event) {
        this.props.onChange(this.props.id);
    }

    handleNameChange = evt => {
      this.setState({ name: evt.target.value });
    };

  
    handleManagerNameChange = idx => evt => {
      const newManagers = this.state.mangers.map((manager, sidx) => {
        if (idx !== sidx) return manager;
        return { ...Manager, name: evt.target.value };
      });
      this.setState({ managers: newManagers });
    };
  
  
    handleAddManager = () => {
      this.props.addManager();
      let managersCopy = this.state.managers.slice();
        managersCopy.push({ managerName: "" ,managerType: "", managerGender: "" , managerNationality: "" , 
        managerIdType: "" , managerIdNumber: "" , managerDateOfBirth: "" , managerResidenceAddress: "" , managerPositionInBoardOfDirectors: ""})
        this.setState({
            managers: managersCopy
          });
    };
  
    handleRemoveManager = idx => () => {
        if(idx !==0){
          this.props.removeManager(idx)
          let managersCopy = this.state.managers.filter((s, sidx) => idx !== sidx)
          this.setState({managers : managersCopy})
        }
      };

    updateManagerName = (idx,e) =>{
        this.props.updateManagerName(idx,e)
        this.state.managers[idx].managerName = e
    }
    updateManagerType = (idx,e) =>{
        this.props.updateManagerType(idx,e)
        this.state.managers[idx].managerType = e
    }
    updateManagerGender = (idx,e) =>{
        this.props.updateManagerGender(idx,e)
        this.state.managers[idx].managerGender = e
    }
    updateManagerNationality = (idx,e) =>{
        this.props.updateManagerNationality(idx,e)
        this.state.managers[idx].managerNationality = e
    }
    updateManagerIDType = (idx,e) =>{
        this.props.updateManagerIDType(idx,e)
        this.state.managers[idx].managerIdType = e
    }
    updateManagerIDNumber = (idx,e) =>{
        this.props.updateManagerIDNumber(idx,e)
        this.state.managers[idx].managerIdNumber = e
    }
    updateManagerDateBirth = (idx,e) =>{
        this.props.updateManagerDateBirth(idx,e)
        this.state.managers[idx].managerDateOfBirth = e
    }
    updateManagerAdrress = (idx,e) =>{
        this.props.updateManagerAdrress(idx,e)
        this.state.managers[idx].managerResidenceAddress = e
    }
    updateManagerPosition = (idx,e) =>{
        this.props.updateManagerPosition(idx,e)
        this.state.managers[idx].managerPositionInBoardOfDirectors = e
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <h4>Managers</h4>
  
          {this.state.managers.map((manager, idx) => (
            <div className="manager">
              <Manager
                updateManagerName = {(e)=>this.updateManagerName(idx,e)}
                updateManagerType = {(e)=>this.updateManagerType(idx,e)}
                updateManagerGender = {(e)=>this.updateManagerGender(idx,e)}
                updateManagerNationality = {(e)=>this.updateManagerNationality(idx,e)}
                updateManagerIDType = {(e)=>this.updateManagerIDType(idx,e)}
                updateManagerIDNumber = {(e)=>this.updateManagerIDNumber(idx,e)}
                updateManagerDateBirth = {(e)=>this.updateManagerDateBirth(idx,e)}
                updateManagerAdrress = {(e)=>this.updateManagerAdrress(idx,e)}
                updateManagerPosition = {(e)=>this.updateManagerPosition(idx,e)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={this.handleAddManager}
            className="small"
          >
            Add Manager
          </button>
          <button
                type="button"
                onClick={this.handleRemoveManager(this.state.managers.length-1)}
                className="small"
              >
                remove last
              </button>
        </form>
      );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<Managers />, rootElement);
  export default Managers