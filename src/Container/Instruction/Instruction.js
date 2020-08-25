import React from "react";
import Button from "@material-ui/core/Button";
import Navbar from "./../../Components/Navbar/Appbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import firebaseApp from "../../Config/Firebase/Firebase";
import TextField from "@material-ui/core/TextField";
import StateIcon from './../../assets/apartment.png';
import ClassIcon from './../../assets/class.png';
import SubjectIcon from './../../assets/subject.png';
import QuestionIcon from './../../assets/question.png';
import './instruction.css'
let database = firebaseApp.database().ref("/");

export default class instruction extends React.Component {
  constructor() {
    super();
    this.state = {
      instruction: false,
      notification:[]
    };
  }
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("admin is login");
      } else {
        this.props.history.push("/");
      }
    });
let notification =[]
database.child("AdminNotification/").on("child_added",res=>{
  let value = res.val()
  notification.push(value)
  this.setState({notification:notification})
})
    
  }

  setInstruction = () => {
    let { quizName, totalQ } = this.state;
    this.props.history.push({
      pathname: "/createquestion",
      state: {
        quizName,
        totalQ,
      },
    });
  };

  render() {
    let { quizName, totalQ ,notification} = this.state;
    console.log(notification)
    return (
      <>
        <Navbar props={this.props.history} notification={notification} />
        <div style={{ marginTop: "5%",padding:"4%" }}>
            <Grid justify="center" container spacing={3}>
              <Grid item xs={11} sm={10} md={8} lg={4}>
                <div
                  onClick={() => {
                    this.props.history.push("AddState");
                  }}
                  className="_stateDiv"
                >
                  <img src={StateIcon} className="_icon"/>
                  <Typography className="_text">
                    Add State
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={11} sm={10} md={8} lg={4}>
                <div
                  onClick={() => {
                    this.props.history.push("ClassCategory");
                  }}
                  className="_stateDiv"
                >
                  <img src={ClassIcon} className="_icon"/>
                  <Typography className="_text">
                    Add Class
                  </Typography>
                </div>
              </Grid>
              </Grid>
              <Grid justify="center" container spacing={3}>
              <Grid item xs={11} sm={10} md={8} lg={4}>
                <div
                  onClick={() => {
                    this.props.history.push("ChapterSubject");
                  }}
                  className="_stateDiv"
                >
                  <img src={SubjectIcon} className="_icon"/>
                  <Typography className="_text">
                    Add Subjects
                  </Typography>

                </div>
              </Grid>
              <Grid item xs={11} sm={10} md={8} lg={4}>
                <div
                  onClick={() => {
                    this.props.history.push("AddQuestion");
                  }}
                  className="_stateDiv"
                >
                  <img src={QuestionIcon} className="_icon"/>
                  <Typography className="_text">
                    Add Question
                  </Typography>

                </div>
              </Grid>
            </Grid>
          </div>
      </>
    );
  }
}
