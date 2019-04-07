import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

 class Cases extends Component {
    state ={
        cases :[]
    };
    async componentDidMount(){

        const getCases = await axios.get("http://localhost:5000/api/cases");
        this.setState({cases: getCases.data.data});
         console.log(getCases.data.data);
    
        // my comments to understand arrayOfCases 
        // getCases.data.data[0]  the first case in the array 
    };
    render() {
        return (this.state.cases.map((x) => (
       <Case key={x._id} case={x} />
        ))
        )
      }
};

export default Cases

