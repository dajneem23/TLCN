import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Component/Header/index';
import Footer from './Component/Footer/index';
import Login from './Component/LoginPage/Login'
import SignUp from './Component/SignupPage/SignUp';

function App() {
  return (
    <Router>
        <Header/>
        <Switch>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={Login}/>
          </Switch>
      <Footer/>
    </Router>
    // <Router>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //       <Route path="/signup">
    //         <SignUp/>
    //       </Route>
    //       <Route path="/footer">
    //         <Footer/>
    //       </Route>
    // </Router>
  );
}

export default App;
