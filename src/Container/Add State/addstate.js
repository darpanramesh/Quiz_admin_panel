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
let database = firebaseApp.database().ref("/");


export default class AddState extends React.Component {
    constructor() {
        super();
        this.state = {
            state1:false,
            state:''
        }
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

    }
    AddState = () =>{
    let { state } = this.state
    let database = firebaseApp.database().ref("/");
    let obj = {
        state: state
    }
    database.child("States/").push(obj);
    this.props.history.push("/");    
    }
    render() {
        let { state1,notification } = this.state
        return (
            <div>
                <Navbar props={this.props.history} notification={notification} />
                <Grid container justify="center" className="_grid">
                    <Grid item xs={11} sm={10} md={6} lg={6}>
                        <Paper>
                            <div>
                                <p className="_heading" style={{ backgroundColor: "#119cf5" }}>
                                    <div className="_upersection">
                                        Here you can Add your State
                                            </div>
                                </p>
                                <div className="_instructionDiv">
                                    <TextField
                                        label="Entery Class Name"
                                        id="outlined-margin-dense"
                                        margin="dense"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        value={this.state.state}
                                        onChange={(e) =>
                                            this.setState({ state: e.target.value,state1:true })
                                        }
                                    />

                                    <p style={{ textAlign: "center" }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="quiz_instruction"
                                            onClick={() => this.AddState()}
                                            disabled={state1 ? false : true}
                                        >
                                            CREATE State
                                </Button>
                                    </p>
                                </div>
                            </div>
                        </Paper></Grid></Grid>
            </div>
        )
    }
}