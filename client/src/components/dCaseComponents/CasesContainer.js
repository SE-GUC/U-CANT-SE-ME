import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import CasePreview from "./CasePreview";
import CaseContainer from "./CaseContainer";
import parseJwt from "../../helpers/decryptAuthToken";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Fab } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

class CasesContainer extends Component {
  state = {
    cases: [],
    investors: [],
    isCaseExpaned: false,
    expandedCase: {},
    msg: "",
    loggedInType: "",
    choosenSort: "id",
    choosenOrder: "asc",
    finished: false,
    lang: ""
  };

  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    const data = await parseJwt(localStorage.jwtToken);
    axios
      .get("api/cases/")
      .then(async res => {
        await this.setState({ cases: res.data.data, loggedInType: data.type });
        await this.setState({ finished: true });
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
  }

  handleChangeItem = async (key, value) => {
    await this.setState({ [key]: value });
  };

  async handleSortButton() {
    if (this.state.choosenSort === "id") {
      if (this.state.choosenOrder === "asc") {
        await this.setState({
          cases: this.state.cases.sort((a, b) =>
            a._id > b._id ? 1 : b._id > a._id ? -1 : 0
          )
        });
      } else {
        await this.setState({
          cases: this.state.cases.sort((a, b) =>
            a._id > b._id ? 1 : b._id > a._id ? -1 : 0
          )
        });
        await this.setState({ cases: this.state.cases.reverse() });
      }
    } else {
      if (this.state.choosenOrder === "asc") {
        await this.setState({
          cases: this.state.cases.sort((a, b) =>
            new Date(a.caseCreationDate).getTime() >
            new Date(b.caseCreationDate).getTime()
              ? 1
              : new Date(b.caseCreationDate).getTime() >
                new Date(a.caseCreationDate).getTime()
              ? -1
              : 0
          )
        });
      } else {
        await this.setState({
          cases: this.state.cases.sort((a, b) =>
            new Date(a.caseCreationDate).getTime() >
            new Date(b.caseCreationDate).getTime()
              ? 1
              : new Date(b.caseCreationDate).getTime() >
                new Date(a.caseCreationDate).getTime()
              ? -1
              : 0
          )
        });
        await this.setState({ cases: this.state.cases.reverse() });
      }
    }
  }

  render() {
    let sortDropdown;
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>
            {this.state.lang === "eng" ? "Fetching Data" : "جاري جلب البيانات"}
          </h3>
        </div>
      );
    } else {
      if (
        this.state.loggedInType === "lawyer" ||
        this.state.loggedInType === "reviewer"
      ) {
        sortDropdown = (
          <ul style={{ display: "flex", flexWrap: "wrap" }}>
            <TextField
              label="Sort Type"
              select
              value={this.state.choosenSort}
              onChange={ev =>
                this.handleChangeItem("choosenSort", ev.target.value)
              }
              margin="normal"
              variant="outlined"
            >
              <MenuItem key="choosenSort1" value="id">
                {this.state.lang === "eng"
                  ? "Sort by ID"
                  : "رتب على رقم التعريف"}
              </MenuItem>
              <MenuItem key="choosenSort2" value="date">
                {this.state.lang === "eng"
                  ? "Sort by Creation Date"
                  : "رتب حسب تاريخ الإنشاء"}
              </MenuItem>
            </TextField>
            <TextField
              label="Sort Order"
              select
              value={this.state.choosenOrder}
              onChange={ev =>
                this.handleChangeItem("choosenOrder", ev.target.value)
              }
              margin="normal"
              variant="outlined"
            >
              <MenuItem key="choosenOrder1" value="asc">
                {this.state.lang === "eng" ? "Ascending" : "تصاعدي"}
              </MenuItem>
              <MenuItem key="choosenOrder2" value="desc">
                {this.state.lang === "eng" ? "Descending" : "تنازلي"}
              </MenuItem>
            </TextField>
            <Fab
              id="sortButton "
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                marginLeft: "20px",
                marginTop: "25px",
                display: "flex"
              }}
              aria-label="Delete"
              onClick={this.handleSortButton.bind(this)}
            >
              {"Sort"}
            </Fab>
          </ul>
        );
      }
      if (this.state.isCaseExpaned) {
        return (
          <CaseContainer
            key={this.state.expandedCase._id}
            expandedCase={this.state.expandedCase}
            handleBack={this.handleBack}
          />
        );
      } else {
        return (
          <div>
            {sortDropdown}
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              {this.state.cases.map(Case => (
                <CasePreview
                  key={Case._id}
                  case={Case}
                  handleCaseFullDetails={this.handleCaseFullDetails}
                />
              ))}
            </ul>
          </div>
        );
      }
    }
  }

  handleCaseFullDetails = expandedCase => {
    this.setState({ isCaseExpaned: true });
    this.setState({ expandedCase: expandedCase });
  };
  handleBack = () => {
    this.componentDidMount();
    this.setState({ isCaseExpaned: false });
    this.setState({ expandedCase: {} });
  };
}

export default CasesContainer;
