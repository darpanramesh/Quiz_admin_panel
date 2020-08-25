import React from "react";
import Paper from "@material-ui/core/Paper";
import "./AttemptedQuiz.css";
import Launch from "@material-ui/icons/Launch";
import firebaseApp from "../../Config/Firebase/Firebase";
import AppBar from "./../../Components/Navbar/Appbar";
let database = firebaseApp.database().ref("/");
export default class QuziCard extends React.Component {
  constructor() {
    super();
    this.state = {
      studentResult: [],
      notification: [],
    };
  }
  componentDidMount() {
    let notificationArray = [];
    database.child("AdminNotification/").on("child_added", (res) => {
      let value = res.val();
      notificationArray.push(value);
      this.setState({ notification: notificationArray });
    });

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("already login");
      } else {
        this.props.navigation.navigate("login");
      }
    });

    let studentResult = [];
    database.child("AttemptedQuiz/").on("child_added", (res) => {
      let value = res.val();
      studentResult.push(value.result);
      this.setState({ studentResult: studentResult });
    });
  }
  render() {
    console.log(this.state.studentResult);
    // let {result} = this.state;
    // result.correct/10)*100}%
    // console.log(this.state.studentResult)
    return (
      <>
        <AppBar
          props={this.props.history}
          notification={this.state.notification}
        />
        <Paper className="_quizCard_paper">
          <table className="_quizTable">
            <tr>
              <th>Student Name</th>
              <th>Quiz Name</th>
              <th>Total Questions</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Percentage</th>
            </tr>
            {this.state.studentResult.map((val, i) => (
              <tr>
                <td>{val.user}</td>
                <td>{val.quizName}</td>
                <td>{val.total}</td>
                <td>{val.correct}</td>
                <td>{val.wrong}</td>
                <td>100% </td>
              </tr>
            ))}
          </table>
        </Paper>
      </>
    );
  }
}
