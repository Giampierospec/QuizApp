import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Landing from './Landing';
import Login from './Login/Login';
import Register from './Login/Register';
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import AdminRoute from './AdminRoute';
import Create from './Quiz/Create';
import Quiz from './Quiz/Quiz';
const Paths = withRouter(({location})=>{
    return(
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="routes"
                timeout={300}
            >
                <Switch location={location}>
                    <PrivateRoute path="/" exact>
                        <Landing />
                    </PrivateRoute>
                    <AdminRoute path="/create">
                        <Create/>
                    </AdminRoute>   
                    <AdminRoute path="/quiz">
                        <Quiz/>
                    </AdminRoute>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register}/>
                </Switch>
            </CSSTransition>

        </TransitionGroup>
    )
});

export default Paths;