import React, {Component} from 'react';
import Chart from 'chart.js';
import { getStat, generateRandomColor, generateOptions} from '../../utils/statUtil';
class FilledQuizStats extends Component{
  
    constructor(props){
        super(props);
        this.chartRef = React.createRef();
        this.chart = {};
        this.state = {
            chartData:[]
        };
        
    }
    async componentDidMount(){
        const {data} = await getStat('/api/stats');
        this.setState({chartData:data});
        this.renderContext();
    }
    renderDataSet(){
        const chartData = this.state.chartData;
        if(!chartData || !chartData.length)
            return [];
        return chartData.map((chart) => {
            return {
                label: chart._id || "Total Filled",
                data: [chart.count],
                backgroundColor:generateRandomColor()
            };
        });
    }
    renderContext = ()=>{
        const ctx = this.chartRef.current.getContext("2d");
        this.chart = new Chart(ctx,{
            type:'bar',
            data:{
                labels: ['Filled'],
                datasets:this.renderDataSet()
            }
        });
    }
    callApi = async (e)=>{
        const {data} = await getStat(`/api/stats?key=${e.currentTarget.value}`);
        this.setState({chartData:data});
        this.chart.destroy();
        this.renderContext();
    }
    render(){
        return (
            <div>
                <div className="form-group row">
                    <div className="col-sm-6 offset-sm-3">
                        <select className="form-control" defaultValue="" onChange={(e)=>{this.callApi(e)}}>
                            <option value="">Select a filter</option>
                            {generateOptions().map((opt,i)=>{
                                return <option key={i} value={opt.value}>{opt.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <canvas ref={this.chartRef}>
                        
                </canvas>
            </div>
           );
    }
}
export default FilledQuizStats;