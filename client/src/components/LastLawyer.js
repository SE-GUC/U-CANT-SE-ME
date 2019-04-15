import React, { Component } from 'react';
import axios from 'axios';

class LastLawyer extends Component {
    state = {
        lawyer: ''
    }
    async componentDidMount() {
        
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