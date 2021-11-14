import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Header from "./Component/Header/index";
import Footer from "./Component/Footer/index";
import Login from "./Component/LoginPage/Login";
import SignUp from "./Component/SignupPage/SignUp";
import NotFound404 from "./Component/404NotFound/index";
import Profile from './Component/Profile/index';
import EditProFile from './Component/Profile/EditProfile/index';
import logo from './logo.svg';
import Home from './Component/Home/Home';
import CodeEditor from './Component/CodeEditor/CodeEditor';
import Exercise from "./Component/CodeEditor/ExercisePage";
import PostNewJob from "./Component/PostNewJob/index";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/createjob" component={PostNewJob} />
        <Route path="/editprofile" component={EditProFile} />
        <Route path="/exercise" component={Exercise}/>
        <Route path="/code" component={CodeEditor}/>
        <Route path="/home" component={Home} />
        <Route path="/" component={Home} />
        <Route component={NotFound404} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
