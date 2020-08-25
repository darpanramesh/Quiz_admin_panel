import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import "./Blanks.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default class Blanks extends React.Component {
  constructor() {
    super();
    this.state = {
      A: "",
      B: "",
      C: "",
      D: "",
      correct_a: "",
      correct_b: "",
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };
  render() {
    let getProps = this.props.getProps;
    let { question, A, B, C, D, correct_a, correct_b } = this.state;
    let selectedQ = {
      category: "blank",
      options: [A, B, C, D],
      correct_a: correct_a,
      correct_b: correct_b,
    };
    console.log(this.state);
    return (
     <>
         
            <span className="_note_point">
              Note:if you want to create blank then draw (_______) where you
              want to add.
            </span>

          
            <TextField
              label="hint A"
              id="outlined-margin-dense"
              margin="dense"
              variant="outlined"
              value={this.state.A}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ A: e.target.value })}
            />
            <br />
            <TextField
              label="hint B"
              id="outlined-margin-dense"
              margin="dense"
              variant="outlined"
              value={this.state.B}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ B: e.target.value })}
            />
            <br />
            <TextField
              label="hint C"
              id="outlined-margin-dense"
              margin="dense"
              variant="outlined"
              value={this.state.C}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ C: e.target.value })}
            />
            <br />
            <TextField
              label="hint D"
              id="outlined-margin-dense"
              margin="dense"
              variant="outlined"
              value={this.state.D}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ D: e.target.value })}
            />
            <br />
            <FormControl component="fieldset">
              <b style={{ paddingTop: 10 }}>Select Correct Blank</b>
              <br />
              <b>Blank A:</b>

              <hr />
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  value="Hint A"
                  control={
                    <Radio
                      color="primary"
                      name="correct_a"
                      value="A"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint A"}
                />

                <FormControlLabel
                  value="Hint B"
                  control={
                    <Radio
                      color="primary"
                      name="correct_a"
                      value="B"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint B"}
                />

                <FormControlLabel
                  value="Hint C"
                  control={
                    <Radio
                      color="primary"
                      name="correct_a"
                      value="C"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint C"}
                />

                <FormControlLabel
                  value="Hint D"
                  control={
                    <Radio
                      color="primary"
                      name="correct_a"
                      value="D"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint D"}
                />
              </RadioGroup>

              <b>Blank B:</b>
              <hr />
              <RadioGroup row aria-label="position" name="position">
                <FormControlLabel
                  value="Hint A"
                  control={
                    <Radio
                      color="primary"
                      name="correct_b"
                      value="A"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint A"}
                />

                <FormControlLabel
                  value="Hint B"
                  control={
                    <Radio
                      color="primary"
                      name="correct_b"
                      value="B"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint B"}
                />

                <FormControlLabel
                  value="Hint C"
                  control={
                    <Radio
                      color="primary"
                      name="correct_b"
                      value="C"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint C"}
                />

                <FormControlLabel
                  value="Hint D"
                  control={
                    <Radio
                      color="primary"
                      name="correct_b"
                      value="D"
                      onChange={this.handleChange}
                    />
                  }
                  label={"Hint D"}
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <br />
            {A && B && C && D && correct_a && correct_b ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    A: "",
                    B: "",
                    C: "",
                    D: "",
                    correct_a: "",
                    correct_b: "",
                  });
                  this.props.onclick(selectedQ);
                }}
                style={{ width: "100%", backgroundColor: "darkcyan" }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                color="primary"
                disabled
                style={{ width: "100%", backgroundColor: "darkcyan" }}
              >
                Submit
              </Button>
            )}
        </>

    );
  }
}
