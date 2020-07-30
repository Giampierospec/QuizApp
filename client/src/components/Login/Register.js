import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {createUser} from '../../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from '../Loading';

class Register  extends Component{
    state = {loading:false}
    submitRegister = async (values)=>{
        this.setState({loading:true});
        await this.props.createUser(values,this.props.history);
        this.setState({loading:false});
    }
    renderContent(){
        return (<div className="margin-from-top">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title"> Register</h4>
                        </div>
                        <div className="card-body">
                            <LoginForm submitForm={this.submitRegister} btn="register" register={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
    render(){
        if(this.state.loading)
            return <Loading msg="Registering user please wait"/>;
        else
            return this.renderContent();
    }
}

export default connect(null,{createUser})(withRouter(Register));