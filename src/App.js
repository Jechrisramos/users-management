import React, { Fragment, useState } from "react";
import "./App.css";
import "./Responsive.css";

//routing
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

//bootstrap
import { Container } from "react-bootstrap";

import UserContext from "./UserContext";

//components
import Header from "./components/partials/Header.js";
import Footer from "./components/partials/Footer.js";

//pages
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import NoFound from "./pages/NoFound";

function App() {
  
  //variables

  //useStates
  const [ user, setUser ] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com"
  });

  //functions

  return (
    <Fragment>
      <UserContext.Provider value={{ user }}>
        <Router>
          <Header />
          <Container fluid>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:userId" component={Profile} />
              <Route component={NoFound} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </UserContext.Provider>
    </Fragment>
  ); //end of return
} //end of App()

export default App;
