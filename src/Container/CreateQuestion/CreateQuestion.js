import React from "react";
import Button from "@material-ui/core/Button";
import "./CreateQuestion.css";
import Navbar from "./../../Components/Navbar/Appbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebaseApp from "../../Config/Firebase/Firebase";
import TextField from "@material-ui/core/TextField";
import "./CreateQuestion.css";
import {
  Blanks,
  MultipleChoice,
  Openquestion,
  QuestionwithOneAns,
  TrueFalse,
} from "./../../Components";
let database = firebaseApp.database().ref("/");

export default class CreateQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      num: 1,
      category: "",
      notification: [],
    };
  }

  componentDidMount() {
    let notificationArray = [];
    database.child("AdminNotification/").on("child_added", (res) => {
      let value = res.val();
      notificationArray.push(value);
      this.setState({ notification: notificationArray });
      console.log(notificationArray);
    });

    const uid = this.state.uid;
    database.child("Users/" + uid).once("value", (res) => {
      let data = res.val();
      this.setState({ user: data });
      console.log(data);
    });

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid });
      } else {
        this.props.history.push("/");
      }
    });
  }

  getOutput = (val) => {
    val.selectedOption = "";
    val.selectedValue = "";
    let questions = this.state.question;
    let totalQue = this.props.location.state.totalQ;
    let quizName = this.props.location.state.quizName;
    let { num } = this.state;

    if (num <= totalQue) {
      questions.push(val);
      this.setState({
        questions: questions,
        num: this.state.num + 1,
        category: "",
        question: "",
      });
      console.log(this.state.questions);
    } else {
      let check = window.confirm(
        `You added ${totalQue} qestions! Are you want to submit?`
      );

      if (check) {
        database.child("Quiz/").push({ questions, quizName });
        database
          .child("StudentNotifications/")
          .push({ quizName: this.props.location.state.quizName });
        this.props.history.push("/createdTest");
      }
    }
  };

  render() {
    let { num, qustions, instruction, quizName, totalQ } = this.state;
    let getProps = this.props.location.state;
    let selectedSub = getProps.quizName;
    console.log(this.state.notification);
    return (
      <>
        <Navbar
          props={this.props.history}
          notification={this.state.notification}
        />
        <Grid container justify="center" className="_grid">
          <Grid item xs={11} sm={10} md={6} lg={6}>
            <Paper>
              <div>
                <p className="_heading" style={{ backgroundColor: "#119cf5" }}>
                  <div className="_upersection">
                    ADD MULTIPLE CHOICE QUESTION TO YOUR QUIZ{" "}
                    <span style={{ textTransform: "uppercase" }}>
                      {selectedSub}
                    </span>
                  </div>
                </p>
                <div className="_instructionDiv">
                  <div className="_headingSection">
                    <p className="_heading">
                      <span>
                        <span>
                          {num <= getProps.totalQ ? num : getProps.totalQ}
                        </span>
                        /{getProps.totalQ}
                      </span>
                    </p>
                  </div>
                  <textarea
                    col={12}
                    className="create_question"
                    value={this.state.question}
                    placeholder="Enter your question here .."
                    onChange={(e) =>
                      this.setState({ question: e.target.value })
                    }
                  ></textarea>
                  <br />
                  <MultipleChoice num={num} onclick={this.getOutput} />
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}
