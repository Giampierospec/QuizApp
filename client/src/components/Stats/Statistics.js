import React, {Component} from 'react';
import FilledQuizStats from './FilledQuizStats';


class Statistics extends Component{
    render(){
        return (
        <div className="margin-from-top">
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title text-center">Quiz Fill Stats</h4>
                        </div>
                        <div className="card-body">
                            <FilledQuizStats/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Statistics;