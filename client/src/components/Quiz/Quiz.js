import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizzes } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
                    <div className="card text-center">
                        <div className="card-header bg-secondary text-white">
                            <h4 className="card-title">{q.title}</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group-flush">
                                <li className="list-group-item"><b>No. of Questions: </b> <span className="badge badge-secondary">{q.questions?.length}</span></li>
                                <li className="list-group-item"><b>Points: </b> <span className="badge badge-secondary">{q.totalPoints}</span> </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="btn-group">
                                <Link to={`/quiz/${q._id}`} className="btn btn-primary">Detail</Link>
                                <Link to={`/edit/${q._id}`} className="btn btn-secondary">Edit</Link>
                            </div>
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
                <div className="margin-from-top">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <h3>Nothing to show :(</h3>
                            <Link to="/create"> Create a new quiz here!</Link>
                        </div>
                    </div>
                </div>);
        else
            return (
                <div className="margin-from-top">
                    <h4 className="text-center">Available Quizzes <Link to="/create" className="btn btn-primary float-right"><FontAwesomeIcon icon={faPlus} /></Link></h4>
                    <hr />
                    {this.renderQuizzes()}
                </div>
            )
    }
}
const mapStateToProps = ({ quiz }) => ({ quiz });

export default connect(mapStateToProps, { getQuizzes })(Quiz);