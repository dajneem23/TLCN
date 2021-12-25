import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/LoginPage/Login";
import SignUp from "./Component/SignupPage/SignUp";
import SignUpCoop from "./Component/SingupPageForCoop/SignUpCoop"
import NotFound404 from "./Component/404NotFound/index";
import Profile from "./Component/Profile/Profile";
import EditProFile from "./Component/Profile/EditProfile/EditProfile";
import Home from "./Component/Home/Home";
import Search from "./Component/Search/Search";
import CodeEditor from "./Component/CodeEditor/CodeEditor";
import Exercise from "./Component/CodeEditor/ExercisePage";
import JobsManagement from "./Component/JobsManager/JobManagementForAdmin";
import UserManagement from "./Component/UserManager/UserManager";
import ExerciseManager from "./Component/CodeEditor/ExerciseManager"
import PostNewJob from "./Component/PostNewJob/PostNewJob";
import JobDetail from "./Component/JobDetail/JobDetail";
import CreateCV from "./Component/CV/CreateCV";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Service/Auth.context";
import ChatBox from "./Component/Chatbox/ChatBox";
import "./index.css";
import UpdateJob from "./Component/JobsManager/UpdateJob"
import CreateExercise from "./Component/CodeEditor/CreateExercise";
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;


const App=()=> {

  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } = useContext(AuthContext);

  console.log(user);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" component={isAuthenticated ? Profile : SignUp} />
        <Route path="/signupcoop" component={isAuthenticated ? Profile : SignUpCoop} />
        <Route path="/signin" component={isAuthenticated ? Profile : Login} />
        <Route path="/profile" component={isAuthenticated ? Profile : Login} />
        <Route path="/createjob" component={user && user.role == ROLE_COOP ? PostNewJob : NotFound404} />
        <Route path="/editprofile" component={isAuthenticated ? EditProFile : Login} />
        <Route path="/job/update/:id" component={isAuthenticated && (user.role == ROLE_ADMIN || user.role == ROLE_COOP) ? UpdateJob : NotFound404} />
        <Route path="/job/:id" component={JobDetail} />
        <Route path="/job" component={Search} />
        <Route path="/createexercise" component={isAuthenticated ? CreateExercise : Login} />
        <Route path="/code/:id" component={isAuthenticated ? CodeEditor : Login} />
        <Route path="/exercise" component={Exercise} />
        <Route path="/exercisemanager" component={isAuthenticated && user.role == ROLE_ADMIN ? ExerciseManager : NotFound404} />
        <Route path="/createcv" component={isAuthenticated ? CreateCV : Login} />
        <Route path="/chatbox/:id" component={isAuthenticated ? ChatBox : Login} />
        <Route path="/home" component={Home} />
        <Route path="/jobsmanager" component={(user && user.role == ROLE_ADMIN || user && user.role == ROLE_COOP) ? JobsManagement : NotFound404} />
        <Route path="/usersmanager" component={(user && user.role == ROLE_ADMIN) ? UserManagement : NotFound404} />
        <Route path="*" component={NotFound404} />
        <Route path="/"  component={Home} />
        <Route component={NotFound404} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
