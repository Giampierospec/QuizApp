import React, { Component } from 'react';

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
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing;