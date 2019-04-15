import React, { Component } from 'react';
import axios from 'axios';
const serverURI = require("../config/keys").serverURI;


class ElectronicJournals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      investors: []
    }
  }

  async componentDidMount() {

    const res = await axios.get(serverURI + `/companies`);

    const { data: companies } = res

    this.setState({ companies: companies.data });

    const investorsArray = []
    for (var i = 0; i < res.data.data.length; i++) {

      const investorID = this.state.companies[i].investorID

      const res = await axios.get(serverURI + `/investors/${investorID}`)

      investorsArray.push(res.data)
    }

    this.setState({ investors: investorsArray });


  }

  render() {
    var s = [""]
    var i = 0
    var j = 0
    return (
      <ul>
        <p>
          {this.state.companies.map(company => {
            s[i] = ""
            s[i] = s[i] + company.companyName + " company is a " + company.companyType + " company create in " + company.dateOfCreation
            i++
          })}
          {this.state.investors.map(investor => {
            s[j] = s[j] + ". The investor of the company is " + investor.fullName + " he/she is an " + investor.nationality + " investor, born in "
              + investor.dateOfBirth + ". To contact him/her , you can use telephone " + investor.telephoneNumber
              + " or fax " + investor.fax + " or email " + investor.email + " .  "
            
            j++
          })}

          {s.map(z => {

            return <div>
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

  lineStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      fontFamily: 'Times New Roman',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '25px'

    }
  }

}
export default ElectronicJournals
