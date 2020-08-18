import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getFilledQuiz } from '../../actions';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
class FilledQuizDetail extends Component {
    state = { loading: true };
    async componentDidMount() {
        await this.props.getFilledQuiz(this.props.match.params.id);
        this.setState({ loading: false });
        if (!this.props.quizFill)
            this.props.history.push('/filled');
    }
    renderQuestions = () => {
        return this.props?.quizFill?.questions.map((question, i) => {
            return (<div key={i}>
                <h6 className="card-text">Question #{i + 1}: {question.question} Value: {question.points}</h6>
                <hr />
                <span className="card-text">You Answered: {question.answer.description} </span>
                <span className={!question.answer.correct ? 'text-danger' : 'text-success'}><FontAwesomeIcon icon={!question.answer.correct ? faTimes : faCheck} /></span>
                <br />
                <span className="card-text">Correct Answer: {question.answer.correctAnswer} </span>
                <span className="text-primary"><FontAwesomeIcon icon={faCheck} /></span>
                <br />
                <br />
            </div>);
        });
    }
    renderContent = () => {
        return (<div className="margin-from-top row">
            <div className="col-sm-8 offset-sm-2">
                <div className="card">
                    <div className="card-header bg-secondary text-white">
                        <h4 className="card-title">{this.props?.quizFill?.title}</h4>
                        <span>Your score: {this.props?.quizFill?.totalPoints} / {this.props.quizFill?.maxPoints}</span>
                    </div>
                    <div className="card-body">
                        {this.renderQuestions()}
                    </div>
                    <div className="card-footer">
                        <Link className="btn btn-info float-left" to="/filled"><FontAwesomeIcon icon={faTimes} /> Cancel</Link>
                    </div>
                </div>
            </div>
        </div>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading filled Quiz please wait..." />;
        else
            return this.renderContent();
    }
}

const mapStateToProps = ({ quizFill }) => ({ quizFill: quizFill })

export default connect(mapStateToProps, { getFilledQuiz })(withRouter(FilledQuizDetail));