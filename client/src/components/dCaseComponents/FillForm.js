import React, { Component } from "react";
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
import cities from "../../data/cities";
import governates from "../../data/governorates";
import parseJwt from "../../helpers/decryptAuthToken";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../snackbar";

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
    managers: [],
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
    investorObject: {
      email: "",
      password: "",
      fullName: "",
      type: "",
      gender: "",
      nationality: "",
      methodOfIdentification: "",
      identificationNumber: "",
      dateOfBirth: "",
      residenceAddress: "",
      telephoneNumber: "",
      fax: ""
    },
    investorCreated: false,
    investorCreatedId: "",
    finished: false,
    success: false,
    loading: false,
    clicked: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };

  handleChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    for (let i = 0; i < this.state.formTemplates.length; i++) {
      if (this.state.formTemplates[i].formName === this.state.formName) {
        await this.setState({
          formTemplate: this.state.formTemplates[i],
          fields: this.state.formTemplates[i].fields
        });
        if (this.state.formTemplate.hasManagers) {
          if (this.state.managers.length === 0) {
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
          }
        }
        break;
      }
    }
  };
  handleSubmit = async () => {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    if (!this.state.loading) {
      await this.setState({
        success: false,
        loading: true,
        clicked: true
      });
    }
    if (this.state.creatorType === "investor") {
      const caseBody = {
        caseStatus: "WaitingForLawyer",
        creatorInvestorId: this.state.creatorId,
        companyType: this.state.formName,
        form: this.state.formObject,
        managers: this.state.managers
      };
      axios
        .post(`api/investors/fillForm/${this.state.creatorId}`, caseBody)
        .then(async res => {
          await this.setState({ success: true, loading: false });
          // alert(res.data.msg);
          await this.setState({ alerted: true, alertType:'success', alertMsg:res.data.msg });
          window.location.reload();
        })
        .catch(async err => {
          await this.setState({ success: false, loading: false });
          // alert(err.response.data.error);
          await this.setState({
            alerted: true,
            alertType: "error",
            alertMsg: err.response.data.error
          });
        });
    } else {
      if (!this.state.investorCreated) {
        axios
          .post(`api/investors/register`, this.state.investorObject)
          .then(res => {
            this.setState({
              investorCreated: true,
              investorCreatedId: res.data.data._id
            });
            const caseBody = {
              caseStatus: "WaitingForReviewer",
              creatorInvestorId: res.data.data._id,
              creatorLawyerId: this.state.creatorId,
              companyType: this.state.formName,
              form: this.state.formObject,
              managers: this.state.managers
            };
            axios
              .post(`api/lawyers/fillForm/${this.state.creatorId}`, caseBody)
              .then(async res => {
                await this.setState({ success: true, loading: false });
                await this.setState({ alerted: true, alertType:'success', alertMsg:res.data.msg });
                // alert(res.data.msg);
                // await this.setState({ success: true, loading: false });
                window.location.reload();
              })
              .catch(async err => {
                await this.setState({ success: false, loading: false });
                await this.setState({ alerted: true, alertType:'error', alertMsg:err.response.data.error });
                // alert(err.response.data.error);
              });
          })
          .catch(async err => {
            await this.setState({ success: false, loading: false });
            await this.setState({ alerted: true, alertType:'error', alertMsg:err.response.data.error });
            // alert(err.response.data.error);
          });
      } else {
        const caseBody = {
          caseStatus: "WaitingForReviewer",
          creatorInvestorId: this.state.investorCreatedId,
          creatorLawyerId: this.state.creatorId,
          companyType: this.state.formName,
          form: this.state.formObject,
          managers: this.state.managers
        };
        axios
          .post(`api/lawyers/fillForm/${this.state.creatorId}`, caseBody)
          .then(async res => {
            await this.setState({ success: true, loading: false });
            await this.setState({ alerted: true, alertType:'success', alertMsg:res.data.msg });
            // alert(res.data.msg);
            // await this.setState({ success: true, loading: false });
            window.location.reload();
          })
          .catch(async err => {
            await this.setState({ success: false, loading: false });
            await this.setState({ alerted: true, alertType:'error', alertMsg:err.response.data.error });
            // alert(err.response.data.error);
          });
      }
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
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({
      creatorId: data.id,
      creatorType: data.type
    });
    const formTemplates = await axios.get(`api/formTemplates/`);
    await this.setState({ formTemplates: formTemplates.data.data });
    await this.setState({ finished: true });
  }

  handleChangeItem = async (key, value) => {
    let form = this.state.formObject;
    form[key] = value;
    await this.setState({
      formObject: form,
      clicked: false,
      success: false,
      loading: false
    });
  };

  handleChangeMangerItem = async (managerIdx, key, value) => {
    let managers = [...this.state.managers];
    let manager = this.state.managers[managerIdx];
    manager[key] = value;
    managers[managerIdx] = manager;
    await this.setState({
      managers: managers,
      clicked: false,
      success: false,
      loading: false
    });
  };
  handleChangeInvestorItem = async (key, value) => {
    let invObj = this.state.investorObject;
    invObj[key] = value;
    await this.setState({
      investorObject: invObj,
      clicked: false,
      success: false,
      loading: false
    });
  };

  showManagers = () => {
    let i = 0;
    return this.state.managers.map(manager => this.showManager(i++));
  };

  showManager = managerIdx => {
    const classes = { ...styles };
    return (
      <Card key={managerIdx} style={classes.card}>
        <CardContent key="mc">
          <h1 key="mang">Manager</h1>
          <div key="managers">
            <ul key="fff" style={{ display: "flex", flexWrap: "wrap" }}>
              <TextField
                fullWidth
                key="managerName*"
                id="outlined-email-input1"
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
                key="managerType*"
                id="outlined-email-input4"
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
                key="managerGender*"
                id="outlined-email-input2"
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
                select
                margin="normal"
                variant="outlined"
              >
                <MenuItem key="gender1" value="Male">
                  Male
                </MenuItem>
                <MenuItem key="gender2" value="Female">
                  Female
                </MenuItem>
              </TextField>
              <TextField
                fullWidth
                key="managerNationality*"
                id="outlined-email-input5"
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
                key="managerIdType*"
                id="outlined-email-input6"
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
                select
              >
                <MenuItem key="idTyp1" value="NID">
                  NID
                </MenuItem>
                <MenuItem key="idTyp2" value="passport">
                  passport
                </MenuItem>
              </TextField>
              <TextField
                fullWidth
                key="managerIdNumber*"
                id="outlined-email-input7"
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
                key="managerDateOfBirth*"
                id="outlined-email-input8"
                helperText="Manager Date of Birth"
                type="date"
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
                key="managerResidenceAddress*"
                id="outlined-email-input9"
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
                key="managerPositionInBoardOfDirectors*"
                id="outlined-email-input10"
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
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      const classes = { ...styles };
      let formCard;
      let managersCard = "";
      let submitButton;
      let addMangerButton;
      let investorCard;
      let alertSnack;

      if (this.state.alerted)
        alertSnack = (
          <SnackBar
            message={this.state.alertMsg}
            variant={this.state.alertType}
          />
        );
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
                        key={field.fieldName}
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
                        value={
                          this.state.formObject[field.fieldName] === undefined
                            ? ""
                            : this.state.formObject[field.fieldName]
                        }
                        style={classes.textField}
                        onChange={ev =>
                          this.handleChangeItem(
                            field.fieldName,
                            ev.target.value
                          )
                        }
                        margin="normal"
                        variant="outlined"
                      >
                        {field.fieldType === "DROPLIST"
                          ? field.options.map(option => {
                              return (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              );
                            })
                          : field.fieldType === "CURRENCY"
                          ? currencies.map(currency => {
                              return (
                                <MenuItem key={currency.cc} value={currency.cc}>
                                  {currency.cc}
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
                        key={field.fieldName}
                        fullWidth
                        type="date"
                        helperText={
                          field.isRequired === true
                            ? field.fieldName + "*"
                            : field.fieldName
                        }
                        style={classes.textField}
                        onChange={ev =>
                          this.handleChangeItem(
                            field.fieldName,
                            ev.target.value
                          )
                        }
                        margin="normal"
                        variant="outlined"
                      />
                    ) : (
                      <TextField
                        key={field.fieldName}
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
                          this.handleChangeItem(
                            field.fieldName,
                            ev.target.value
                          )
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
        if (
          this.state.creatorType === "lawyer" &&
          !this.state.investorCreated
        ) {
          investorCard = (
            <Card style={classes.card}>
              <CardContent>
                <h1>Investor</h1>
                <div>
                  <ul style={{ display: "flex", flexWrap: "wrap" }}>
                    <TextField
                      fullWidth
                      key="investoremail"
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
                      key="investorpassword"
                      type="password"
                      label="password*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "password",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investorfullname"
                      type="email"
                      label="fullName*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "fullName",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investortype"
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
                      <MenuItem key="type" value="single">
                        single
                      </MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      key="investorgender"
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
                      <MenuItem key="gender1" value="Male">
                        Male
                      </MenuItem>
                      <MenuItem key="gender2" value="Female">
                        Female
                      </MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      key="investornationality"
                      type="email"
                      label="nationality*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "nationality",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investormethodofidentification"
                      type="email"
                      label="methodOfIdentification*"
                      style={classes.textField}
                      value={this.state.investorObject.methodOfIdentification}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "methodOfIdentification",
                          ev.target.value
                        )
                      }
                      select
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="methodOfIdentification1" value="passport">
                        passport
                      </MenuItem>
                      <MenuItem key="methodOfIdentification2" value="NID">
                        NID
                      </MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      key="investoridentificationnumber"
                      type="number"
                      label="identificationNumber*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "identificationNumber",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investordateofbirth"
                      type="date"
                      helperText="Investor Date of Birth"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "dateOfBirth",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      key="investorresidenceaddress"
                      type="email"
                      label="residenceAddress*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "residenceAddress",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investortelephone"
                      type="number"
                      label="telephoneNumber*"
                      style={classes.textField}
                      onChange={ev =>
                        this.handleChangeInvestorItem(
                          "telephoneNumber",
                          ev.target.value
                        )
                      }
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      key="investorfax"
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
              onClick={async () => {
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
              }}
            >
              <AddIcon />
            </Fab>
          );
        }
        const { loading, success, clicked } = this.state;
        submitButton = (
          <div
            className="CircularIntegration-root-241"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
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
                    Submit
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
          // <Fab
          //   variant="extended"
          //   size="large"
          //   color="secondary"
          //   style={{
          //     color: "#FFFFFF",
          //     height: "31px",
          //     width: "107px",
          //     fontSize: "13px",
          //     boxShadow: "none",
          // marginRight: "240px",
          // marginTop: "6px",
          // display: "block",
          // margin: "0 auto"
          //   }}
          //   onClick={this.handleSubmit}
          // >
          //   Submit
          // </Fab>
        );
      }
      return (
        <Card key="card00" style={classes.card}>
          <CardContent key="card11">
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
                      <MenuItem key={form.formName} value={form.formName}>
                        {form.formName}
                      </MenuItem>
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
            {alertSnack}
          </CardContent>
        </Card>
      );
    }
  }
}
export default withStyles(styles)(FillForm);
