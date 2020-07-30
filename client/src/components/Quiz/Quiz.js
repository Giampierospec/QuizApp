import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizzes } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
class Quiz extends Component {
    state = { loading: true };
    async componentDidMount() {
        await this.props.getQuizzes();
        this.setState({ loading: false });
    }
    renderQuizzes = () => {
        return this.props.quiz.map(q => {
            return (<div className="row" key={q._id}>
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-header bg-secondary text-white text-center">
                            <h4 className="card-title">{q.title}</h4>
                        </div>
                        <div className="card-body">
                            <p className="card-text">No. of Questions: {q.questions?.length}</p>
                            <p className="card-text">Points: {q.totalPoints}</p>
                        </div>
                    </div>
                </div>
            </div>);
        })
    };
    render() {
        if (this.state.loading)
            return <Loading msg="Loading Quizzes please wait..." />
        else if (!this.props.quiz.length)
            return (
                <div className="set-middle">
                <h3>Nothing to show :(</h3>
                <Link to="/create"> Create a new quiz here!</Link>
            </div>);
        else
            return (
                <div className="margin-from-top">
                    {this.renderQuizzes()}
                </div>
            )
    }
}
const mapStateToProps = ({ quiz }) => ({ quiz });

export default connect(mapStateToProps, { getQuizzes })(Quiz);