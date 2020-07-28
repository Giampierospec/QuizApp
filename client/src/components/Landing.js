import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
class Landing extends Component{
    render(){
        return(
            <div className="row margin-from-top">
                <div className="col-sm-8 offset-sm-2">
                    <div className="card text-center">
                        <div className="card-body">
                           <h4 className="card-title"> Welcome!</h4>
                            <hr/>
                            <p className="card-text">
                                This App is a practice to Make some dynamic quizzes and answering them
                            </p>
                        </div>
                        <div className="card-footer">
                            <Link disabled={this.props.auth.role !== 'admin'} to='/create' className="btn btn-primary">create Quiz</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({auth})=> ({auth});
export default connect(mapStateToProps)(Landing);