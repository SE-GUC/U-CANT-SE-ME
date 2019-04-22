import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
class LastLawyer extends Component {
    state = {
        lawyer: '',
        home:0
    }
    async componentDidMount() {
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('api/lawyers/authReviewerOrLawyer')
          }catch(err){
              alert("You are not allowed to access this page");
              this.setState({ home: 1 });
              return;
          }
        await this.setState({home:2});
        const caseID = "5ca8b10e6f7661e423afc716"
        
        //the next line to try case which has not been assigned to lawyer , comment the above line if you want to try.
        //const caseID = "5ca62338fd83c24bf091758f"
         
        axios.get(`api/admins/getCaseLastLawyer/${caseID}`)
            .then(res => {
                if (res.data.lawyerName)
                    this.setState({ lawyer: "Last lawyer who worked on the case is " + res.data.lawyerName + "." })

            }).catch(res => {
                this.setState({ lawyer: "This case is never assigned to lawyer yet." })
            })
    }

    render() {
        if (this.state.home===0) return <div></div>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        return (
            <div style={this.getStyle()}>
                <h1 style={this.lineStyle()}> {this.state.lawyer} </h1>
            </div>
        )
    }

    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '7px',
            borderBottom: '1px #ccc dotted',
        }
    }

    lineStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            fontFamily: 'Times New Roman'
        }
    }

}



export default LastLawyer;