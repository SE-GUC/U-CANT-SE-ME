import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  card: {
    borderRadius: 12,
    fontFamily: "Helvetica Neue",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    marginLeft: "5%",
    marginRight: "5%",
    marginButtom: "1%",
    marginTop: "1%",
    textAlign: "left"
  },
  media: {
    height: 140
  },
  root: {
    width: 345
  }
};

class InfoCard extends Component {
  state = {
    finished: false
  };

  async componentDidMount() {
    await this.setState({ finished: true });
  }

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
      return (
        <Card style={classes.card}>
          <CardActionArea>
            <CardContent>
              <div variant="h5" component="h2">
                <ul>
                  <h3> {this.props.infoTitle} </h3>
                  {this.props.fields.map(field => {
                    return (
                      <div key={field.fieldName} style={classes.root}>
                        <ListItem key={field.fieldName} button divider>
                          <Typography
                            component="h4"
                            style={{
                              fontFamily:
                                "-apple-system, BlinkMacSystemFont, sans-serif"
                            }}
                          >
                            {field.fieldName.toUpperCase() + ": "}

                            {field.fieldValue !== undefined ? (
                              field.fieldValue
                            ) : (
                              <CircularProgress
                                style={{ width: "10px", height: "10px" }}
                              />
                            )}
                          </Typography>
                        </ListItem>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    }
  }
}

export default withStyles(styles)(InfoCard);
