import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {createUser} from '../../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Register  extends Component{
    submitRegister = (values)=>{
        this.props.createUser(values,this.props.history);
    }
    render(){
        return (<div className="margin-from-top">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title"> Register</h4>
                        </div>
                        <div className="card-body">
                            <LoginForm submitForm={this.submitRegister} btn="register"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default connect(null,{createUser})(withRouter(Register));