import React, { Component } from 'react';
import axios from 'axios';

class ElectronicJournals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      investors: [],
      journals: []
    }
  }

  async componentDidMount() {

    const res = await axios.get(`http://localhost:5000/api/companies`);

    const { data: companies } = res

    this.setState({ companies: companies.data });

    const investorsArray = []
    for (var i = 0; i < res.data.data.length; i++) {

      const investorID = this.state.companies[i].investorId

      const res = await axios.get(`http://localhost:5000/api/investors/${investorID}`)

      investorsArray.push(res.data.data)
    }

    this.setState({ investors: investorsArray });

      var s = [""]
    var i = 0
    var j = 0
    {this.state.companies.map(company => {
      s[i] = ""
      s[i] = s[i] + company.companyNameArabic + " company is a " + company.companyType + " company create in " + company.dateOfCreation
      i++
    })}
    {this.state.investors.map(investor => {
      s[j] = s[j] + ". The investor of the company is " + investor.fullName + " he/she is an " + investor.nationality + " investor, born in "
        + investor.dateOfBirth + ". To contact him/her , you can use telephone " + investor.telephoneNumber
        + " or fax " + investor.fax + " or email " + investor.email + " .  "
      
      j++
    })}
    this.setState({ journals: s });
    

  }

  render() {

    return (
      <ul>
        <p>
          
          {this.state.journals.map(z => {

            return <div style={this.getStyle()}>
              <ul style={this.lineStyle()}
                key={z}>{z}
              </ul>
            </div>


          })}


        
        </p>
      </ul>
    )

  }

  getStyle = () => {
    return {
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
      textAlign: 'left',
      fontSize: '25px'

    }
  }

}
export default ElectronicJournals
