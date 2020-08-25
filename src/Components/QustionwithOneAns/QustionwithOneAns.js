import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import "./QustionwithOneAns.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default class QustionwithOneAns extends React.Component {
 
  render() {
    let getProps = this.props.getProps;
    let selectedQ ={
      category:"Question with one answer"
    }
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.onclick(selectedQ);
          }}
          style={{ width: "100%", backgroundColor: "darkcyan" }}
        >
          Submit
        </Button>
      </>
    );
  }
}
