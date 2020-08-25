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
import SubjectIcon from './../../assets/subject.png';
import ChapterIcon from './../../assets/chapter.png';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import './ChapterSubject.css'
let database = firebaseApp.database().ref("/");


const classes = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default class ChapterSubject extends React.Component {
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
            allclasses.push(x)
            this.setState({ allclasses })
        })
    }

    render() {
        let { notification, cols, rows, allclasses, selectClass, selectCategory, allcategories, allsubjects } = this.state;
        console.log("Colums===>", cols, "Rows===>", rows)
        return (
            <>
                <Navbar props={this.props.history} notification={notification} />
                <Grid justify="center" style={{ marginTop: '10%' }} container spacing={3}>
                    <Grid item xs={11} sm={10} md={8} lg={5}> 
                        <div
                            onClick={() => this.props.history.push("AddSubject")}
                            className="_stateDiv"
                        >
                            <img src={SubjectIcon} className="_icon" />
                            <Typography className="_text">
                                Add subject
                              </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={11} sm={10} md={8} lg={5}>
                        <div
                            onClick={() => this.props.history.push("AddChapter")}
                            className="_stateDiv"
                        >
                            <img src={ChapterIcon} className="_icon" />
                            <Typography className="_text">
                                Add Chapter
                              </Typography>
                        </div>
                    </Grid>
                </Grid>

                {/* <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /> */}
            </>
        );
    }
}
