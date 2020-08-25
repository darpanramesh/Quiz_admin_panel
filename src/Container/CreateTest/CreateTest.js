import React from "react";
import Appbar from "./../../Components/Navbar/Appbar";
import "./creatTest.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebaseApp from "../../Config/Firebase/Firebase";
let database = firebaseApp.database().ref("/");
class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      success: true,
      notification:[]
    };
  }
  logout = () => {
    alert("");
    firebaseApp
      .auth()
      .signOut()
      .then((res) => {
        // Sign-out successful.
        console.log(" Sign-out successful.");
        this.props.history.push("/");
      })
      .catch(function (error) {
        console.log(error.message);
        // An error happened.
      });
  };

  componentDidMount() {
    let notification = [];
    database.child("AdminNotification/").on("child_added", (res) => {
      let value = res.val();
      notification.push(value);
      this.setState({ notification: notification });
    });
  }
  render() {
    // const userData = this.props.location.state.userData;
    return (
      <div>
        <Appbar props={this.props.history} notification={this.state.notification} />

        <Grid container justify="center">
          <Grid>
            <Paper className="sent_email">
              <br />
              <br />
              <p style={{ width: "80%", margin: "auto" }}>
                Quiz uploaded successfully on your app
              </p>

              <br />
              <br />
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{
                  // color: "white",
                  widht: "200px",
                }}
                onClick={() => this.logout()}
              >
                LOGOUT
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateTest;
