import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import "./MultipleChoice.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default class MultipleChoice extends React.Component {
  constructor() {
    super();
    this.state = {
      A: "",
      B: "",
      C: "",
      D: "",
      correct: "",
      question: "",
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
    let { A, B, C, D, correct, question } = this.state;
    let selectedQ = {
      question: this.state.question,
      options: [A, B, C, D],
      correct: correct,
    };
    return (
      <>
        <TextField
          label="Option A"
          id="outlined-margin-dense"
          margin="dense"
          variant="outlined"
          style={{ width: "100%" }}
          value={this.state.A}
          onChange={(e) => this.setState({ A: e.target.value })}
        />
        <br />
        <TextField
          label="Option B"
          id="outlined-margin-dense"
          margin="dense"
          variant="outlined"
          style={{ width: "100%" }}
          value={this.state.B}
          onChange={(e) => this.setState({ B: e.target.value })}
        />
        <br />
        <TextField
          label="Option C"
          id="outlined-margin-dense"
          margin="dense"
          variant="outlined"
          style={{ width: "100%" }}
          value={this.state.C}
          onChange={(e) => this.setState({ C: e.target.value })}
        />
        <br />
        <TextField
          label="Option D"
          id="outlined-margin-dense"
          margin="dense"
          variant="outlined"
          style={{ width: "100%" }}
          value={this.state.D}
          onChange={(e) => this.setState({ D: e.target.value })}
        />
        <br />
        <FormControl component="fieldset">
          <b style={{ paddingTop: 10 }}>Select Correct Answer</b>
          <RadioGroup row aria-label="position" name="position">
            <FormControlLabel
              value="Option A"
              control={
                <Radio
                  color="primary"
                  name="correct"
                  value={this.state.A}
                  onChange={this.handleChange}
                />
              }
              label={"Option A"}
            />

            <FormControlLabel
              value="Option B"
              control={
                <Radio
                  color="primary"
                  name="correct"
                  value={this.state.B}
                  onChange={this.handleChange}
                />
              }
              label={"Option B"}
            />

            <FormControlLabel
              value="Option C"
              control={
                <Radio
                  color="primary"
                  name="correct"
                  value={this.state.C}
                  onChange={this.handleChange}
                />
              }
              label={"Option C"}
            />

            <FormControlLabel
              value="Option D"
              control={
                <Radio
                  color="primary"
                  name="correct"
                  value={this.state.D}
                  onChange={this.handleChange}
                />
              }
              label={"Option D"}
            />
          </RadioGroup>
        </FormControl>
        {A && B && C && D && correct ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.setState({
                A: "",
                B: "",
                C: "",
                D: "",
                correct: "",
                
                // checked:true
              });
              this.props.onclick(selectedQ);
            }}
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="outlined"
            disabled
            color="primary"
            // disabled
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        )}
      </>
    );
  }
}
