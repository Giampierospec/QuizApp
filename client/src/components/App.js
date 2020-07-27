import React,{Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Landing from './Landing';
import Login from './Login/Login'

class App extends Component{
    render(){
        return(
            <div className="container-fluid">
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <PrivateRoute path="/" exact>
                            <Landing/>
                        </PrivateRoute>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </BrowserRouter>
                <br/>
            </div>
        )
    }

}
export default App;