import React, {Component} from 'react';
import Chart from 'chart.js';
class FilledQuestionStats extends Component{
    constructor(props){
        super(props);
        this.chartRef = React.createRef();
    }
    componentDidMount(){
        this.renderContext();
    }
    renderContext = ()=>{
        const ctx = this.chartRef.current.getContext('2d');
        new Chart(ctx,{
            type:'line',
            data:{
                labels: ["10:00", "11:00", "12:00", "13:00"],
                datasets: [
                    {
                        label: "My First dataset",

                        // Insert styling, colors etc here

                        data: [{ x: "10:00", y: 127 },
                        { x: "11:00", y: 140 },
                        { x: "12:00", y: 135 },
                        { x: "13:00", y: 122 },
                    {x:"14:00",y:500}]
                    }]
            }
        })
    }
    render(){
        return(
            <canvas ref={this.chartRef}>

            </canvas>
        )
    }
}
export default FilledQuestionStats;