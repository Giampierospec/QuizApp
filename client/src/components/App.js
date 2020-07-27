import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './Header';
import Paths from './Paths';

class App extends Component{
    render(){
        return(
            <div className="container-fluid">
                <BrowserRouter>
                    <Header/>
                   <Paths/>
                </BrowserRouter>
                <br/>
            </div>
        )
    }

}
export default App;