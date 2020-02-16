import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import Navigation from './components/Navigation'
import RegisterScreen from './screens/RegisterScreen'

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/register" component={RegisterScreen} />
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;