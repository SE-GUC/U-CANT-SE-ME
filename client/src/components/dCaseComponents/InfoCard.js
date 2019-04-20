import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import axios from "axios";

const styles = {
    card: {
        borderRadius: 12,
        fontFamily: "Helvetica Neue",
        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
        margin: "5%"
    },
    media: {
        height: 140
    },
    root: {
        width: 345
    }
}


class InfoCard extends Component {
    state = {

    };

    componentDidMount() {

    }

    render() {
        const classes = { ...styles };
        return (


            <Card style={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <div gutterBottom variant="h5" component="h2">
                            <h3> {this.props.infoTitle} </h3>
                            <ul>
                                {this.props.fields.map(field => {

                                    return <div style={classes.root}>
                                        <Typography component="h4">
                                            {field.fieldName}
                                       
                                            {field.fieldValue}
                                        </Typography>
                                    </div>

                                })}
                            </ul>
                        </div>
                    </CardContent>
                </CardActionArea>


            </Card>

        );
    }
}

export default withStyles(styles)(InfoCard);
