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
import Detail from './Quiz/Detail';
import QuizFill from './QuizFill/QuizFill';
import GetFilledQuizzes from './QuizFill/GetFilledQuizzes';
import FilledQuizDetail from './QuizFill/FilledQuizDetail';
import Edit from './Quiz/Edit';
import Statistics from './Stats/Statistics';
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
                    <PrivateRoute path="/quizFill" exact>
                        <QuizFill/>
                    </PrivateRoute>
                    <PrivateRoute path="/filled" exact>
                        <GetFilledQuizzes/>
                    </PrivateRoute>
                    <PrivateRoute path="/filled/:id">
                        <FilledQuizDetail/>
                    </PrivateRoute>
                    <AdminRoute path="/create">
                        <Create/>
                    </AdminRoute>   
                    <AdminRoute path="/edit/:id">
                        <Edit/>
                    </AdminRoute>
                    <AdminRoute path="/quiz" exact>
                        <Quiz/>
                    </AdminRoute>
                    <AdminRoute path="/quiz/:id">
                        <Detail/>
                    </AdminRoute>
                    <AdminRoute path="/stats">
                        <Statistics/>
                    </AdminRoute>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register}/>
                </Switch>
            </CSSTransition>

        </TransitionGroup>
    )
});

export default Paths;