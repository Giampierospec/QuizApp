import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import LoginField from './LoginField';

class LoginForm extends Component{
    renderFields(){
        return [
            <Field
            key="0"
            name="email"
            label="Email"
            icon={faEnvelope}
            component={LoginField}
            type="email"
            />,
            <Field
                key="1"
                name="password"
                label="Password"
                type="password"
                icon={faLock}
                component={LoginField}
            />

        ]
    }
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.props.submitForm)}>
                {this.renderFields()}
                <button className="btn btn-primary offset-sm-2" type="submit"> Login</button>
            </form>
        )
    }
}

export default reduxForm({
    form:'loginForm'
})(LoginForm);