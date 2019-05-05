import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import Modal from "react-modal";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import SnackBar from "../snackbar";

import {
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  withStyles,
  TextField,
  Fab,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Divider,
  // Button,
  List,
  ListItemText,
  ListItem
} from "@material-ui/core";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from "@material-ui/icons/Help";

class FormTemplate extends Component {
  state = {
    code: ``,
    formName: "",
    hasManagers: false,
    specifyMinAndMax: false,
    managersMinNumber: 1,
    managersMaxNumber: 1000,
    fields: [
      {
        fieldName: "Company Name Arabic",
        fieldType: "TEXT",
        isRequired: true,
        isUnique: true,
        minVal: 3,
        maxVal: 100,
        options: []
      },
      {
        fieldName: "",
        fieldType: "",
        isRequired: false,
        isUnique: false,
        minVal: 0,
        maxVal: 1000000,
        options: []
      }
    ],
    specifyMinAndMaxFields: [true, false],
    advanced: false,
    helpModal: false,
    optionsModal: false,
    optionsIdx: -1,
    addedOption: "",
    success: false,
    loading: false,
    clicked: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };

  handleSubmit = async () => {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    if (!this.state.loading) {
      this.setState({
        success: false,
        loading: true,
        clicked: true
      });
    }
    const { formName, hasManagers, code } = this.state;
    var fields = [];
    for(let i = 0; i < this.state.fields.length; i++) 
      fields.push({...this.state.fields[i]});
    let formTemplate = {
      formName,
      fields,
      hasManagers
    };
    for (let i = 0; i < formTemplate.fields.length; i++)
      formTemplate.fields[i].fieldName = textToCamelCase(
        formTemplate.fields[i].fieldName
      );
    if (code.length > 0) formTemplate.rulesFunction = code;
    axios
      .post(`api/admins/createFormTemplate/`, formTemplate)
      .then(async res => {
        await this.setState({ success: true, loading: false });
        await this.setState({
          alerted: true,
          alertType: "success",
          alertMsg: "Form Template Created!"
        });
        // await this.setState({ success: true, loading: false });
      })
      .catch(async error => {
        await this.setState({ success: false, loading: false });
        await this.setState({
          alerted: true,
          alertType: "error",
          alertMsg: `The Form Template doesn't match required conditions! \nError: ${
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data.error
          }`
        });
      });
  };

  handleChange(flag, eventTarget = {}) {
    if (flag === "hasManagers")
      this.setState({ hasManagers: !this.state.hasManagers });
    else if (flag === "managersMinNumber") {
      this.setState({ managersMinNumber: eventTarget.value });
    } else if (flag === "managersMaxNumber") {
      this.setState({ managersMaxNumber: eventTarget.value });
    } else if (flag === "formName") {
      this.setState({ formName: eventTarget.value });
    } else if (flag === "specifyMinAndMax") {
      this.setState({ specifyMinAndMax: !this.state.specifyMinAndMax });
    } else if (flag === "advanced") {
      this.setState({ advanced: !this.state.advanced });
    }
    this.setState({ clicked: false, success: false, loading: false });
  }

  handleFieldChange = (fieldIdx, key, eventTarget) => {
    let fields = [...this.state.fields];
    let specifyMinAndMaxFields = [...this.state.specifyMinAndMaxFields];
    if (key === "isUnique" || key === "isRequired")
      fields[fieldIdx][key] = !fields[fieldIdx][key];
    else if (key === "specifyMinAndMaxFields")
      specifyMinAndMaxFields[fieldIdx] = !specifyMinAndMaxFields[fieldIdx];
    else fields[fieldIdx][key] = eventTarget.value;
    this.setState({ fields: fields });
    this.setState({ specifyMinAndMaxFields: specifyMinAndMaxFields });
    if (eventTarget.value === "DROPLIST") {
      this.setState({ optionsModal: true, optionsIdx: fieldIdx });
    }
    this.setState({ clicked: false, success: false, loading: false });
  };

  handleAddField = () => {
    this.setState({
      fields: [
        ...this.state.fields,
        {
          fieldName: "",
          fieldType: "",
          isRequired: false,
          isUnique: false,
          minVal: 0,
          maxVal: 1000000,
          options: []
        }
      ]
    });
    this.setState({
      specifyMinAndMaxFields: [...this.state.specifyMinAndMaxFields, false]
    });
    this.setState({ clicked: false, success: false, loading: false });
  };

  handleRemoveField = () => {
    if (this.state.fields.length <= 2) return;
    let fields = this.state.fields.splice(0, this.state.fields.length - 1);
    let specifyMinAndMaxFields = this.state.specifyMinAndMaxFields.splice(
      0,
      this.state.specifyMinAndMaxFields.length - 1
    );
    this.setState({ fields: fields });
    this.setState({ specifyMinAndMaxFields: specifyMinAndMaxFields });
    this.setState({ clicked: false, success: false, loading: false });
  };

