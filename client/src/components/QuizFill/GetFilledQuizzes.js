import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilledQuizzes, deleteFilledQuiz } from '../../actions';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import DeleteModal from './ModalDelete';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class GetFilledQuizzes extends Component {
    state = { loading: true, showDelete: false, quiz: {}, page: 1 }
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
    callApi = async (page) => {
        this.setState({ loading: true, page });
        await this.props.getFilledQuizzes(page);
        this.setState({ loading: false });

    }
    renderPages = () => {
        const pages = [];
        const { startPage, endPage } = this.props.pagination;
        for (let i = startPage; i <= endPage; i++)
            pages.push(<li className="page-item" key={i} onClick={() => { this.callApi(i) }}><button className="page-link">{i}</button></li>);
        return pages;
    }
    setPrevious = async () => {
        if (this.state.page !== this.props.pagination.startPage)
            await this.callApi(this.state.page - 1);
    }
    setNext = async () => {
        if (this.state.page !== this.props.pagination.endPage)
            await this.callApi(this.state.page + 1)
    }
    renderPagination = () => {
        const { startPage, endPage, totalPages } = this.props.pagination;
        const prevCond = this.state.page === startPage;
        const nextCond = this.state.page === endPage;
        return (<div className="text-center">
            <p>page {this.state.page} of {totalPages}</p>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li class={`page-item ${(prevCond) ? 'disabled' : ''}`}><button className="page-link" disabled={prevCond} onClick={this.setPrevious}>Previous</button></li>
                    {this.renderPages()}
                    <li class={`page-item ${(nextCond) ? 'disabled' : ''}`} ><button className="page-link" disabled={nextCond} onClick={this.setNext}>Next</button></li>
                </ul>
            </nav>
        </div>)
    }
    renderList() {
        return this.props.quizFill.map((quiz, i) => {
            return (
                <div className="col-sm-4" key={i}>
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

            )
        });
    }
    renderContent() {
        if (!this.props.quizFill.length) {
            return (<div className="margin-from-top row text-center">
                <div className="col-sm-8 offset-sm-2">
                    <h5>Nothing to show at the moment</h5>
                    <Link to="/quizFill" className="btn btn-secondary">Fill some quizzes</Link>
                </div>
            </div>)
        }
        else {
            return (
                <div>
                    <div className="margin-from-top">
                        <h4 className="text-center">Quizzes Filled By {this.props.auth.name}</h4>
                        <hr />
                        <h5 className="text-center">Showing {this.props.quizFill.length} of {this.props.pagination.totalItems}</h5>
                        <br />
                        <div className="row">
                            {this.renderList()}
                        </div>
                        <br />
                        {this.renderPagination()}
                    </div>
                    <DeleteModal show={this.state.showDelete} quiz={this.state.quiz} close={this.onClose} />
                </div>);
        }
    }
    render() {
        if (this.state.loading)
            return <Loading msg="Loading your filled quizzes please wait..." />
        else
            return this.renderContent()
    }
}
const mapStateToProps = ({ quizFill, auth }) => ({ quizFill: quizFill.items, pagination: quizFill, auth });
export default connect(mapStateToProps, { getFilledQuizzes, deleteFilledQuiz })(GetFilledQuizzes);