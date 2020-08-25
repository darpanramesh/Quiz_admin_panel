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


export default class AddChapter extends React.Component {
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

  setInstruction = async () => {
    let { quizName, Questions } = this.state;
    for (var i = 0; i < Questions.length; i++) {
      let data1 = {
        data: {
          quiztype: Questions[i].quiztype,
          Question: Questions[i].Question,
          option1: Questions[i].option1,
          option2: Questions[i].option2,
          option3: Questions[i].option3,
          option4: Questions[i].option4,
          correctoption: Questions[i].correctoption
        }
      }
      await firebaseApp.firestore().collection(`Quiz`).set(data1)
      console.log(data1, '==>list')
    }
    // this.props.history.push({
    //   pathname: "/createquestion",
    //   state: {
    //     quizName,
    //     totalQ,
    //   },
    // });
  };
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
      allsubjects.sort();
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
    this.setState({ main: true, instruction: false })
  }
  chapter = () => {
    let { selectCategory, selectClass, chapters, selectSubject } = this.state;
    let obj = {
      chapter: chapters
    }
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${selectSubject}/Chapters`).push(obj);
    this.setState({ main: true, chapter: false });
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
                      Here you can Add your Subject's Chapter
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

                    <FormControl variant="outlined" style={{ width: "100%",marginTop: 20 }}>
                      <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Category </InputLabel>
                      <Select
                        autoWidth={true}
                        style={{ width: "90%", margin: "auto" }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectCategory}
                        onChange={(event) => this.selectCategory(event)}
                        label="Select Class"
                      >
                        {allcategories && allcategories.map((v, i) => {
                          return <MenuItem style={{ width: 600 }} id={v.id} value={v.id}>{v.category}</MenuItem>
                        })}

                      </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ width: "100%",marginTop: 20 }}>
                      <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Subject </InputLabel>
                      <Select
                        autoWidth={true}
                        style={{ width: "90%", margin: "auto" }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectSubject}
                        onChange={(event) => {
                          this.setState({ selectSubject: event.target.value })
                        }}
                        label="Select Class"
                      >
                        {allsubjects && allsubjects.map((v, i) => {
                          return <MenuItem style={{ width: 600 }} id={v.id} value={v.id}>{v.subject}</MenuItem>
                        })}

                      </Select>
                    </FormControl>

                    <TextField
                      label="Add Chapter"
                      id="outlined-margin-dense"
                      margin="dense"
                      variant="outlined"
                      style={{ width: "90%", marginTop: 20, marginLeft: "5%" }}
                      value={this.state.chapters}
                      type="text"
                      onChange={(e) => this.setState({ chapters: e.target.value, file: true })}
                    />

                    <p style={{ textAlign: "center", width: "100%" }}>
                      <Grid container justify="center">
                        <Grid item lg={4} xs={8}>
                          <Button
                            variant="outlined"
                            style={{backgroundColor: "#03a9f4",color:'white'}}
                            color="primary"
                            className="quiz_instruction"
                            onClick={() => this.chapter()}
                            disabled={file ? false : true}
                          >
                            CREATE Chapter
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
