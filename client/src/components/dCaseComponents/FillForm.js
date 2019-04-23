import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import currencies from "../../data/currencies";
import cities from "../../data/cities"
import governates from "../../data/governorates";
import parseJwt from '../../helpers/decryptAuthToken';

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 60
  },
  selectEmpty: {
    marginTop: 20
  },
  textField: {},
  card: {
    borderRadius: 12,
    fontFamily: "Helvetica Neue",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    marginLeft: "5%",
    marginRight: "5%",
    marginButtom: "1%",
    marginTop: "1%",
    textAlign: "left"
  }
};

class FillForm extends Component {
  state = {
    formTemplate: {},
    fields: [],
    managers: [
      {
        managerName: "",
        managerType: "",
        managerGender: "",
        managerNationality: "",
        managerIdType: "",
        managerIdNumber: "",
        managerDateOfBirth: "",
        managerResidenceAddress: "",
        managerPositionInBoardOfDirectors: ""
      }
    ],
    formTemplates: [],
    formName: "None",
    labelWidth: 0,
    msg: "",
    msgType: "",
    formObject: {},
    name: "",
    currency: "EGP",
    creatorId: "",
    creatorType: "",
    investorObject:{}
  };

  handleChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    for (let i = 0; i < this.state.formTemplates.length; i++) {
      if (this.state.formTemplates[i].formName === this.state.formName) {
        await this.setState({
          formTemplate: this.state.formTemplates[i],
          fields: this.state.formTemplates[i].fields
        });
        break;
      }
    }
    //console.log(this.state.formTemplate)
  };
  handleSubmit = () => {
    if(this.state.creatorType==='investor')
    {
      const caseBody = {
        caseStatus: "WaitingForLawyer",
        creatorInvestorId: this.state.creatorId,
        companyType: this.state.formName,
        form: this.state.formObject,
        managers: this.state.managers
      };
      axios
      .post(`api/cases/`, caseBody)
      .then(res => {
        console.log(res.data.msg);
      })
      .catch(err => {
        console.log(err);
      });
    }
    else{
      console.log(this.state.investorObject)
      axios
        .post(`api/investors/`,this.state.investorObject)
        .then(res => {
          const caseBody = {
            caseStatus: "WaitingForReviewer",
            creatorInvestorId: res.data.data._id,
            creatorLawyerId: this.state.creatorId,
            companyType: this.state.formName,
            form: this.state.formObject,
            managers: this.state.managers
          };
          axios
          .post(`api/cases/`, caseBody)
          .then(res => {
            console.log(res.data.msg);
          })
          .catch(err => {
            console.log(err.response.data.error);
          });
        })
        .catch(err =>{
          console.log(err.response.data.error)
        })
    }
  };

  handleAddManager = async () => {
    let managers = [
      ...this.state.managers,
      {
        managerName: "",
        managerType: "",
        managerGender: "",
        managerNationality: "",
        managerIdType: "",
        managerIdNumber: "",
        managerDateOfBirth: "",
        managerResidenceAddress: "",
        managerPositionInBoardOfDirectors: ""
      }
    ];
    await this.setState({ managers: managers });
  };

  async componentDidMount() {
    const data = parseJwt(localStorage.jwtToken)
    await this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      creatorId:data.id
    });
    console.log(this.state.creatorId)
    const formTemplates = await axios.get(`api/formTemplates/`);
    console.log(formTemplates.data.data)
    await this.setState({ formTemplates: formTemplates.data.data });
    axios
        .get(`api/investors/${this.state.creatorId}`)
        .then(res =>{
          this.setState({ creatorType: "investor" });
        })
        .catch(err => {
          this.setState({ creatorType: "lawyer" });
        })
  }

  handleChangeItem = async (key, value) => {
    let form = this.state.formObject;
    form[key] = value;
    await this.setState({ formObject: form });
  };

  handleChangeMangerItem = async(managerIdx, key, value) => {
    let managers = [...this.state.managers];
    let manager = this.state.managers[managerIdx];
    manager[key] = value;
    managers[managerIdx] = manager;
    await this.setState({ managers: managers });
  };
  handleChangeInvestorItem = async(key, value) => {
    let invObj = this.state.investorObject;
    invObj[key] =value;
    await this.setState({investorObject:invObj})
  }

  showManagers = () => {
    let i = 0;
    return this.state.managers.map(manager => this.showManager(i++));
  };

  showManager = managerIdx => {
    const classes = { ...styles };
    return (
      <Card style={classes.card}>
        <CardContent>
          <h1>Manager</h1>
          <div>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerName*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerName}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerName",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerType*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerType}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerType",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerGender*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerGender}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerGender",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerNationality*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerNationality}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerNationality",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerIdType*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerIdType}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerIdType",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerIdNumber*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerIdNumber}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerIdNumber",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerDateOfBirth*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerDateOfBirth}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerDateOfBirth",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerResidenceAddress*"
                style={classes.textField}
                value={this.state.managers[managerIdx].managerResidenceAddress}
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerResidenceAddress",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-email-input"
                label="managerPositionInBoardOfDirectors*"
                style={classes.textField}
                value={
                  this.state.managers[managerIdx]
                    .managerPositionInBoardOfDirectors
                }
                onChange={ev =>
                  this.handleChangeMangerItem(
                    managerIdx,
                    "managerPositionInBoardOfDirectors",
                    ev.target.value
                  )
                }
                margin="normal"
                variant="outlined"
              />
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  render() {
    const classes = { ...styles };
    let formCard;
    let managersCard = "";
    let submitButton;
    let addMangerButton;
    let investorCard;
    if (this.state.formName !== "None") {
      formCard = (
        <Card style={classes.card}>
          <CardContent>
            <h1>Form</h1>
            <div>
              <ul style={{ display: "flex", flexWrap: "wrap" }}>
                {this.state.fields.map(field => {
                  return field.fieldType === "DROPLIST" ||
                    field.fieldType === "CURRENCY" ||
                    field.fieldType === "CITY" ||
                    field.fieldType === "GOVERNATE" ? (
                    <TextField
                      fullWidth
                      type={
                        field.fieldType === "NUMBER"
                          ? "number"
                          : field.fieldType === "DROPLIST" ||
                            field.fieldType === "CURRENCY" ||
                            field.fieldType === "CITY" ||
                            field.fieldType === "GOVERNATE"
                          ? ""
                          : "email"
                      }
                      label={
                        field.isRequired === true
                          ? field.fieldName + "*"
                          : field.fieldName
                      }
                      select
                      value={this.state.formObject[field.fieldName]}
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeItem(field.fieldName, ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                    >
                      {field.fieldType === "DROPLIST"
                        ? field.options.map(option => {
                            return (
                              <MenuItem key={option.value} value={option}>
                                {option}
                              </MenuItem>
                            );
                          })
                        : field.fieldType === "CURRENCY"
                        ? currencies.map(currency => {
                            return (
                              <MenuItem
                                key={currency.symbol}
                                value={currency.symbol}
                              >
                                {currency.symbol}
                              </MenuItem>
                            );
                          })
                        : field.fieldType === "CITY"
                        ? cities.map(city => {
                            return (
                              <MenuItem
                                key={city.nameInEnglish}
                                value={city.nameInEnglish}
                              >
                                {city.nameInEnglish}
                              </MenuItem>
                            );
                          })
                        : governates.map(gov => {
                            return (
                              <MenuItem
                                key={gov.nameInEnglish}
                                value={gov.nameInEnglish}
                              >
                                {gov.nameInEnglish}
                              </MenuItem>
                            );
                          })}
                    </TextField>
                  ) : field.fieldType === "DATE" ? (
                    <TextField
                      fullWidth
                      type="date"
                      label={
                        field.isRequired === true
                          ? field.fieldName + "*"
                          : field.fieldName
                      }
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeItem(field.fieldName, ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                    />
                  ) : (
                    <TextField
                      fullWidth
                      type={
                        field.fieldType === "NUMBER"
                          ? "number"
                          : field.fieldType === "DROPLIST" ||
                            field.fieldType === "CURRENCY" ||
                            field.fieldType === "CITY" ||
                            field.fieldType === "GOVERNATE"
                          ? "select"
                          : "email"
                      }
                      label={
                        field.isRequired === true
                          ? field.fieldName + "*"
                          : field.fieldName
                      }
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeItem(field.fieldName, ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                    />
                  );
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
      );
      if (this.state.creatorType === "lawyer") {
        investorCard = (
          <Card style={classes.card}>
            <CardContent>
              <h1>Investor</h1>
              <div>
                <ul style={{ display: "flex", flexWrap: "wrap" }} >
                <TextField
                      fullWidth
                      type="email"
                      label="email*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("email", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="password"
                      label="password*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("password", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="email"
                      label="fullName*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("fullName", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="email"
                      label="type*"
                      value={this.state.investorObject.type}
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("type", ev.target.value)
                      }
                      select
                      margin="normal"
                      variant="outlined"
                  >
                    <MenuItem
                      key="type"
                      value="type"
                      >
                      single
                    </MenuItem>
                  </TextField>
                  <TextField
                      fullWidth
                      type="email"
                      label="gender*"
                      value={this.state.investorObject.gender}
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("gender", ev.target.value)
                      }
                      select
                      margin="normal"
                      variant="outlined"
                  >
                  <MenuItem
                      key="gender"
                      value="Male"
                      >
                      Male
                    </MenuItem>
                    <MenuItem
                      key="gender"
                      value="Female"
                      >
                      Female
                    </MenuItem>
                  </TextField>
                  <TextField
                      fullWidth
                      type="email"
                      label="nationality*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("nationality", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="email"
                      label="methodOfIdentification*"
                      style={classes.textField}
                      value={this.state.investorObject.methodOfIdentification}
                      onChange={ev =>
                        this.handleChangeInvestorItem("methodOfIdentification", ev.target.value)
                      }
                      select
                      margin="normal"
                      variant="outlined"
                  >
                  <MenuItem
                      key="methodOfIdentification"
                      value="passport"
                      >
                      passport
                    </MenuItem>
                    <MenuItem
                      key="methodOfIdentification"
                      value="NID"
                      >
                      NID
                    </MenuItem>
                  </TextField>
                  <TextField
                      fullWidth
                      type="number"
                      label="identificationNumber*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("identificationNumber", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="date"
                      label="dateOfBirth*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("dateOfBirth", ev.target.value)
                      }
                      margin="normal"
                      variant="filled"
                  />
                  <TextField
                      fullWidth
                      type="email"
                      label="residenceAddress*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("residenceAddress", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="number"
                      label="telephoneNumber*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("telephoneNumber", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                  <TextField
                      fullWidth
                      type="number"
                      label="fax*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem("fax", ev.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                  />
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      }
      if (this.state.formTemplate.hasManagers) {
        managersCard = this.showManagers();
        addMangerButton = (
          <Fab
            color="primary"
            style={{ float: "right" }}
            onClick={ev => this.handleAddManager()}
          >
            <AddIcon />
          </Fab>
        );
      }

      submitButton = (
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          style={{
            color: "#FFFFFF",
            height: "31px",
            width: "107px",
            fontSize: "13px",
            boxShadow: "none",
            marginRight: "240px",
            marginTop: "6px",
            display: "block",
            margin: "0 auto"
          }}
          onClick={this.handleSubmit}
        >
          Submit
        </Fab>
      );
    }
    return (
      <Card style={classes.card}>
        <CardContent>
          <div>
            <FormControl
              fullWidth
              variant="outlined"
              style={classes.formControl}
            >
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Form
              </InputLabel>
              <Select
                value={this.state.formName}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="formName"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                {this.state.formTemplates.map(form => {
                  return (
                    <MenuItem value={form.formName}>{form.formName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div>{formCard}</div>
          </div>
          {managersCard}
          {investorCard}
          {addMangerButton}
          {submitButton}
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(FillForm);
