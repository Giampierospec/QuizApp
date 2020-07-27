import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import _ from 'lodash';
import LoginForm from './LoginForm';
import {loginUser, fetchUser} from '../../actions';
class Login extends Component {
     async componentDidMount(){
         await this.props.fetchUser();
        if(!_.isEmpty(this.props.auth))
            this.props.history.push('/');

    }
    submitLogin = (values) => {
       this.props.loginUser(values,this.props.history);
    }
    render(){
        return (<div className="margin-from-top">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title"> Login</h4>
                        </div>
                        <div className="card-body">
                            <LoginForm submitForm={this.submitLogin} btn="Login"/>
                            <Link className="text-center" to="/register">No tiene cuenta, cree una aqui</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
const mapStateToProps = ({auth})=>({auth});
export default connect(mapStateToProps,{loginUser, fetchUser})(withRouter(Login));
