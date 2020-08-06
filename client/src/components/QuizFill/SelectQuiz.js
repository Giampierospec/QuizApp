import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizzesToFill } from '../../actions';
import { Link } from 'react-router-dom';

class SelectQuiz extends Component {
    state = {ready:false};
    async componentDidMount() {
       await  this.props.getQuizzesToFill();
       this.setState({ready:true});
    }
    renderSelect = () => {
        return (
            <select className="form-control" onChange={this.props.onSelect} defaultValue="">
                <option disabled value="">Choose an option</option>
                {this.props.quizFill.map((quiz, i) => <option key={i} value={quiz.quizId}>{quiz.quizTitle}</option>)}
            </select>
        );
    }
    render() {
        if(!this.props.quizFill.length)
            return (<div className="row text-center">
                <div className="col-sm-8 offset-sm-2">
                    <h5>Looks like you filled all the quizzes available at the moment</h5>
                    <Link to="/filled" className="btn btn-secondary">Go to your filled quizzes</Link>
                </div>
            </div>)
        return (<div className="row">
            <div className="col-sm-8 offset-sm-2">
                <div className="form-group row">
                    <label className="control-label col-sm-2">Select a Quiz to Fill</label>
                    <div className="col-sm-6">
                        {this.state.ready && this.renderSelect()}
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = ({ quizFill }) => ({ quizFill });

export default connect(mapStateToProps, { getQuizzesToFill })(SelectQuiz);