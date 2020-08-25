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
import ClassIcon from './../../';
import '../Add Class/addClass.css'

let database = firebaseApp.database().ref("/");





const classes = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default class AddCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            instruction: false,
            className: '',
            classCategory: '',
            category: false,
            allclasses: [],
            main: true
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
    AddCategory = () => {
        let { classCategory, selectClass } = this.state
        console.log(classCategory, selectClass)
        let obj = {
            category: classCategory
        }
        database.child(`Classes/${selectClass}/Category`).push(obj);
        this.setState({
            main: true,
            category: false
        });
        this.props.history.push("ClassCategory");
    }
    render() {
        let { quizName, main, allclasses, className, notification, instruction, classCategory, category, selectClass } = this.state;
        console.log(allclasses);
        return (
            <>
                <Navbar props={this.props.history} notification={notification} />

                    <Grid container justify="center" className="_grid">
                        <Grid item xs={11} sm={10} md={6} lg={6}>
                            <Paper style={{ width: "100%" }}>
                                <div style={{ width: "100%" }}>
                                    <p className="_heading" style={{ backgroundColor: "#119cf5" }}>
                                        <div className="_upersection">
                                            Here you can Add your Class Category
            </div>
                                    </p>
                                    <div className="_instructionDiv" style={{ width: "100%" }}>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <InputLabel htmlFor="demo-controlled-open-select" style={{ marginLeft: "5%" }}>Select Class </InputLabel>
                                            <Select
                                                autoWidth={true}
                                                style={{ width: "90%", margin: "auto" }}
                                                labelId='demo-controlled-open-select'
                                                id='demo-controlled-open-select'
                                                value={selectClass}
                                                onChange={(event) => {
                                                    this.setState({ selectClass: event.target.value })
                                                }}
                                                label="Select Class"
                                            >
                                                {allclasses && allclasses.map((v, i) => {
                                                    return <MenuItem id={v.id} value={v.id} style={{ width: 600 }}>{v.class}</MenuItem>
                                                })}

                                            </Select>
                                        </FormControl>


                                        <FormControl variant="outlined" style={{ width: "100%", marginTop: 30 }}>
                                            <InputLabel id="demo-simple-select-outlined-label" style={{ marginLeft: "5%" }}>Class Category</InputLabel>
                                            <Select
                                                autoWidth={true}
                                                style={{ width: "90%", margin: "auto" }}
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={classCategory}
                                                onChange={(event) => this.setState({ classCategory: event.target.value, category: true })}
                                                label="Class Category"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem style={{ width: 600 }} value='Text Books'>Text Books</MenuItem>
                                                <MenuItem style={{ width: 600 }} value='Study Material'>Study Material</MenuItem>
                                                <MenuItem style={{ width: 600 }} value='Question Papers'>Question Papers</MenuItem>
                                                <MenuItem style={{ width: 600 }} value='Videos'>Videos</MenuItem>
                                                <MenuItem style={{ width: 600 }} value='Quiz'>Quiz</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <p style={{ textAlign: "center", width: "100%" }}>
                                            <Grid container justify="center">
                                                <Grid item lg={4} xs={8}>
                                                    <Button
                                                        style={{ width: "100%" }}
                                                style={{backgroundColor: "#03a9f4",color:'white'}}
                                                variant="outlined"
                                                        color="primary"
                                                        className="quiz_instruction"
                                                        onClick={() => this.AddCategory()}
                                                        disabled={category ? false : true}
                                                    >
                                                        CREATE Class Category
                                               </Button>
                                                </Grid>
                                            </Grid>
                                        </p>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    

            </>
        );
    }
}
