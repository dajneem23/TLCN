import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Header from "./Component/Header/index";
import Footer from "./Component/Footer/index";
import Login from "./Component/LoginPage/Login";
import SignUp from "./Component/SignupPage/SignUp";
import NotFound404 from "./Component/404NotFound/index";
import Profile from './Component/Profile/index';
import EditProFile from './Component/Profile/EditProfile/index';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/editprofile" component={EditProFile} />
        <Route component={NotFound404} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
