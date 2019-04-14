import React, { Component } from 'react'
import moment from 'moment'
import TextField from "@material-ui/core/TextField"

const { serverURI } = require("../../config/keys");

export class GetMyCompaniesItem extends Component {
  formatTime(t) {
    return moment.utc(t.substring(0, 23)).format('DD, MMM, YYYY').toUpperCase();
  }
  render() {
    return (
      <div>
        <TextField disabled
          id="standard-full-width"
          label="Company Name"
          style={{ margin: 15 }}
          value={this.props.company.companyName}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Company Type"
          style={{ margin: 15 }}
          value={this.props.company.companyType}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Company's Date of Establishment"
          style={{ margin: 15 }}
          value={this.formatTime(this.props.company.dateOfCreation)}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Company's Social Insurance Number"
          style={{ margin: 15 }}
          value={this.props.company.socialInsuranceNumber}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <div className="dropdown-divider"></div>
        <br />
      </div>
    )
  }
}
export default GetMyCompaniesItem
