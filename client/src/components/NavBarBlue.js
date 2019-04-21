import React, { Component } from 'react'
import './NavBarBlue.css'
import Fab from '@material-ui/core/Fab'
import { Redirect } from 'react-router-dom' 
export default class NavBarBlue extends Component {
      state = {
        headerHeight: 0,
        screenHeight:0,
        screenWidth:0,
        login: false,
        register: false,
      }
    render() { 
        const opacity = 1-Math.min(10 / this.state.currentScrollHeight  , 1)
        const styles = {
            content: {
              backgroundColor: 'rgba(255, 0, 0,'+ opacity +')',
              },
              buttonColor: 'red'
            }
            if(this.state.login){
                this.setState({login: false})
                this.setState({register: false})
                return <Redirect to='/Login'/>
            }
            if(this.state.register){
                this.setState({login: false})
                this.setState({register: false})
                return <Redirect to='/InvestorRegister'/>
            }
        return (
            //navbar navbar-default navbar-alt
            //navbar navbar-expand-lg navbar-dark bg-dark
            <div className="Header" id="Header" style={styles.content} ref="Header">
              <nav className="navbar navbar-expand-lg navbar-light bg-" id="navbarmob">
                <label style={{color: '#3480E3', fontSize: '28px', marginLeft: '200px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 'bold', marginTop: '11px'}}>
                    Sumergite
                </label>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-auto">
                      <button
                        // className="nav-link ml-auto"
                        className = "button"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show"
                        onClick={() => {this.setState({login: true})}}
                        // disableRipple = {true}
                        >
                      <span id="buttonHome">Login</span> 
                      </button>
                    </li>
                    <li className="nav-item mr-auto">
                        <Fab variant="extended" size="medium" color = "secondary" style = {{boxShadow: 'none', marginRight: '240px', marginTop: '6px'}} aria-label="Delete" onClick={() => {this.setState({register: true})}}>
                            Register
                        </Fab>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* {
                  this.state.login===true? <Redirect to={{pathname: '/Login'}}/>:
                  this.state.register===true? <Redirect to={{pathname: '/InvestorRegister'}}/>:<label/>
              } */}
            </div>
          );
        }
    }
