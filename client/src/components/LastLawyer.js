import React, { Component } from 'react';
import axios from 'axios';

class LastLawyer extends Component {
    state = {
        lawyer: ''
    }
    async componentDidMount() {
        const caseID = "5ca8b10e6f7661e423afc716"
        const { data: lawyer } = await axios.get(`http://localhost:5000/api/admins/getCaseLastLawyer/${caseID}`)
        console.log(lawyer.lawyerName)
        this.setState({ lawyer: lawyer.lawyerName })
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <h1 style={this.lineStyle()}> Last lawyer who worked on the case is {this.state.lawyer}. </h1>
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