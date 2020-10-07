import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class SuperUserRoute extends Component {
    render() {
        const { path, children, auth, ...rest } = this.props;
        return (
            <Route
                {...rest}
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