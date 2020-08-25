import React from "react";
import Button from "@material-ui/core/Button";
import Navbar from "./../../Components/Navbar/Appbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebaseApp from "../../Config/Firebase/Firebase";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
let database = firebaseApp.database().ref("/");


const classes = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default class AddSubject extends React.Component {
  constructor() {
    super();
    this.state = {
      instruction: false,
      file: false,
      cols: '',
      rows: '',
      Questions: [],
      allclasses: [],
      selectClass: '',
      selectCategory: '',
      allcategories: [],
      subject: '',
      main: true,
      chapter: false,
      allsubjects: [],
      selectSubject: ''
    };
  }
  componentDidMount() {
    let { allclasses } = this.state;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("admin is login");
      } else {
        this.props.history.push("/");
      }
    });
    let notification = []
    database.child("AdminNotification/").on("child_added", res => {
      let value = res.val()
      notification.push(value)
      this.setState({ notification: notification })
    })


    database.child(`Classes`).on("child_added", (value) => {
      // console.log(value.val());
      let x = value.val();
      x.id = value.key
      console.log(x);
      allclasses.push(x);
      allclasses.sort();
      this.setState({ allclasses })
    })
  }

  fileHandler = (event) => {
    let { Questions } = this.state
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        let allQuestions = []
        for (var i = 0; i < resp.rows.length; i++) {
          allQuestions.push(resp.rows[i]);
          allQuestions.sort()
        }
        this.setState({
          cols: resp.cols,
          rows: resp.rows,
          file: true,
          Questions: allQuestions
        });
      }
    });

  }
  selectClass = (event) => {
    let { allcategories } = this.state;
    database.child(`Classes/${event.target.value}/Category`).on("child_added", (value) => {
      // console.log(value.val());
      let x = value.val();
      x.id = value.key
      console.log(x);
      allcategories.push(x);
      allcategories.sort();
      this.setState({ allcategories })
    })
    this.setState({ selectClass: event.target.value })
  }
  selectCategory = (event) => {
    let { allsubjects, selectClass } = this.state;
    database.child(`Classes/${selectClass}/Category/${event.target.value}/Subjects`).on("child_added", (value) => {
      // console.log(value.val());
      let x = value.val();
      x.id = value.key
      console.log(x);
      allsubjects.push(x);
      allsubjects.sort()
      this.setState({ allsubjects })
    })
    this.setState({ selectCategory: event.target.value })

  }

  subject = () => {
    let { selectCategory, selectClass, subject } = this.state;
    let obj = {
      subject: subject
    }
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects`).push(obj);
    this.setState({ main: true, instruction: false });
    this.props.history.push("ChapterSubject");


  }

  render() {
    let { selectSubject, chapter, instruction, main, quizName, file, notification, cols, rows, allclasses, selectClass, selectCategory, allcategories, allsubjects } = this.state;
    console.log("Colums===>", cols, "Rows===>", rows)
    return (
      <>
        <Navbar props={this.props.history} notification={notification} />

          <Grid container justify="center" className="_grid">
            <Grid item xs={11} sm={10} md={6} lg={6}>
              <Paper style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>
                  <p className="_heading" style={{ backgroundColor: "#119cf5" }}>
                    <div className="_upersection">
                      Here you can Add your Subject
                        </div>
                  </p>
                  <div className="_instructionDiv" style={{ width: "100%" }}>

                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Class </InputLabel>
                      <Select
                        autoWidth={true}
                        style={{ width: "90%", margin: "auto" }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectClass}
                        onChange={(event) => this.selectClass(event)}
                        label="Select Class"
                      >
                        {allclasses && allclasses.map((v, i) => {
                          return <MenuItem style={{ width: 600 }} id={v.id} value={v.id}>{v.class}</MenuItem>
                        })}

                      </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 }}>
                      <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Category </InputLabel>
                      <Select
                        autoWidth={true}
                        style={{ width: "90%", margin: "auto" }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectCategory}
                        onChange={(event) => {
                          this.setState({ selectCategory: event.target.value })
                        }}
                        label="Select Class"
                      >
                        {allcategories && allcategories.map((v, i) => {
                          return <MenuItem style={{ width: 600 }} id={v.id} value={v.id}>{v.category}</MenuItem>
                        })}

                      </Select>
                    </FormControl>

                    <TextField
                      label="Add Subject"
                      id="outlined-margin-dense"
                      margin="dense"
                      variant="outlined"
                      style={{ width: "90%", marginTop: 20, marginLeft: "5%" }}
                      value={this.state.subject}
                      type="text"
                      onChange={(e) => this.setState({ subject: e.target.value, file: true })}
                    />


                    <p style={{ textAlign: "center", width: "100%" }}>
                      <Grid container justify="center">
                        <Grid item lg={4} xs={8}>
                          <Button
                            style={{ width: "100%" }}
                            variant="outlined"
                            style={{backgroundColor: "#03a9f4",color:'white'}}
                            color="primary"
                            className="quiz_instruction"
                            onClick={() => this.subject()}
                            disabled={file ? false : true}
                          >
                            CREATE Subject
                          </Button>
                        </Grid>
                      </Grid>
                    </p>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        {/* <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /> */}
      </>
    );
  }
}
