import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Context, useAuth} from "./store";

import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from "./screens/Authorized/DashboardScreen";
import Error404 from "./screens/Error404";
import CreateVtcScreen from "./screens/Authorized/CreateVtcScreen";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import VtcScreen from "./screens/VtcScreen";

function PrivateRoute({component: Component, ...rest}) {
    const { authToken } = useAuth();

    return (
        <Route {...rest} render={props => (typeof authToken === "undefined" || authToken === "undefined") ? (
            <Redirect to={"/login"}/>
        ) : (<Component {...props}/>)} />
    )
}

function NoAuthOnlyRoute({component: Component, ...rest}) {
    const { authToken } = useAuth();

    return (
        <Route {...rest} render={props => (typeof authToken === "undefined" || authToken === null || authToken === "undefined" || authToken.length === 0) ? (<Component {...props}/>) : (<Redirect to={"/dashboard"}/>)}/>
    )
}

function AppRouter(props) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token" || ""));

    const setTokens = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    };

    const stripePromise = loadStripe('pk_test_7acZYoOvnypHUSj02xFRdvrT00sulWsCDO');

    return (
        <Context.Provider value={{authToken, setAuthToken: setTokens}}>
            <Elements stripe={stripePromise}>
                <Router>
                    <Switch>
                        <NoAuthOnlyRoute exact path="/" component={HomeScreen}/>
                        <NoAuthOnlyRoute exact path="/register" component={RegisterScreen}/>
                        <NoAuthOnlyRoute exact path="/login" component={LoginScreen}/>
                        <PrivateRoute component={DashboardScreen} exact path={"/dashboard"}/>
                        <PrivateRoute component={CreateVtcScreen} exact path={"/vtc/new"}/>
                        <Route component={VtcScreen} exact path={"/vtc/:vtc_id"}/>
                        <Route component={Error404} />
                    </Switch>
                </Router>
            </Elements>
        </Context.Provider>
    )
}

export default AppRouter;