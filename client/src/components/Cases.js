import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

 class Cases extends Component {
    state ={
        cases :[]
    };
    async componentDidMount(){

      axios.get(`http://localhost:5000/api/cases`)
        .then(res => {
          if(Array.isArray(res.data.data))
            this.setState({cases: res.data.data})
        })
         console.log(this.state.cases);
        // console.log(getCases.data.data);
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

