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
      selectSubject: '',
      allchapters: [],
      selectChapter: '',
      video: '',
      video1: false,
      pdf: false,
      pdfFile: '',
      level: false,
      alllevels: [
        { level: 'level 1' }, { level: 'level 2' }, { level: 'level 3' }, { level: 'level 4' }, { level: 'level 5' },
        { level: 'level 6' }, { level: 'level 7' }, { level: 'level 8' }, { level: 'level 9' }, { level: 'level 10' },
      ]
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

  chapter = () => {
    let { quizName, Questions } = this.state;
    console.log(Questions)
    for (var i = 0; i < Questions.length; i++) {
      console.log(Questions[i].Question)
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
      //   // database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${selectSubject}/Chapters`).push(obj);

      //   // database.child(`Quiz/`).push(data1)
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
        console.log(resp.rows)
        let obj;
        for (var i = 0; i < resp.rows.length; i++) {
          obj = Object.assign({}, resp.rows[i]);
          obj.qType = obj[0];
          obj.q = obj[1];
          let x = [];
          if (obj[2] !== undefined) {
            x.push(obj[2]);
          }
          if (obj[3] !== undefined) {
            x.push(obj[3]);
          }
          if (obj[4] !== undefined) {
            x.push(obj[4]);
          }
          if (obj[5] !== undefined) {
            x.push(obj[5]);
          }
          obj.options = x
          obj.correct = obj[6];
          delete obj[0];
          delete obj[1];
          delete obj[2];
          delete obj[3];
          delete obj[4];
          delete obj[5];
          delete obj[6];
          console.log(obj);
          allQuestions.push(obj);
          console.log(allQuestions)
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

  videoHandler = async (e) => {
    console.log(e.target.files[0]);
    let fileName = e.target.files[0].name;
    let ref = firebaseApp.storage().ref('/').child(`Videos/${fileName}`);
    await ref.put(e.target.files[0])
    await ref.getDownloadURL().then((url) => {
      console.log(url);
      alert("Video added successfully!")
      this.setState({ video: url, file: true, })
    })
  }


  pdfHandler = async (e) => {
    console.log(e.target.files[0]);
    let fileName = e.target.files[0].name;
    let ref = firebaseApp.storage().ref('/').child(`Pdf/${fileName}`);
    await ref.put(e.target.files[0])
    await ref.getDownloadURL().then((url) => {
      console.log(url);
      alert("Pdf added successfully!")
      this.setState({ pdfFile: url, file: true, })
    })
  }
  selectClass = (event) => {
    let { allcategories } = this.state;
    database.child(`Classes/${event.target.value}/Category`).on("child_added", (value) => {
      // console.log(value.val());
      let x = value.val();
      x.id = value.key
      console.log(x);
      allcategories.push(x);
      allcategories.sort()
      this.setState({ allcategories })
    })
    this.setState({ selectClass: event.target.value })
  }
  selectCategory = (event) => {
    let { allsubjects, selectClass, allcategories, selectCategory } = this.state;
    database.child(`Classes/${selectClass}/Category/${event.target.value}/Subjects`).on("child_added", (value) => {
      let x = value.val();
      x.id = value.key
      console.log(x);
      allsubjects.push(x);
      allsubjects.sort();
      this.setState({ allsubjects })
    })
    console.log(event, allcategories);
    for (var i = 0; i < allcategories.length; i++) {
      if (allcategories[i].category === 'Videos' && allcategories[i].id === event.target.value) {
        console.log('true', allcategories[i].category, allcategories[i].id, event.target.value);
        this.setState({ video1: true, pdf: false, filehandle: false })
      }
      else if (allcategories[i].category == 'Text Books' && allcategories[i].id === event.target.value) {
        console.log('true', allcategories[i].category, allcategories[i].id, event.target.value);
        this.setState({ video1: false, pdf: true, filehandle: false })
      }
      else if (allcategories[i].category == 'Question Papers' && allcategories[i].id === event.target.value) {
        console.log('true', allcategories[i].category, allcategories[i].id, event.target.value);
        this.setState({ video1: false, pdf: true, filehandle: false })
      }
      else if (allcategories[i].category == 'Study Material' && allcategories[i].id === event.target.value) {
        console.log('true', allcategories[i].category, allcategories[i].id, event.target.value);
        this.setState({ video1: false, pdf: true, filehandle: false })
      }
      else if (allcategories[i].category == 'Quiz' && allcategories[i].id === event.target.value) {
        console.log('true', allcategories[i].category, allcategories[i].id, event.target.value);
        this.setState({ video1: false, pdf: false, filehandle: true })
      }
      // else if(allcategories[i].category == 'Text Books' || allcategories[i].category == 'Question Papers' ||
      // allcategories[i].category == 'Study Material'){
      //   console.log('pdftrue');
      //   this.setState({pdf:true,video1:false})
      // }
    }
    this.setState({ selectCategory: event.target.value })

  }
  selectSubject = (event) => {
    let { allchapters, selectClass, selectCategory } = this.state;
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${event.target.value}/Chapters`).on("child_added", (value) => {
      // console.log(value.val());
      let x = value.val();
      x.id = value.key
      console.log(x);
      allchapters.push(x);
      allchapters.sort();
      this.setState({ allchapters })
    })
    this.setState({ selectSubject: event.target.value })
  }

  addVideo = () => {
    let { selectCategory, selectClass, subject, selectChapter, video, selectSubject } = this.state;
    let obj = {
      url: video
    }
    console.log(obj)
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${selectSubject}/Chapters/${selectChapter}/Video`).push(obj);
    alert("Video Added Successfully");
    this.props.history.push("/");

  }
  addPdf = () => {
    let { selectCategory, selectClass, subject, selectChapter, pdfFile, selectSubject } = this.state;
    let obj = {
      pdf: pdfFile
    }
    console.log(obj)
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${selectSubject}/Chapters/${selectChapter}/PDF`).push(obj);
    alert("Pdf Added Successfully");
    this.props.history.push("/");
  }

  addQuiz = () => {
    let { selectCategory, selectClass, selectLevel, selectChapter, Questions, selectSubject } = this.state;
    database.child(`Classes/${selectClass}/Category/${selectCategory}/Subjects/${selectSubject}/Chapters/${selectChapter}/Levels/${selectLevel}/Questions`).push(Questions);
    alert("Quiz Added Successfully");
    this.props.history.push("/");
  }

  render() {
    let { selectSubject, alllevels, instruction, main, quizName, file, notification, cols, rows, allclasses, selectClass, selectCategory, allcategories, allsubjects, allchapters, selectChapter } = this.state;
    console.log("Colums===>", cols, "Rows===>", rows, this.state.Questions)
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

                  <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 }}>
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
                      onChange={(event) => this.selectCategory(event)}
                      label="Select Class"
                    >
                      {allcategories && allcategories.map((v, i) => {
                        return <MenuItem style={{ width: 600 }} id={v.id} name={v.category} value={v.id}>{v.category}</MenuItem>
                      })}

                    </Select>
                  </FormControl>

                  <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Subject </InputLabel>
                    <Select
                      autoWidth={true}
                      style={{ width: "90%", margin: "auto" }}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selectSubject}
                      onChange={(event) => this.selectSubject(event)}
                      label="Select Class"
                    >
                      {allsubjects && allsubjects.map((v, i) => {
                        return <MenuItem style={{ width: 600 }} id={v.id} name={v.subject} value={v.id}>{v.subject}</MenuItem>
                      })}

                    </Select>
                  </FormControl>

                  <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Chapter </InputLabel>
                    <Select
                      autoWidth={true}
                      style={{ width: "90%", margin: "auto" }}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selectChapter}
                      onChange={(event) => {
                        let { allsubjects, selectClass, allcategories, selectCategory } = this.state;
                        for (var i = 0; i < allcategories.length; i++) {
                          if (allcategories[i].category === 'Quiz' && allcategories[i].id === selectCategory) {
                            this.setState({ level: true })
                          }
                        }
                        this.setState({ selectChapter: event.target.value, })

                      }}
                      label="Select Class"
                    >
                      {allchapters && allchapters.map((v, i) => {
                        return <MenuItem style={{ width: 600 }} id={v.id} value={v.id}>{v.chapter}</MenuItem>
                      })}

                    </Select>
                  </FormControl>

                  {this.state.level ?
                    <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 }}>
                      <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Select Level </InputLabel>
                      <Select
                        autoWidth={true}
                        style={{ width: "90%", margin: "auto" }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.selectLevel}
                        onChange={(event) => {
                          this.setState({ selectLevel: event.target.value });
                        }}
                        label="Select Class"
                      >
                        {alllevels && alllevels.map((v, i) => {
                          return <MenuItem style={{ width: 750 }} value={v.level}>{v.level}</MenuItem>
                        })}

                      </Select>
                    </FormControl>
                    : null}

                  {this.state.video1 ?
                    <TextField
                      id="outlined-margin-dense"
                      margin="dense"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="file"
                      onChange={this.videoHandler.bind(this)}
                      style={{ width: "90%", marginTop: 20, marginLeft: "5%", marginTop: 20 }}
                    />
                    :
                    null}
                  {this.state.filehandle ?
                    <TextField
                      id="outlined-margin-dense"
                      margin="dense"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={this.state.chapters}
                      type="file"
                      onChange={this.fileHandler.bind(this)}
                      style={{ width: "90%", marginTop: 20, marginLeft: "5%", marginTop: 20 }}
                    /> :
                    null}

                  {this.state.pdf ?
                    <TextField
                      id="outlined-margin-dense"
                      margin="dense"
                      variant="outlined"
                      style={{ width: "100%" }}
                      type="file"
                      onChange={this.pdfHandler.bind(this)}
                      style={{ width: "90%", marginTop: 20, marginLeft: "5%", marginTop: 20 }}
                    />
                    : null}

                  {this.state.video1 ?
                    <p style={{ textAlign: "center", width: "100%" }}>
                      <Grid container justify="center">
                        <Grid item lg={4} xs={8}>
                          <Button
                            variant="outlined"
                            color="primary"
                            className="quiz_instruction"
                            onClick={() => this.addVideo()}
                            disabled={file ? false : true}
                          >
                            Add Question
                  </Button>
                        </Grid>
                      </Grid>
                    </p> : null}

                  {this.state.filehandle ?
                    <p style={{ textAlign: "center", width: "100%" }}>
                      <Grid container justify="center">
                        <Grid item lg={4} xs={8}>
                          <Button
                            variant="outlined"
                            color="primary"
                            className="quiz_instruction"
                            onClick={() => this.addQuiz()}
                            disabled={file ? false : true}
                          >
                            Add Question
                          </Button>
                        </Grid>
                      </Grid>
                    </p> : null}

                  {this.state.pdf ?
                    <p style={{ textAlign: "center", width: "100%" }}>
                      <Grid container justify="center">
                        <Grid item lg={4} xs={8}>
                          <Button
                            variant="outlined"
                            color="primary"
                            style={{ backgroundColor: "#03a9f4", color: 'white' }}
                            className="quiz_instruction"
                            onClick={() => this.addPdf()}
                            disabled={file ? false : true}
                          >
                            Add Question
                  </Button>
                        </Grid>
                      </Grid>
                    </p>
                    : null}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

      </>
    );
  }
}
