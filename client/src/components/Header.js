import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class Header extends Component{
    renderIfLogged = ()=>{
        if(this.props.auth){
            if(this.props.auth.role === 'admin')
                return [
                    <Link to="/createQuiz" key="0">create Quiz</Link>
                ];
            return [
                <Link to="/quiz" className="nav-item nav-link" key="1">Quiz</Link>
            ];
        }
        else
            return [
                <Link to="/login" className="nav-item nav-link" key="2">Login</Link>
            ];
    }
    render(){
        return(<div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">QuizApp</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {this.renderIfLogged()}
                    </div>
                </div>
            </nav>
        </div>);
    }
}
const mapStateToProps = ({auth})=> ({auth});

export default connect(mapStateToProps)(Header);