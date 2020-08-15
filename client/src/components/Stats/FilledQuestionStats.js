import React, { Component } from 'react';
import Chart from 'chart.js';
import { getStat, generateRandomColor } from '../../utils/statUtil';
class FilledQuestionStats extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.selectRef = React.createRef();
        this.chart = "";
        this.state = {
            questions: {},
            titles: [],
            title: ""
        };
    }
    async componentDidMount() {
        const { data } = await getStat('/api/titles');
        this.setState({
            titles: data
        });
        this.renderContext();
    }
    renderContext = () => {
        const ctx = this.chartRef.current.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["filled", "Good Answer", 'Bad answer'],
                datasets: Object
                    .keys(this.state.questions)
                    .map((k) => {
                        const randomColor = generateRandomColor();
                        return {
                            label: k,
                            data: [this.state.questions[k].length,
                            this.state.questions[k].filter((question) => question.answer.correct).length,
                            this.state.questions[k].filter((question) => !question.answer.correct).length,],
                            backgroundColor: [randomColor, randomColor, randomColor]
                        }
                    })
            }
        });
    }
    onSelect = async () => {
        this.chart.destroy();
        const title = this.selectRef.current.value;
        if (title) {
            const { data } = await getStat(`/api/titleStats?title=${title}`);
            this.setState({ questions: data })
            this.renderContext();
        }





    }
    setTitles = () => {
        return (
            <div className="col-sm-6 offset-sm-3">
                <select className="form-control" defaultValue="" onChange={this.onSelect} ref={this.selectRef}>
                    <option value="">Pick a Quiz</option>
                    {this.state.titles.map(({ title }, i) => <option value={title} key={i}>{title}</option>)}
                </select>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.setTitles()}
                <h4>{this.state.title}</h4>
                <canvas ref={this.chartRef}>

                </canvas>
            </div>
        )
    }
}
export default FilledQuestionStats;