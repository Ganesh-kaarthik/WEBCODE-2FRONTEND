import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import ViewQuestion from "./pages/ViewQuestion";
import TagResults from  "./components/Header";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "./context/CommonContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import"./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useState } from "react";
import SearchResults from "./pages/SearchResults";
import Tags from "./pages/Tags";
import PrivateRoute from "./components/PrivateRoute";
import CreateQuestion from "./pages/CreateQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import UpdateProfile from "./pages/UpdateProfile";
import ResetPassword from "./pages/ResetPassword";

function App() {

  axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

  const [isLoggedIn, SetIsLoggedIn] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  return <div className="App">

    <ToastContainer
      position="top-right"
    />

    <CommonContext.Provider value={{ isLoggedIn, SetIsLoggedIn, isLoading, setIsLoading }}>

      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact ><Redirect to="/" /></Route>

          <Route path="/questions" exact component={Questions} />
          <PrivateRoute path="/questions/ask" exact component={CreateQuestion} />
          <PrivateRoute path="/questions/update/:id" exact component={UpdateQuestion} />
          <Route path="/questions/:id" exact render={() => <ViewQuestion isLoggedIn={isLoggedIn} />} />


          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/profile/edit" exact component={UpdateProfile} />

          <Route path="/tags" exact component={Tags} />

          <Route path="/tags/:tag" exact component={TagResults} />
          <Route path="/search/:keyword" exact component={SearchResults} />

          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/resetpassword/:jwt" exact component={ResetPassword} />

        </Switch>
      </BrowserRouter>
    </CommonContext.Provider>

  </div>
}

export default App;

