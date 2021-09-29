import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Footer from './Component/Footer/index';
import Login from './Component/LoginPage/Login'
import SignUp from './Component/SignupPage/SingUp';

function App() {
  return (
    <Router>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/footer">
            <Footer/>
          </Route>
    </Router>
  );
}

export default App;
