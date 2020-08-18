import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQuiz } from '../../actions';
import { faFileSignature, faTimes, faQuestionCircle, faBraille, faSms, faCheck } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';
import { withRouter, Link } from 'react-router-dom';

class Detail extends Component {
    state = { loading: true }
    async componentDidMount() {
        const { id } = this.props.match.params;
        await this.props.getQuiz(id);
        this.setState({ loading: false });
    }
    renderQuestions = () => {
        return this.props.quiz.questions.map((question, index) => {
            return (
                <div key={index}>
                    <p className="card-text"><b><FontAwesomeIcon icon={faQuestionCircle} /> Question#{index + 1}: </b>{question.question}</p>
                    <p className="card-text"><b><FontAwesomeIcon icon={faBraille} /> Points: </b>{question.points}</p>
                    <h6>Answers</h6>
                    <hr />
                    {question.options.map((option, i) => {
                        return (<div key={i}>
                            <span className="card-text"><b><FontAwesomeIcon icon={faSms} /> Answer#{i + 1}: </b> {option.description} </span>
                            <span className={!option.correct ? 'text-danger' : 'text-success'}><FontAwesomeIcon icon={!option.correct ? faTimes : faCheck} /></span>
                        </div>);
                    })}
                </div>
            )
        });
    }
    renderContent = () => {
        return (<div className="row margin-from-top">
            <div className="col-sm-8 offset-sm-2">
                <div className="card text-center">
                    <div className="card-header bg-secondary text-white">
                        <h4 className="card-title">Quiz #{this.props.quiz._id}</h4>
                    </div>
                    <div className="card-body">
                        <h4><FontAwesomeIcon icon={faFileSignature} />Quiz Title: {this.props.quiz.title}</h4>
                        <h4><FontAwesomeIcon icon={faBraille} />Quiz Points: {this.props.quiz.totalPoints}</h4>
                        <hr />
                        <h5><FontAwesomeIcon icon={faQuestionCircle} /> Questions and Answers</h5>
                        <hr />
                        {this.renderQuestions()}
                    </div>
                    <div className="card-footer">
                        <Link className="btn btn-info" to="/quiz"><FontAwesomeIcon icon={faTimes} /> Cancel</Link>
                    </div>
                </div>
            </div>
        </div>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Getting the quiz please wait..." />
        else
            return this.renderContent();
    }
}

const mapStateToProps = ({ quiz }) => ({ quiz: quiz });

export default connect(mapStateToProps, { getQuiz })(withRouter(Detail));