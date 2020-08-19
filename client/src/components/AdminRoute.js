import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
class AdminRoute extends Component {
    async componentDidMount() {
        await this.props.fetchUser();
    }
    render() {
        const { path, children, auth, exact } = this.props;
        return (
            <Route
                path={path}
                exact={exact}
                render={() =>
                    ((auth.role === 'admin'))
                        ? (children) : (
                            <Redirect to={
                                {
                                    pathname: '/login',
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

export default connect(mapStateToProps, { fetchUser })(AdminRoute);