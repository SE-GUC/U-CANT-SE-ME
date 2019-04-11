import React, { Component } from 'react';
import axios from 'axios';

class ElectronicJournals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      investors: []
    }
  }

  async componentDidMount() {

    const res = await axios.get(`http://localhost:5000/api/companies`);
    // console.log(res.data.data)
    const { data: companies } = res
    // console.log(233)
    //console.log(res)
    this.setState({ companies: companies.data });
    //  console.log(this.state.companies)
    const investorsArray = []
    for (var i = 0; i < res.data.data.length; i++) {

      const investorID = this.state.companies[i].investorID
      // console.log(investorID)
      const res = await axios.get(`http://localhost:5000/api/investors/${investorID}`)
      // console.log(res.data)
      investorsArray.push(res.data)
    }

    this.setState({ investors: investorsArray });
    //   console.log(this.state.investors[0].fullName)

  }

  render() {
    var s = [""]
    var i = 0
    var j = 0
    return (
      <ul>
        <p>
          {this.state.companies.map(company => {
            s[i]=""
            s[i] = s[i] + company.companyName +" company is a "+company.companyType +" company create at "+company.dateOfCreation
            i++
          })}
          {this.state.investors.map(investor => {
            s[j] = s[j] + ". The investor of the company is "+ investor.fullName + " he is an "+investor.nationality+" investor, born in "
            + investor.dateOfBirth +" and lives in "+investor.residenceAddress + ". To contact him , you can use telephone "+investor.telephoneNumber
            +" or fax "+investor.fax+" or email "+investor.email+" . The company is one of the companies established through Sumerge "
            +", which combine innovation with solid technology expertise and deep business understanding to transform how you do business. They offer disruptive solutions that solve business challenges,"
            +" grow organizations, shape industries, empower your people and touch your customers’ lives. "
            j++
          })}

          {s.map(z => {

          return <div style={this.getStyle()}>
               <ul style={this.lineStyle()}
                key={z}>{z}
            </ul>
            </div>

           
          })}

          
          {this.state.companies._id}
        </p>
      </ul>
    )

  }

  getStyle = () => {
    return{
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
       
    } 
}
lineStyle = () => {
  return {
      background: '#f4f4f4',
      padding: '10px',
      fontFamily: 'Times New Roman',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign:'left',
      fontSize:'25px'

  }
}

}
export default ElectronicJournals
