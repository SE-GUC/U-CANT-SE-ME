import React, { Component } from "react";
import axios from "axios";
import ElectronicJournal from "./ElectronicJournal";
import NavBarDashboard from "./NavBarDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

class ElectronicJournals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      investors: [],
      journals: [],
      electronicJournals: [],
      finished: false
    };
  }

  async componentDidMount() {
    const res = await axios.get(`api/companies`);

    const { data: companies } = res;
    await this.setState({ companies: companies.data });
    let allCompanies = [];
    companies.data.forEach(singleCompany => {
      let singularCompany = {};
      singularCompany.companyNameArabic = singleCompany.companyNameArabic;
      singularCompany.companyType = singleCompany.companyType;
      singularCompany.dateOfCreation = singleCompany.dateOfCreation;
      allCompanies.push(singularCompany);
    });
    const investorsArray = [];
    let electronicJournalsArray = [];
    for (var i = 0; i < res.data.data.length; i++) {
      const investorID = this.state.companies[i].investorId;

      const res = await axios.get(`api/investors/${investorID}`);
      let electronicJournal = {
        fullName: "",
        nationality: "",
        dateOfBirth: "",
        telephoneNumber: "",
        fax: "",
        email: "",
        companyNameArabic: "",
        companyType: "",
        dateOfCreation: ""
      };
      electronicJournal.fullName = res.data.data.fullName;
      electronicJournal.nationality = res.data.data.nationality;
      electronicJournal.dateOfBirth = res.data.data.dateOfBirth;
      electronicJournal.telephoneNumber = res.data.data.telephoneNumber;
      electronicJournal.fax = res.data.data.fax;
      electronicJournal.email = res.data.data.email;
      electronicJournal._id = this.state.companies[i]._id;
      electronicJournal.companyNameArabic = this.state.companies[
        i
      ].companyNameArabic;
      electronicJournal.companyNameEnglish = this.state.companies[
        i
      ].companyNameEnglish;
      electronicJournal.companyType = this.state.companies[i].companyType;
      electronicJournal.dateOfCreation = this.state.companies[i].dateOfCreation;
      electronicJournalsArray.push(electronicJournal);
      investorsArray.push(res.data.data);
    }
    await this.setState({ electronicJournals: electronicJournalsArray });
    await this.setState({ finished: true });
  }

  render() {
    if (!this.state.finished) {
      return (
        <div>
          <NavBarDashboard
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="bold"
            profile="lighter"
            homepage="lighter"
            DASHBOARDD={false}
            PROFILEE={false}
            HomePageMargin="120px"
          />
          <CircularProgress style={{ marginTop: "100px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      return (
        <div>
          <NavBarDashboard
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="bold"
            profile="lighter"
            homepage="lighter"
            DASHBOARDD={false}
            PROFILEE={false}
            HomePageMargin="120px"
          />
          <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
            {this.state.electronicJournals.map(electronicJournal => (
              <ElectronicJournal
                key={electronicJournal._id}
                electronicJournal={electronicJournal}
              />
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default ElectronicJournals;
