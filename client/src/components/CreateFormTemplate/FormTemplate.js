import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import Modal from "react-modal";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import axios from "axios";
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
  Button,
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
        fieldName: "",
        fieldType: "",
        isRequired: false,
        isUnique: false,
        minVal: 0,
        maxVal: 1000000,
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
    specifyMinAndMaxFields: [],
    advanced: false,
    helpModal: false,
    optionsModal: false,
    optionsIdx: -1,
    addedOption: ""
  };

  handleSubmit = () => {
    const {
      formName,
      fields,
      hasManagers,
      managersMinNumber,
      managersMaxNumber,
      code
    } = this.state;
    let formTemplate = {
      formName,
      fields,
      hasManagers
      // managersMinNumber,
      // managersMaxNumber
    };
    for (let i = 0; i < formTemplate.fields.length; i++)
      formTemplate.fields[i].fieldName = textToCamelCase(
        formTemplate.fields[i].fieldName
      );
    if (code.length > 0) formTemplate.rulesFunction = code;
    console.log(formTemplate);
    axios
      .post(`api/admins/createFormTemplate/`, formTemplate)
      .then(res => {
        alert(`Form Template Created!`);
      })
      .catch(error => {
        alert(
          `The Form Template doesn't match required conditions! \nError: ${
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data.error
          }`
        );
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
  };

  handleHelp = () => {
    this.setState({ helpModal: true });
  };

  showGeneralFormInfo = () => {
    let managersDetails = [];
    if (this.state.hasManagers && this.state.specifyMinAndMax) {
      managersDetails = [
        <TextField
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
      <Card style={styles.card}>
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
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
          paddingTop: "2%"
        }}
      >
        <div style={{ display: "grid", gridRowGap: "10%" }}>
          <TextField
            required
            label="Field name"
            value={this.state.fields[fieldIdx].fieldName}
            onChange={ev =>
              this.handleFieldChange(fieldIdx, "fieldName", ev.target)
            }
            margin="normal"
            variant="outlined"
          />
          <FormControl required variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Field type
            </InputLabel>
            <Select
              value={this.state.fields[fieldIdx].fieldType}
              onChange={ev =>
                this.handleFieldChange(fieldIdx, "fieldType", ev.target)
              }
              input={<OutlinedInput labelWidth={70} name="fieldType" />}
            >
              <MenuItem value="">
                <em>Choose a field type</em>
              </MenuItem>
              <MenuItem value={"TEXT"}>Text</MenuItem>
              <MenuItem value={"NUMBER"}>Number</MenuItem>
              <MenuItem value={"TEXT_NUMBER"}>Text Number</MenuItem>
              <MenuItem value={"DATE"}>Date</MenuItem>
              <MenuItem value={"GOVERNATE"}>Governate</MenuItem>
              <MenuItem value={"CITY"}>City</MenuItem>
              <MenuItem value={"CURRENCY"}>Currency</MenuItem>
              <MenuItem value={"DROPLIST"}>Droplist</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        {"Field is required\t"}
        <FormControlLabel
          control={
            <Switch
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
              checked={this.state.specifyMinAndMaxFields[fieldIdx]}
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
      <Card style={styles.card}>
        <Typography style={styles.headerText} component="h1">
          {" "}
          Form{" "}
        </Typography>
        <React.Fragment>
          {this.state.fields.map(field => [
            this.showField(i++),
            i < this.state.fields.length ? <Divider /> : ""
          ])}
        </React.Fragment>
        <div style={{ float: "right" }}>
          <Fab color="secondry" aria-label="RemoveIcon">
            <RemoveIcon onClick={ev => this.handleRemoveField()} />
          </Fab>{" "}
          <Fab color="primary" aria-label="Add">
            <AddIcon onClick={ev => this.handleAddField()} />
          </Fab>
        </div>
      </Card>
    );
  };

  showEditor = () => {
    let editor = [
      <Editor
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
        color="secondry"
        aria-label="Add"
        style={{ float: "right", marginRight: "7%" }}
      >
        <HelpIcon onClick={ev => this.handleHelp()} />
      </Fab>
    ];
    return (
      <div style={{ paddingBottom: "5%" }}>
        <div
          style={{
            // fontFamily: "Helvetica Neue",
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
  };

  handleRemoveOption = fieldIdx => {
    if (this.state.fields.length < 1) return;
    let options = this.state.fields[fieldIdx].options;
    options = options.splice(0, options.length - 1);
    let fields = this.state.fields;
    fields[fieldIdx].options = options;
    this.setState({ fields: fields });
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
    let submitButton = (
      <div style={{ paddingBottom: "2%", marginBottom: "2%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleSubmit()}
        >
          Create Form Template
        </Button>
      </div>
    );
    return (
      <div style={styles.container}>
        {" "}
        {[
          this.showGeneralFormInfo(),
          this.showFields(),
          this.showEditor(),
          this.showHelpModal(),
          this.showOptionsModal(this.state.optionsIdx),
          submitButton
        ]}{" "}
      </div>
    );
  }
}

function textToCamelCase(inpStr) {
  let str = String(inpStr);
  console.log(str);
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
    // fontFamily: "Helvetica Neue",
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
    // fontFamily: "Helvetica Neue",
    fontSize: "17px",
    float: "left"
  },

  headerText: {
    // fontFamily: "Helvetica Neue",
    fontStyle: "Bold",
    fontSize: "24px"
  },

  label: {
    // fontFamily: "Helvetica Neue",
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
