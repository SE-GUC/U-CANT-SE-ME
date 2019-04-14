import React, { Component } from 'react'
import moment from 'moment'
import TextField from "@material-ui/core/TextField"


export default class Manager extends Component {
  formatTime(t) {
    return moment.utc(t.substring(0, 23)).format('DD, MMM, YYYY').toUpperCase();
  }
  render() {
    return (
      <div>
        <TextField disabled
          id="standard-full-width"
          label="Manager's Name"
          style={{ margin: 15 }}
          value={this.props.manager.managerName}
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
          label="Manager's Type"
          style={{ margin: 15 }}
          value={this.props.manager.managerType}
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
          label="Manager's Gender"
          style={{ margin: 15 }}
          value={this.props.manager.managerGender}
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
          label="Manager's Nationality"
          style={{ margin: 15 }}
          value={this.props.manager.managerNationality}
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
          label="Manager's Identification Type"
          style={{ margin: 15 }}
          value={this.props.manager.managerIdType}
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
          label="Manager's Identification Number"
          style={{ margin: 15 }}
          value={this.props.manager.managerIdNumber}
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
          label="Manager's DOB"
          style={{ margin: 15 }}
          value={this.formatTime(this.props.manager.managerDateOfBirth)}
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
          label="Manager's Residence Address"
          style={{ margin: 15 }}
          value={this.props.manager.managerResidenceAddress}
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
          label="Manager's Position in Board of Directors"
          style={{ margin: 15 }}
          value={this.props.manager.managerPositionInBoardOfDirectors}
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
