import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../actions'
import _ from 'lodash';
class PrivateRoute extends Component{

    async componentDidMount(){
       await this.props.fetchUser();
    }
    render(){
        const { path, children, auth} = this.props;
        return (
            <Route
                path={path}
                render={() =>
                    !_.isEmpty(auth) ? (children) : (
                        <Redirect to={{
                            pathname:'/login',
                            state:{from:path}
                        }} />
                    )
                }
            />
        );
    }
}


const mapStateToProps = ({auth})=>({auth});

export default connect(mapStateToProps,{fetchUser})(PrivateRoute);