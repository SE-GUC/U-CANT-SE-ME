import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const styles1 = {
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  },
  icon: {
    fontSize: 25,
    marginRight: "5px"
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
};

// function TransitionRight() {
//   return (
//     <Slide
//       appear={true}
//       in={true}
//       timeout={{ enter: 225, exit: 195 }}
//       direction="right"
//     />
//   );
// }

function MySnackbarContent(props) {
  const classes = { ...styles1 };
  const { message, onClose, variant } = props;
  return (
    <SnackbarContent
      className="MySnackbarContent-error-46"
      aria-describedby="client-snackbar"
      style={variant === "error" ? classes.error : classes.success}
      message={
        <span
          id="client-snackbar"
          className="MySnackbarContent-message-49"
          style={classes.message}
        >
          {variant === "error" ? (
            <ErrorIcon
              className="MySnackbarContent-icon-47"
              style={classes.icon}
            />
          ) : (
            <CheckCircleIcon
              className="MySnackbarContent-icon-48"
              style={classes.icon}
            />
          )}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className="MySnackbarContent-icon-47" />
        </IconButton>
      ]}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = () => ({
  margin: {
    margin: "1%"
  }
});

class CustomizedSnackbars extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // const x = <Slide />;
    return (
      <div>
        <Snackbar
          style={{ marginLeft: "5%" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          // TransitionComponent={
          //   <Slide
          //     appear={true}
          //     in={true}
          //     timeout={{ enter: 225, exit: 195 }}
          //     direction="right"
          //   />
          // }
          // TransitionComponent=x
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            variant={this.props.variant}
            message={this.props.message}
            onClose={this.handleClose}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles2)(CustomizedSnackbars);