  handleHelp = () => {
    this.setState({ helpModal: true });
  };

  showGeneralFormInfo = () => {
    let managersDetails = [];
    if (this.state.hasManagers && this.state.specifyMinAndMax) {
      managersDetails = [
        <TextField
          key="w"
          label="Min number of managers"
          value={this.state.managersMinNumber}
          onChange={ev => this.handleChange("managersMinNumber", ev.target)}
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="outlined"
        />,
        <TextField
          key="e"
          label="Max number of managers"
          value={this.state.managersMaxNumber}
          onChange={ev => this.handleChange("managersMaxNumber", ev.target)}
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="outlined"
        />
      ];
    }
    return (
      <Card key="card0" style={styles.card}>
        <Typography style={styles.headerText} component="h1">
          {" "}
          General Form Info{" "}
        </Typography>
        <TextField
          required
          label="Form Name"
          value={this.state.formName}
          onChange={ev => this.handleChange("formName", ev.target)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <CardContent>
          {"Allow adding managers\t"}
          <FormControlLabel
            control={
              <Switch
                checked={this.state.hasManagers}
                onChange={ev => this.handleChange("hasManagers")}
                value="hasManagers"
                color="primary"
              />
            }
          />
          {this.state.hasManagers
            ? [
                "Specify min and max managers\t",
                <FormControlLabel
                  key="q"
                  control={
                    <Switch
                      checked={this.state.specifyMinAndMax}
                      onChange={ev => this.handleChange("specifyMinAndMax")}
                      value="specifyMinAndMax"
                      color="primary"
                    />
                  }
                />
              ]
            : [
                "Specify min and max managers\t",
                <FormControlLabel
                  key="formcontrollabel"
                  control={
                    <Switch
                      disabled
                      checked={this.state.specifyMinAndMax}
                      onChange={ev => this.handleChange("specifyMinAndMax")}
                      value="specifyMinAndMax"
                      color="primary"
                    />
                  }
                />
              ]}
        </CardContent>
        <CardContent>{managersDetails}</CardContent>
      </Card>
    );
  };

  showField = fieldIdx => {
    let minAndMax = [
      <br />,
      <TextField
        key={`${fieldIdx}1`}
        label="Min length or min value"
        value={this.state.fields[fieldIdx].minVal}
        onChange={ev => this.handleFieldChange(fieldIdx, "minVal", ev.target)}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="outlined"
      />,
      <TextField
        key={`${fieldIdx}2`}
        label="Max length or max value"
        value={this.state.fields[fieldIdx].maxVal}
        onChange={ev => this.handleFieldChange(fieldIdx, "maxVal", ev.target)}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="outlined"
      />
    ];
    return (
      <div
        key={`${fieldIdx}3`}
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
          paddingTop: "2%"
        }}
      >
        <div
          key={`${fieldIdx}4`}
          style={{ display: "grid", gridRowGap: "10%" }}
        >
          <TextField
            key={`${fieldIdx}5`}
            required
            label="Field name"
            value={this.state.fields[fieldIdx].fieldName}
            onChange={ev =>
              this.handleFieldChange(fieldIdx, "fieldName", ev.target)
            }
            margin="normal"
            variant="outlined"
          />
          <FormControl
            key={`${fieldIdx}6`}
            required
            variant="outlined"
            style={{ minWidth: 120 }}
          >
            <InputLabel
              key={`${fieldIdx}7`}
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Field type
            </InputLabel>
            <Select
              key={`${fieldIdx}8`}
              value={this.state.fields[fieldIdx].fieldType}
              onChange={ev =>
                this.handleFieldChange(fieldIdx, "fieldType", ev.target)
              }
              input={<OutlinedInput labelWidth={70} name="fieldType" />}
            >
              <MenuItem key={`${fieldIdx}9`} value="">
                <em>Choose a field type</em>
              </MenuItem>
              <MenuItem key={`${fieldIdx}10`} value={"TEXT"}>
                Text
              </MenuItem>
              <MenuItem key={`${fieldIdx}11`} value={"NUMBER"}>
                Number
              </MenuItem>
              <MenuItem key={`${fieldIdx}12`} value={"TEXT_NUMBER"}>
                Text Number
              </MenuItem>
              <MenuItem key={`${fieldIdx}13`} value={"DATE"}>
                Date
              </MenuItem>
              <MenuItem key={`${fieldIdx}14`} value={"GOVERNATE"}>
                Governate
              </MenuItem>
              <MenuItem key={`${fieldIdx}15`} value={"CITY"}>
                City
              </MenuItem>
              <MenuItem key={`${fieldIdx}16`} value={"CURRENCY"}>
                Currency
              </MenuItem>
              <MenuItem key={`${fieldIdx}17`} value={"DROPLIST"}>
                Droplist
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        {"Field is required\t"}
        <FormControlLabel
          control={
            <Switch
              key={`${fieldIdx}18`}
              checked={this.state.fields[fieldIdx].isRequired}
              onChange={ev =>
                this.handleFieldChange(fieldIdx, "isRequired", ev.target)
              }
              value="isRequired"
              color="primary"
            />
          }
        />
        {"Field is unique\t"}
        <FormControlLabel
          control={
            <Switch
              key={`${fieldIdx}19`}
              checked={this.state.fields[fieldIdx].isUnique}
              onChange={ev =>
                this.handleFieldChange(fieldIdx, "isUnique", ev.target)
              }
              value="isUnique"
              color="primary"
            />
          }
        />
        {"Specify min and max values\t"}
        <FormControlLabel
          control={
            <Switch
              key={`${fieldIdx}20`}
              checked={
                this.state.specifyMinAndMaxFields[fieldIdx] === undefined
                  ? ""
                  : this.state.specifyMinAndMaxFields[fieldIdx]
              }
              onChange={ev =>
                this.handleFieldChange(
                  fieldIdx,
                  "specifyMinAndMaxFields",
                  ev.target
                )
              }
              value="specifyMinAndMaxFields"
              color="primary"
            />
          }
        />
        {this.state.specifyMinAndMaxFields[fieldIdx] ? minAndMax : ""}
      </div>
    );
  };

  showFields = () => {
    let i = 0;
    return (
      <Card key="card1" style={styles.card}>
        <Typography key="typo3" style={styles.headerText} component="h1">
          {" "}
          Form{" "}
        </Typography>
        <React.Fragment key="frag0">
          {this.state.fields.map(field => [
            this.showField(i++),
            i < this.state.fields.length ? <Divider key={i} /> : ""
          ])}
        </React.Fragment>
        <div key="div4" style={{ float: "right" }}>
          <Fab
            key="fab1"
            color="secondary"
            aria-label="RemoveIcon"
            onClick={ev => this.handleRemoveField()}
          >
            <RemoveIcon />
          </Fab>{" "}
          <Fab
            key="fab0"
            color="primary"
            aria-label="Add"
            onClick={ev => this.handleAddField()}
          >
            <AddIcon />
          </Fab>
        </div>
      </Card>
    );
  };

  showEditor = () => {
    let editor = [
      <Editor
        key={this.state.code}
        placeholder="Type company rules function… "
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          backgroundColor: "#fafafa",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          marginLeft: "7%",
          marginRight: "7%",
          marginBottom: "1%",
          marginTop: "1%",
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
        }}
      />,

      <Fab
        key="t"
        color="secondary"
        aria-label="Add"
        style={{ float: "right", marginRight: "7%" }}
        onClick={ev => this.handleHelp()}
      >
        <HelpIcon />
      </Fab>
    ];
    return (
      <div key="div0" style={{ paddingBottom: "5%" }}>
        <div
          style={{
            fontSize: "17px",
            color: "#707070"
          }}
        >
          {"Advanced\t"}
          <FormControlLabel
            control={
              <Switch
                checked={this.state.advanced}
                onChange={ev => this.handleChange("advanced")}
                value="advanced"
                color="primary"
              />
            }
          />
        </div>
        {this.state.advanced ? editor : ""}
      </div>
    );
  };

  showHelpModal = () => {
    let code = `
    /** 
     * This is the editor to enter advanded Rules on the form
     * The available Variables and Attributes are:
     * 1 - The Creator Investor named "investor"
     * 2 - The array managers of the company if they exist named "managers"
     * 3 - The form with fields specified here named "form"
     * This is the attributes of the investor and the first manager
    */
    investor.email;                   manager[0].managerName;
    investor.password;                manager[0].managerType;
    investor.fullName;                manager[0].managerGender;
    investor.gender;                  manager[0].managerNationality;
    investor.nationality;             manager[0].managerIdType;
    investor.methodOfIdentification;  manager[0].managerIdNumber;
    investor.identificationNumber;    manager[0].managerDateOfBirth;
    investor.dateOfBirth;             manager[0].managerResidenceAddress;
    investor.residenceAddress;        manager[0].managerPositionInBoardOfDirectors;
    investor.telephoneNumber;         
    investor.fax;         
    
    //You should only write a function that return true if the rules are valid
   `;
    return (
      <Modal
        key="modal0"
        isOpen={this.state.helpModal}
        onRequestClose={() => this.setState({ helpModal: false })}
        style={styles.modalStyle}
      >
        <Editor
          placeholder="Type company rules function… "
          value={code}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            backgroundColor: "#fafafa",
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16
          }}
        />
      </Modal>
    );
  };

  handleAddOption = (fieldIdx, option) => {
    let fields = this.state.fields;
    fields[fieldIdx].options.push(option);
    this.setState({ fields: fields });
    this.setState({ clicked: false, success: false, loading: false });
  };

  handleRemoveOption = fieldIdx => {
    if (this.state.fields.length < 1) return;
    let options = this.state.fields[fieldIdx].options;
    options = options.splice(0, options.length - 1);
    let fields = this.state.fields;
    fields[fieldIdx].options = options;
    this.setState({ fields: fields });
    this.setState({ clicked: false, success: false, loading: false });
  };

  showOptionsModal = fieldIdx => {
    if (fieldIdx === -1) return "";
    return (
      <Modal
        isOpen={this.state.optionsModal}
        onRequestClose={() => this.setState({ optionsModal: false })}
        style={styles.modalStyle}
      >
        <div style={{ width: 345 }} />
        <Card style={styles.card}>
          <Typography style={styles.headerText} component="h1">
            {" "}
            Droplist Items{" "}
          </Typography>
          <List component="nav">
            {this.state.fields[fieldIdx].options.map(option => {
              return (
                <ListItem button>
                  <ListItemText primary={option} />
                </ListItem>
              );
            })}
          </List>
          <TextField
            label="Item name"
            value={this.state.addedOption}
            onChange={ev => {
              this.setState({ addedOption: ev.target.value });
            }}
            margin="normal"
          />
          <div style={{ float: "right" }}>
            <Fab color="secondry" aria-label="RemoveIcon">
              <RemoveIcon onClick={ev => this.handleRemoveOption(fieldIdx)} />
            </Fab>{" "}
            <Fab color="primary" aria-label="Add">
              <AddIcon
                onClick={ev =>
                  this.handleAddOption(fieldIdx, this.state.addedOption)
                }
              />
            </Fab>
          </div>
        </Card>
      </Modal>
    );
  };

  render() {
    let alertSnack;
    if (this.state.alerted)
      alertSnack = (
        <SnackBar
          message={this.state.alertMsg}
          variant={this.state.alertType}
        />
      );
    const { loading, success, clicked } = this.state;
    let submitButton = (
      <div
        key="divvvv0"
        className="CircularIntegration-root-241"
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "2%",
          marginBottom: "2%"
        }}
      >
        <div
          key="divvvv1"
          className="CircularIntegration-wrapper-242"
          style={{
            marginRight: "240px",
            marginTop: "12px",
            display: "block",
            margin: "0 auto",
            position: "relative"
          }}
        >
          <Fab
            color="primary"
            className=""
            style={
              success && clicked && !loading
                ? {
                    backgroundColor: green[500],
                    "&:hover": {
                      backgroundColor: green[700]
                    }
                  }
                : !success && clicked && !loading
                ? {
                    backgroundColor: red[500],
                    "&:hover": {
                      backgroundColor: red[700]
                    }
                  }
                : {}
            }
            onClick={this.handleSubmit}
          >
            {success && clicked ? (
              <CheckIcon />
            ) : !success && clicked && !loading ? (
              <CrossIcon />
            ) : (
              <Typography variant="body1" style={{ color: "#ffffff" }}>
                Create
              </Typography>
            )}
          </Fab>
          {loading && (
            <CircularProgress
              size={68}
              className="CircularIntegration-fabProgress-909"
              style={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1
              }}
            />
          )}
        </div>
      </div>
      // <div key="div1" style={{ paddingBottom: "2%", marginBottom: "2%" }}>
      //   <Button
      //     variant="contained"
      //     color="primary"
      //     onClick={() => this.handleSubmit()}
      //   >
      //     Create Form Template
      //   </Button>
      // </div>
    );
    return (
      <div key="div2" style={styles.container}>
        {" "}
        {[
          this.showGeneralFormInfo(),
          this.showFields(),
          this.showEditor(),
          this.showHelpModal(),
          this.showOptionsModal(this.state.optionsIdx),
          submitButton
        ]}{" "}
        {alertSnack}
      </div>
    );
  }
}

function textToCamelCase(inpStr) {
  let str = String(inpStr);
  let tokens = str
    .toLowerCase()
    .split(" ")
    .filter(s => s.length > 0);
  let res = "";
  for (let i = 0; i < tokens.length; i++)
    res +=
      i > 0
        ? tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1)
        : tokens[i];
  return res;
}

const styles = {
  container: {},

  card: {
    borderRadius: 12,
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    marginLeft: "7%",
    marginRight: "7%",
    marginBottom: "1%",
    marginTop: "1%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize: "17px"
  },

  bodyText: {
    fontSize: "17px",
    float: "left"
  },

  headerText: {
    fontStyle: "Bold",
    fontSize: "24px"
  },

  label: {
    fontSize: "17px",
    float: "left"
  },

  modalStyle: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none"
    }
  }
};

export default withStyles(styles)(FormTemplate);
