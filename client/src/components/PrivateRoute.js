import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
class PrivateRoute extends Component {
    render() {
        const { path, children, auth, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={() =>
                    !_.isEmpty(auth) ? (children) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: path }
                        }} />
                    )
                }
            />
        );
    }
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PrivateRoute);