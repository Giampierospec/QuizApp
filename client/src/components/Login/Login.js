import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import _ from 'lodash';
import LoginForm from './LoginForm';
import {loginUser, fetchUser} from '../../actions';
import Loading from '../Loading';
class Login extends Component {
    state ={loading:false}
     async componentDidMount(){
         this.setState({loading:true});
         await this.props.fetchUser();
         this.setState({loading:false});
        if(!_.isEmpty(this.props.auth))
            this.props.history.push('/');

    }
    submitLogin = (values) => {
       this.props.loginUser(values,this.props.history);
    }
    renderContent = ()=>{
        return (<div className="margin-from-top">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title"> Login</h4>
                        </div>
                        <div className="card-body">
                            <LoginForm submitForm={this.submitLogin} btn="Login" />
                            <div className="row">
                                <div className="col-sm-8 offset-sm-2">
                                    <Link className="text-center" to="/register"> Don't have an account, click here!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
    render(){
       if(this.state.loading)
            return <Loading msg="Loading please wait..."/>
        else
            return this.renderContent()
    }
}
const mapStateToProps = ({auth})=>({auth});
export default connect(mapStateToProps,{loginUser, fetchUser})(withRouter(Login));

