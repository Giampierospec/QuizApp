import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACCEPTED } from '../utils/acceptRoles';
class AdminRoute extends Component {
    render() {
        const { path, children, auth, exact } = this.props;
        return (
            <Route
                path={path}
                exact={exact}
                render={() =>
                    ((ACCEPTED.some(role => role === auth.role)))
                        ? (children) : (
                            <Redirect to={
                                {
                                    pathname: '/',
                                    state: { from: path }
                                }
                            } />
                        )
                }
            />
        )
    }


}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AdminRoute);