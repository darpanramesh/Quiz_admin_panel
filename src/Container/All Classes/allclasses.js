import React from "react";
import Button from "@material-ui/core/Button";
import Navbar from "./../../Components/Navbar/Appbar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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





const classes = makeStyles({
    table: {
        minWidth: 500,
    },
});


export default class AllClasses extends React.Component {
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
    updateClass = (data, i) => {
        let { allclasses } = this.state;
        console.log(data, i, allclasses)
        allclasses[i].disable = true;
        this.setState({ allclasses: allclasses });
        let obj = {

        }
        // database.child(`Classes/${data.id}`).update(obj);
    }
    render() {
        let { quizName, main, allclasses, className, notification, instruction, classCategory, category, selectClass } = this.state;
        console.log(allclasses);
        return (
            <>
                <Navbar props={this.props.history} notification={notification} />

                <TableContainer style={{ width:'80%',margin:'auto',marginTop: 20, }} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{padding:'5px'}}>
                                <TableCell style={{fontSize:'1.5em',textAlign:'center',fontWeight:300}}>Class Name</TableCell>
                                <TableCell style={{fontSize:'1.5em',textAlign:'center',fontWeight:300}} align="right">Edit</TableCell>
                                <TableCell style={{fontSize:'1.5em',textAlign:'center',fontWeight:300}} align="right">Delete</TableCell>
                                <TableCell style={{fontSize:'1.5em',textAlign:'center',fontWeight:300}} align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allclasses.map((row, i) => (
                                <TableRow style={{padding:'0px'}} key={row.class}>
                                    <TableCell component="th" scope="row">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                allclasses[i].class = e.target.value;
                                                console.log(allclasses);
                                                this.setState({ allclasses: allclasses });
                                            }}
                                            style={{
                                                fontSize: "1.2em",
                                                border: "none",
                                                backgroundColor: "#e9ecef",
                                            }}
                                            disabled={row.disable}
                                            value={row.class}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign:'center'}}>
                                        {row.disable ?
                                            <Button onClick={() => {
                                                allclasses[i].disable = false;
                                                this.setState({ allclasses: allclasses });
                                            }}
                                                variant="contained" style={{width:'50px',height:'30px',fontSize:'10px',textAlign:'center'}} color="primary">
                                                Edit
                                        </Button>
                                            :
                                            <Button onClick={() => {
                                                allclasses[i].disable = true;
                                                this.setState({ allclasses: allclasses });
                                                console.log(row)
                                                database.child(`Classes/${row.id}`).update(row);
                                            }} variant="contained" color="primary" style={{width:'50px',height:'30px',fontSize:'10px',textAlign:'center'}}>
                                                Update
                                        </Button>
                                        }
                                    </TableCell>
                                    <TableCell style={{textAlign:'center'}}>
                                        <Button onClick={()=>{
                                            database.child(`Classes/${row.id}`).remove()
                                            .then(allclasses.splice(i, 1));
                                            this.setState({ allclasses: allclasses });
                                        }} variant="contained" color="secondary" style={{width:'50px',height:'30px',fontSize:'10px',textAlign:'center'}}>
                                            Delete
                                    </Button>
                                    </TableCell>
                                    <TableCell style={{textAlign:'center'}}>
                                    {row.status === 'active' ?
                                            <Button onClick={() => {
                                                allclasses[i].status = 'unActive';
                                                this.setState({ allclasses: allclasses });
                                                console.log(row)
                                                database.child(`Classes/${row.id}`).update(row);
                                            }} variant="contained" style={{backgroundColor:'#8bc34a',width:'50px',height:'30px',fontSize:'10px',textAlign:'center'}}>
                                                Active
                                        </Button>
                                            :
                                            <Button onClick={() => {
                                                allclasses[i].status = 'active';
                                                this.setState({ allclasses: allclasses });
                                                console.log(row)
                                                database.child(`Classes/${row.id}`).update(row);
                                            }}variant="contained" style={{width:'50px',height:'30px',fontSize:'10px',textAlign:'center'}}>
                                                UnActive
                                        </Button>
                                        }
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}
