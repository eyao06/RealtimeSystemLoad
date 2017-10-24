import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


/* Component for Line Chart */
class LineChartComponent extends Component {
  
  	constructor(props) {
    	super(props);
		this.selectLine = this.selectLine.bind(this);
		let array = new Array(this.props.coreCount+1)
		let arr = new Array(this.props.coreCount+1)
		array.fill('1');
		arr.fill('line');

    	this.state = { opacity: array, icon: arr };

  	}

  	//changes the opacity to 0 or 1 and the icon when legend key is clicked
	selectLine(event){
		let lineOpacity = this.state.opacity;
		let legendIcon = this.state.icon;
		let index = event.dataKey === 'cpu' ? this.state.opacity.length-1 : parseInt(event.dataKey.replace(/[^0-9\.]/g, ''), 10)-1;
		
		lineOpacity[index] = lineOpacity[index] === '1' ? '0' : '1';
		legendIcon[index] = legendIcon[index] === 'line' ? 'wye' : 'line';

		this.setState({opacity: lineOpacity, icon: legendIcon});

		console.log(this.state.opacity);
	}



  	render() {

  		const { data, coreCount, colors } = this.props;
  		const { opacity, icon } = this.state;

    	return (

      		<ResponsiveContainer width='100%' height="80%" minHeight={300}>

	        	<LineChart width={800} height={300} data={data}
	        	margin={{top: 30, right: 30, left: 20, bottom: 30}}>
	          
	          		<XAxis dataKey="date" />
	          		<YAxis domain={[0, 100]} unit="%"/>
	          		<CartesianGrid strokeDasharray="3 3"/>
	          		<Tooltip/>
	          		<Legend onClick={this.selectLine}/>
					
					{
			            Array.apply(null, Array(coreCount)).map(function(item, i){   
			                                             
			              	return (
			                	<Line 
			                		key={i} 
			                		legendType={icon[i]} 
			                		type="monotone" 
			                		dataKey={"core"+(i+1)} 
			                		stroke={colors[i]} 
			                		activeDot={{r: 8}} 
			                		strokeOpacity={opacity[i]} 
			                		isAnimationActive={false}
			                	/>

			              	);                
			            }, this)  

	          		}

			        <Line 
			        	type="monotone" 
			        	legendType={icon[icon.length-1]} 
			        	dataKey="cpu" 
			        	stroke={colors[colors.length-1]} 
			        	activeDot={{r: 8}} 
			        	strokeOpacity={opacity[opacity.length-1]} 
			        	isAnimationActive={false}
			        />

	        	</LineChart>

      		</ResponsiveContainer>

    	);
  	}
}

export default LineChartComponent;