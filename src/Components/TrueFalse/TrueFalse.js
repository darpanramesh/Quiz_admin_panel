import React from "react";
import "./TrueFalse.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
export default class TrueFalse extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      A: "True",
      B: "False",
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

    console.log(this.state);
    let { question, A, B, correct } = this.state;
    let selectedQ = {
      category: "True/False",
      question: this.state.question,
      options: [A, B],
      correct: correct,
    };

    return (
      <>
       
            
              {/* <FormControl variant="outlined" className="_slelect">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Option A
                </InputLabel>
                <Select
                  native
                  onChange={this.handleChange}
                  value={this.state.A}
                  label="Option A"
                  className="_slelect"
                  inputProps={{
                    name: "A",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Select>
              </FormControl> */}
              <br />
              {/* <FormControl variant="outlined" className="_slelect">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Option B
                </InputLabel>
                <Select
                  value={this.state.B}
                  native
                  onChange={this.handleChange}
                  label="Option A"
                  inputProps={{
                    name: "B",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Select>
              </FormControl> */}

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
                    label={"True"}
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
                    label={"False"}
                  />
                </RadioGroup>
              </FormControl>
              <br />

              <br />
              <br />
              {A && B && correct ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.onclick(selectedQ);
                    this.setState({
                      A: "",
                      B: "",
                      question: "",
                    });
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
                  disabled={question && A && B ? true : false}
                  style={{ width: "100%", backgroundColor: "darkcyan" }}
                >
                  Submit
                </Button>
              )}
          
      </>
    );
  }
}
