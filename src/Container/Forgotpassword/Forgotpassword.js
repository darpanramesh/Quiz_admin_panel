import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import  AppBar  from "./../../Components/Appbar/Appbar";
import firebaseApp from "../../Config/Firebase/Firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "./Forgotpassword.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
let database = firebaseApp.database().ref("/");

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      value: "",
      helperText: "",
      sent: false,
    };
  }
  updataPassword = () => {
    var auth = firebaseApp.auth();
    var emailAddress = "darpangoswami77@gmail.com";

    auth.sendPasswordResetEmail(emailAddress)
      .then((res) => {
        // Email sent.
        console.log("Email sent");
        this.setState({
          helperText: "Email sent on your account",
          error: false,
          sent: true,
        });
      })
      .catch((err) => {
        if (
          err.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.setState({
            helperText: "There is no user record on this email!",
            error: true,
          });
        } else {
          this.setState({ helperText: err.message, error: true });
        }
      });
  };

  render() {
    return (
      <div>
        <AppBar />
        <Grid container justify="center">
          <Grid item xs={11} sm={10} md={6} lg={4} style={{ marginTop: 100 }}>
            <Paper
              className="_grid"
              style={{
                textAlign: "center",
                marginTop: 60,
              }}
            >
              {this.state.sent ? (
                <>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        <img src={require('./../../icon.png')} />
                      </Typography>
                      <Typography variant="h5" component="h4" style={{color:"green"}}>
                        Email Sent on your account
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <h3 style={{ paddingTop: 20 }}>Enter your Email Address</h3>
                  <FormControl
                    component="fieldset"
                    error={this.state.error}
                    style={{ width: "90%", textAlign: "center" }}
                  >
                    <TextField
                      id="outlined-dense"
                      label="Email"
                      type="email"
                      margin="dense"
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                          error: false,
                          helperText: "",
                        })
                      }
                    />

                    <FormHelperText>{this.state.helperText}</FormHelperText>
                    <br />

                    <Button
                      variant="outlined"
                      color="primary"
                      className="loginBtn"
                      style={{width: "100%" }}
                      onClick={() => this.updataPassword()}
                    >
                      update password
                      {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    </Button>
                    <p className="signupText">
                      <span
                        className="blue-text ml-1"
                        style={{ color: "blue" }}
                        onClick={() => this.props.history.push("./")}
                      >
                        Go back
                      </span>
                    </p>
                  </FormControl>
                  <br />
                  <br />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
