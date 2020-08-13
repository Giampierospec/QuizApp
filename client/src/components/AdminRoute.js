import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';
class AdminRoute extends Component{
    async componentDidMount(){
        await this.props.fetchUser();
    }
    render(){
        const {path,children,auth} = this.props;
        return(
            <Route
            path={path}
            render={()=>
                ((auth.role === 'admin'))
                ?(children):(
                    <Redirect to={
                        {
                            pathname:'/login',
                            state:{from:path}
                        }
                    }/>
                )
            }
            />
        )
    }
    

}

const mapStateToProps = ({auth})=>({auth});

export default connect(mapStateToProps,{fetchUser})(AdminRoute);