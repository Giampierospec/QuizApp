import React, { Component } from 'react';
import FilledQuizStats from './FilledQuizStats';
import FilledQuestionStats from './FilledQuestionStats';
import UserRolesStats from './UserRolesStats';


class Statistics extends Component {
    render() {
        return (
            <div className="margin-from-top">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <h4 className="card-title text-center">General Stats for Filled Quizzes</h4>
                            </div>
                            <div className="card-body">
                                <FilledQuizStats />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <h4 className="card-title text-center">Stats by Quiz and Questions</h4>
                            </div>
                            <div className="card-body">
                                <FilledQuestionStats />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <h4 className="card-title text-center">Stats by Role</h4>
                            </div>
                            <div className="card-body">
                                <UserRolesStats />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Statistics;