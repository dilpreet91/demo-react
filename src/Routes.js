import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import {
    Login,
    Home,
    NotFound
} from "./pages/index";

const fakeAuth = {
    isAuthenticated: false,
  }
  
    // for testing middleware sometime
    
    let homeScreenData = JSON.parse(JSON.parse(localStorage.getItem("user_token")));
  
    if (homeScreenData) {
      fakeAuth.isAuthenticated = true;
    }
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
    )} />
  )
  const AppRouter = () => (
    <BrowserRouter basename={process.env.REACT_APP_ROUTE_BASE_URL}>
      <Switch>
        {/*------------------- AUTH ROUTES ------------------------------*/}
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  
  export default AppRouter;
  