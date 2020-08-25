import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Login,
  Category,
  CreateTest,
  ForgotPassword,
  CreateQuestion,
  Instruction,
  AttemptedQuiz,
  AddQuestion,
  AddClass,
  AddSubject,
  AddState,
  CategoryClass,
  AddCategory,
  AddChapter,
  ChapterSubject
} from "./../../Container";
// import { StudentLogin, StudentSignup,RenderQuiz,QuizSelected, QuizRoom,QuizTaken } from './../../Student Access/Container'

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/category" component={Category} />
          {/* <Route  path="/addQues" component={AddQues} /> */}
          <Route path="/createquestion" component={CreateQuestion }/>
          <Route path="/createdTest" component={CreateTest} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/instruction" component={Instruction }/>
          <Route path="/attemptedquiz" component={AttemptedQuiz }/>
          <Route path="/AddQuestion" component={AddQuestion }/>
          <Route path="/AddClass" component={AddClass }/>
          <Route path="/AddSubject" component={AddSubject }/>
          <Route path="/AddState" component={AddState} />
          <Route path="/AddCategory" component={AddCategory} />
          <Route path="/ClassCategory" component={CategoryClass} />
          <Route path="/AddChapter" component={AddChapter} />
          <Route path="/ChapterSubject" component={ChapterSubject} />




        </div>
      </Router>
    );
  }
}
