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
import './addClass.css'
let database = firebaseApp.database().ref("/");





const classes = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default class AddClass extends React.Component {
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
            allclasses.push(x)
            this.setState({ allclasses })
        })
    }

    AddClass = () => {
        let { className } = this.state
        let database = firebaseApp.database().ref("/");
        let obj = {
            class: className
        }
        database.child("Classes/").push(obj);
        this.setState({
            instruction: false,
            main: true,
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
                            <Paper>
                                <div>
                                    <p className="_heading" style={{ backgroundColor: "#119cf5" }}>
                                        <div className="_upersection">
                                            Here you can Add your Class
                                            </div>
                                    </p>
                                    <div className="_instructionDiv">
                                        <TextField
                                            label="Entery Class Name"
                                            id="outlined-margin-dense"
                                            margin="dense"
                                            variant="outlined"
                                            style={{ width: "100%" }}
                                            value={this.state.A}
                                            onChange={(e) =>
                                                this.setState({ className: e.target.value })
                                            }
                                        />

                                        <p style={{ textAlign: "center" }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                style={{backgroundColor: "#03a9f4",color:'white'}}
                                                className="quiz_instruction"
                                                onClick={() => this.AddClass()}
                                                disabled={className ? false : true}
                                            >
                                                CREATE Class
                                </Button>
                                        </p>
                                    </div>
                                </div>
                            </Paper></Grid></Grid>
                    
            </>
        );
    }
}
