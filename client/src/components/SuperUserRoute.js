import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class SuperUserRoute extends Component {
    render() {
        const { path, children, auth, exact } = this.props;
        return (
            <Route
                path={path}
                exact={exact}
                render={() =>
                    ((auth.role === 'super'))
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

export default connect(mapStateToProps)(SuperUserRoute);