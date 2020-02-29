import React, {useReducer, useContext} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Context, reducer, initialState } from "./store";

import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from "./screens/Authorized/DashboardScreen";

function GuardedRoute(access_token) {
    return function ({component: Component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props => {
                    return !!access_token ? <Component {...props} /> : <Redirect to={"/login"}/>;
                }
                }
            />
        )
    }
}

function AppRouter() {
    const [store, dispatch] = useReducer(reducer, initialState);
    const access_token = store.access_token;
    console.log(access_token);
    const AuthenticatedRoute = GuardedRoute(access_token);
    return (
        <Context.Provider value={{store, dispatch}}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeScreen}/>
                    <Route exact path="/register" component={RegisterScreen}/>
                    <Route exact path="/login" component={LoginScreen}/>
                    <AuthenticatedRoute component={DashboardScreen} exact path={"/dashboard"}/>
                </Switch>
            </Router>
        </Context.Provider>
    )
}

export default AppRouter;