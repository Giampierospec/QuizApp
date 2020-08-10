import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilledQuizzes, deleteFilledQuiz } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import DeleteModal from './ModalDelete';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class GetFilledQuizzes extends Component {
    state = { loading: true, showDelete: false, quiz: {} }
    async componentDidMount() {
        await this.props.getFilledQuizzes();
        this.setState({ loading: false });
    }
    showDeleteModal = (quiz) => {
        this.setState({ showDelete: true, quiz });
    }
    onClose = () => {
        this.setState({ showDelete: false });
    }
    renderList() {
        return this.props.quizFill.map((quiz, i) => {
            return (
                <div className="row" key={i}>
                    <div className="col-sm-8 offset-sm-2 text-center">
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <h4 className="card-title">{quiz.title}</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-text"><em>You got: {quiz.totalPoints}/{quiz.maxPoints} in this Quiz</em></h5>
                            </div>
                            <div className="card-footer">
                                <Link className="btn btn-info float-left" to={`/filled/${quiz._id}`}>Detail</Link>
                                <button className="btn btn-danger float-right" onClick={() => { this.showDeleteModal(quiz) }}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    </div>
                </div>

            )
        });
    }
    renderContent() {
        if (!this.props.quizFill.length)
            return (<div className="margin-from-top row text-center">
                <div className="col-sm-8 offset-sm-2">
                    <h5>Nothing to show at the moment</h5>
                    <Link to="/quizFill" className="btn btn-secondary">Fill some quizzes</Link>
                </div>
            </div>)
        else
            return (
                <div>
                    <div className="margin-from-top">
                        <h4 className="text-center">Quizzes Filled By {this.props.auth.name}</h4>
                        <hr />
                        {this.renderList()}
                    </div>
                    <DeleteModal show={this.state.showDelete} quiz={this.state.quiz} close={this.onClose} />
                </div>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading your filled quizzes please wait..." />
        else
            return this.renderContent()
    }
}
const mapStateToProps = ({ quizFill, auth }) => ({ quizFill, auth });
export default connect(mapStateToProps, { getFilledQuizzes, deleteFilledQuiz })(GetFilledQuizzes);