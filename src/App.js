import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router-dom";
import logger from "./services/logService";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import GenreForm from "./components/genreForm";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

logger.init();

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <React.Fragment>
          <ToastContainer />
          <NavBar user={user} />
          <main className="container">
            <Switch>
              <Route path="/login" component={LoginForm}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/register" component={RegisterForm}></Route>
              <ProtectedRoute path="/genres/new" component={GenreForm} />
              <ProtectedRoute path="/movies/new" component={MovieForm} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <ProtectedRoute path="/movies" component={Movies} />
              <ProtectedRoute path="/customers" component={Customers} />
              <ProtectedRoute path="/rentals" component={Rentals} />
              <ProtectedRoute path="/profile" component={Profile} />
              <Route path="/not-found" component={NotFound}></Route>
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
