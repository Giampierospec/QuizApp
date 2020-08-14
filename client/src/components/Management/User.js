import React, { Component } from 'react';
import { getStat } from '../../utils/statUtil';
import { reduxForm, Field } from 'redux-form';
import SelectField from './SelectField';
import { faUserEdit, faDice } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';
import { ROLES, putData } from '../../utils/manage.util';
import { withRouter } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);
        this.options = [];
        this.state = {
            loading: true
        }
    }
    renderField(options) {
        return <Field
            {...options}
            component={options.component}
        />
    }
    async componentDidMount() {
        const { data } = await getStat('/api/manage');
        this.options = data;
        this.setState({ loading: false });
        console.log(this.options);
    }
    submitForm = async (values) => {
        this.setState({ loading: true });
        await putData('/api/manage', values, this.props.history);
        this.setState({ loading: false });
    }
    renderContent = () => {
        return (<div className="margin-from-top">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <form onSubmit={this.props.handleSubmit(this.submitForm)}>
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <h4 className="card-title text-center">Change Role</h4>
                            </div>
                            <div className="card-body">
                                {this.renderField({
                                    name: 'idUser',
                                    component: SelectField,
                                    label: 'Choose User',
                                    icon: faUserEdit,
                                    options: this.options,
                                    msg: 'Select an Email',
                                    keyValue: {
                                        value: '_id',
                                        text: 'email'
                                    },
                                    defaultValue: ""
                                })}
                                {this.renderField({
                                    name: 'role',
                                    component: SelectField,
                                    label: 'Pick a role',
                                    icon: faDice,
                                    options: ROLES,
                                    msg: 'Select a Role',
                                    keyValue: {
                                        value: 'role',
                                        text: 'role'
                                    },
                                    defaultValue: ""
                                })}
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading users please wait" />;
        else
            return this.renderContent();
    }
}
const validate = (values) => {
    const errors = {};
    if (!values['idUser'])
        errors['idUser'] = 'Please pick an User';
    if (!values['role'])
        errors['role'] = 'Please pick a Role';
    return errors;
}
export default reduxForm({
    form: 'userManagement',
    enableReinitialize: true,
    validate
})(withRouter(User));