import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Header from "./Component/Header/index";
import Footer from "./Component/Footer/index";
import Login from "./Component/LoginPage/Login";
import SignUp from "./Component/SignupPage/SignUp";
import SignUpCoop from "./Component/SingupPageForCoop/SignUpCoop"
import NotFound404 from "./Component/404NotFound/index";
import Profile from "./Component/Profile/index";
import EditProFile from "./Component/Profile/EditProfile/index";
import Home from "./Component/Home/Home";
import Search from "./Component/Search/index";
import CodeEditor from "./Component/CodeEditor/CodeEditor";
import Exercise from "./Component/CodeEditor/ExercisePage";
import JobsManagement from "./Component/JobsManager/JobManagementForAdmin";
import UserManagement from "./Component/UserManager/index"
import PostNewJob from "./Component/PostNewJob/index";
import JobDetail from "./Component/JobDetail/index";
import CreateCV from "./Component/CV/CreateCV";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Service/Auth.context";
import ChatBox from "./Component/Chatbox/ChatBox";

import UpdateJob from "./Component/JobsManager/UpdateJob"
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;


function App() {

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
        <Route path="/job/update/:id" component={UpdateJob} />
        <Route path="/job/:id" component={JobDetail} />
        <Route path="/job" component={Search} />
        <Route path="/exercise" component={Exercise} />
        <Route path="/code/:id" component={CodeEditor} />
        <Route path="/createcv" component={isAuthenticated ? CreateCV : Login} />
        <Route path="/chatbox/:id" component={isAuthenticated ? ChatBox : Login} />
        <Route path="/home" component={Home} />
        <Route path="/jobsmanager" component={(user && user.role == ROLE_ADMIN || user && user.role == ROLE_COOP) ? JobsManagement : NotFound404} />
        <Route path="/usersmanager" component={UserManagement} />
        <Route path="/" component={Home} />
        <Route component={NotFound404} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
