import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../actions';
import _ from 'lodash';
class Header extends Component {
    logout = () => {
        this.props.logoutUser();
    }
    renderIfLogged = () => {
        if (!_.isEmpty(this.props.auth)) {
            const authArray = [];
            if (this.props.auth.role === 'admin')
                authArray.push(<Link to="/quiz" key="0" className="nav-item nav-link"><FontAwesomeIcon icon={faQuestionCircle} /> Quiz</Link>);

            return authArray.concat([
                <button key={1} className="btn btn-primary" onClick={this.logout}>Logout</button>,
                <Link key={2} className="nav-item nav-link" to="/quizFill"> Fill Quiz</Link>,
            <span key={3}className="navbar-text float-right"><FontAwesomeIcon icon={faUser}/> {this.props.auth.name}</span>
            ]);

        }
        else
            return [
                <Link to="/login" className="nav-item nav-link" key="3">Login</Link>
            ];
    }
    render() {
        return (<div>
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
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUser })(Header);