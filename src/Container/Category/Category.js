import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import firebaseApp from "../../Config/Firebase/Firebase";
import "./Category.css";
import AppBar from "../../Components/Appbar/Appbar";
let database = firebaseApp.database().ref("/");
export default class CheckboxLabels extends React.Component {
  constructor() {
    super();
    this.state = {
      checkboxArray: [
        { name: "Multiple Choice", check: false, disable: false },
        { name: "True/False", check: false, disable: false },
        { name: "One Answer", check: false, disable: false },
        { name: "Fill in the blanks", check: false, disable: false },
        { name: "Matching", check: false, disable: false },
        { name: "Open Answer", check: false, disable: false },
      ],
      checked: [],
    };
  }
  handleChange = (event, i) => {
    console.log(event.target.name);
    let { checkboxArray, checked } = this.state;
    let flag = true;

    if (true) {
      for (var k = 0; k < checked.length; k++) {
        if (checked[k] === event.target.name) {
          flag = false;
          console.log(checked[k], event.target.name, k);
          checked.splice(k, k + 1);
          console.log(checked);
          this.setState({
            checked: checked,
          });
        }
      }
      if (!flag) {
        for (var l = 0; l < checkboxArray.length; l++) {
          checkboxArray[l].disable = false;
          this.setState({
            checkboxArray: checkboxArray,
          });
        }
      }
    }
    if (flag) {
      if (checked.length === 0) {
        console.log(checked);
        checked.push(event.target.name);
        this.setState({
          checked: checked,
        });
      } else if (checked.length === 1) {
        console.log(checked);

        checked.push(event.target.name);
        for (var j = 0; j < checkboxArray.length; j++) {
          if (
            checked[0] !== checkboxArray[j].name &&
            checked[1] !== checkboxArray[j].name
          ) {
            checkboxArray[j].disable = true;
            this.setState({
              checkboxArray: checkboxArray,
              checked: checked,
            });
          }
        }
      }
    }
  };
  componentDidMount() {
    const uid = this.state.uid
    database.child("Users/" + uid).once("value", (res) => {
      let data = res.val();
      this.setState({ user: data });
      console.log(data);
    });


    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("currentuser", JSON.stringify(user.uid));
        this.setState({uid})
        console.log(user.email);
      } else {
        this.props.history.push("/")
      }
    });
  }













  submit = () => {};
  render() {
    let selectedCat = this.state.checked;
    console.log(selectedCat);
    return (
      <>
        <AppBar props={this.props.history} />
        <div className="main">
          {selectedCat
            ? selectedCat.map((val, i) => {
                return (
                  <Chip
                    size="small"
                    label={val}
                    key={i}
                    onClick={this.handleClick}
                    deleteIcon={<DoneIcon />}
                  />
                );
              })
            : ""}
          <FormGroup>
            {this.state.checkboxArray.map((v, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    disabled={v.disable}
                    name={v.name}
                    onChange={(e) => this.handleChange(e, i)}
                  />
                }
                label={v.name}
              />
            ))}

            <div style={{ textAlign: "center" }}>
              {this.state.checked.length === 2 ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/addQues",
                      state: {
                        category: this.state.checked,
                        userData: this.state.user,
                      },
                    })
                  }
                >
                  create quiz
                </Button>
              ) : (
                <Button disabled variant="outlined" color="primary">
                  create quiz
                </Button>
              )}
            </div>
          </FormGroup>
        </div>
      </>
    );
  }
}
