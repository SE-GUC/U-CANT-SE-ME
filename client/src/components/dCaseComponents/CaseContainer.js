import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import "../../App.css";

const styles = {
    root: {
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "1%",
        paddingRight: "1%",
        margin: "1%",
        borderRadius: 12,
        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
    }
};

class CaseContainer extends Component {
    state = {

    };


    componentDidMount() {

    }

    render() {
        const classes = { ...styles };
        return <div>
            <Paper style={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    This is a sheet of paper.
          </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
          </Typography>
            </Paper>
        </div>
    }
}


export default withStyles(styles)(CaseContainer);
