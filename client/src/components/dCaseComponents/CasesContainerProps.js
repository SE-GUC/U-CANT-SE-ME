import React, { Component } from "react";
import "../../App.css";
import CasePreview from "./CasePreview";
import CaseContainer from "./CaseContainer";
import parseJwt from "../../helpers/decryptAuthToken";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Fab } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

class CasesContainerProps extends Component {
  state = {
    cases: [],
    investors: [],
    isCaseExpaned: false,
    expandedCase: {},
    msg: "",
    loggedInType: "",
    choosenSort: "id",
    choosenOrder: "asc",
    finished: false
  };

  async componentDidMount() {
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ cases: this.props.cases, loggedInType: data.type });
    await this.setState({ finished: true });
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
          <h3>Fetching Data</h3>
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
              <MenuItem key="id" value="id">
                Sort by ID
              </MenuItem>
              <MenuItem key="date" value="date">
                Sort by Creation Date
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
              <MenuItem key="asc" value="asc">
                Ascending
              </MenuItem>
              <MenuItem key="desc" value="desc">
                Descending
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
            currentUserId={this.props.currentUserId}
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
export default CasesContainerProps;
