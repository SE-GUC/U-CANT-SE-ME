import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { Fab } from "@material-ui/core";
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

class UpdateForm extends Component {
  state = {
    case: {},
    entries: [[]],
    formTemplateFields: [],
    formObject: {},
    originalFormObj: {},
    toUpdateProps: this.props.case.form,
    labelWidth: 0,
    msg: "",
    msgType: "",
    name: "",
    currency: "EGP",
    creatorId: "",
    creatorType: "",
    finished: false,
    success: false,
    loading: false,
    clicked: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };

  handleUpdateButton = async () => {
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
        form: this.state.formObject
      };
      axios
        .put(
          `api/investors/updateForm/${this.state.creatorId}/${
            this.state.case._id
          }`,
          caseBody
        )
        .then(async res => {
          await this.setState({ success: true, loading: false });
          this.props.case.form = this.state.formObject;
          await this.setState({ toUpdateProps: this.state.formObject });
          await this.setState({
            alerted: true,
            alertType: "success",
            alertMsg: "Form Updated Successfully!"
          });
          window.location.reload();
        })
        .catch(async err => {
          await this.setState({ success: false, loading: false });
          await this.setState({
            alerted: true,
            alertType: "error",
            alertMsg: err.response.data.error
          });
        });
    } else {
      const caseBody = {
        caseStatus: "WaitingForReviewer",
        form: this.state.formObject
      };
      axios
        .put(
          `api/lawyers/updateForm/${this.state.creatorId}/${
            this.state.case._id
          }`,
          caseBody
        )
        .then(async res => {
          this.props.case.form = this.state.formObject;
          await this.setState({ success: true, loading: false });
          await this.setState({ toUpdateProps: this.state.formObject });
          await this.setState({
            alerted: true,
            alertType: "success",
            alertMsg: "Form Updated Succesfully!"
          });
          window.location.reload();
        })
        .catch(async err => {
          await this.setState({ success: false, loading: false });
          await this.setState({
            alerted: true,
            alertType: "error",
            alertMsg: err.response.data.error
          });
        });
    }
  };

  async componentDidMount() {
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({
      creatorId: data.id
    });
    await this.setState({
      case: this.props.case,
      entries: Object.entries(this.props.case.form),
      //formObject: JSON.parse(JSON.stringify(this.props.case.form)),
      originalFormObj: JSON.parse(JSON.stringify(this.props.case.form))
    });
    const formTemplates = await axios.get(`api/formTemplates/`);
    formTemplates.data.data.forEach(formT => {
      if (formT.formName === this.state.case.companyType) {
        this.setState({ formTemplateFields: formT.fields });
      }
    });
    await this.setState({ creatorType: data.type });
    await this.setState({ finished: true });
  }

  handleChangeItem = async (key, value) => {
    let form = this.state.formObject;
    form[key] = value;
    await this.setState({ formObject: form });
    await this.setState({
      formObject: form,
      clicked: false,
      success: false,
      loading: false
    });
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
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      const classes = { ...styles };
      let updateButton;

      let updateFormCard = (
        <header className="UpdateForm">
          <Card style={classes.card}>
            <CardContent>
              <h1>Update Form</h1>
              <div>
                <ul style={{ display: "flex", flexWrap: "wrap" }}>
                  {this.state.formTemplateFields.map(field => {
                    return field.fieldType === "DROPLIST" ||
                      field.fieldType === "CURRENCY" ||
                      field.fieldType === "CITY" ||
                      field.fieldType === "GOVERNATE" ? (
                      <TextField
                        fullWidth
                        key={field.fieldName}
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
                          this.handleChangeItem(
                            field.fieldName,
                            ev.target.value
                          )
                        }
                        margin="normal"
                        variant="outlined"
                        helperText={`Original Value is ${
                          this.state.originalFormObj[field.fieldName]
                        }`}
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
                        fullWidth
                        key={field.fieldName}
                        type="date"
                        style={classes.textField}
                        onChange={ev =>
                          this.handleChangeItem(
                            field.fieldName,
                            ev.target.value
                          )
                        }
                        margin="normal"
                        variant="outlined"
                        value={this.state.formObject[field.fieldName]}
                        helperText={`Original Value of ${
                          field.isRequired === true
                            ? field.fieldName + "*"
                            : field.fieldName
                        } is ${this.state.originalFormObj[field.fieldName]}`}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        key={field.fieldName}
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
                        value={this.state.formObject[field.fieldName]}
                        helperText={`Original Value is ${
                          this.state.originalFormObj[field.fieldName]
                        }`}
                      />
                    );
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>
        </header>
      );
      const { loading, success, clicked } = this.state;
      updateButton = (
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
              onClick={this.handleUpdateButton}
            >
              {success && clicked ? (
                <CheckIcon />
              ) : !success && clicked && !loading ? (
                <CrossIcon />
              ) : (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  Update
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
        //     marginRight: "240px",
        //     marginTop: "6px",
        //     display: "block",
        //     margin: "0 auto"
        //   }}
        //   onClick={this.handleUpdateButton}
        // >
        //   Update
        // </Fab>
      );

      return (
        <div>
          <div>
            {alertSnack}
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
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.props.handleUpdateFormBack}
            >
              {"Back"}
            </Fab>
          </div>
          <Card style={classes.card}>
            <CardContent>
              <div>
                <h3>{this.state.case.companyType}</h3>
                {updateFormCard}
                <br />
                {updateButton}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
export default withStyles(styles)(UpdateForm);
