import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilledQuizzes } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
class GetFilledQuizzes extends Component {
    state = { loading: true }
    async componentDidMount() {
        await this.props.getFilledQuizzes();
        this.setState({ loading: false });
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
                                <Link className="btn btn-primary float-right" to={`/filled/${quiz._id}`}>Detail</Link>
                            </div>
                        </div>
                    </div>
                </div>

            )
        });
    }
    renderContent() {
        return (
            <div className="margin-from-top">
                <h4 className="text-center">Quizzes Filled By {this.props.auth.name}</h4>
                <hr/>
                {this.renderList()}
            </div>);
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading your filled quizzes please wait..." />
        else
            return this.renderContent()
    }
}
const mapStateToProps = ({ quizFill , auth}) => ({ quizFill, auth });
export default connect(mapStateToProps, { getFilledQuizzes })(GetFilledQuizzes);