import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import LineChartComponent from './LineChartComponent';
import Table from './Table';
import Speedometer from './Speedometer';
import Card from './Card';


class Main extends Component {

  	render() {

    	const { cpuLoadData, cpuLoad, lineColors, url } = this.props;

    	return (

	        <div align="center" >

	        	{
		        	cpuLoadData.length > 4
		          	? 	<Container>

			          		<Row>
			          			<Col>
				                  	<Card>
				                    	<h3>Real Time CPU Graph</h3>
				                    	<small>(System Load Since Page Open)</small>
				                  	</Card>            
				                  	<Card>
						                <LineChartComponent className="textCenter" 
						                    data={cpuLoadData} 
						                    coreCount={Object.keys(cpuLoad).length-2} 
						                    colors={lineColors}/>

					                  	<span>
					                  		(Click on the individual Legends to hide/show the Lines on the Chart)
					                  	</span>

				                  	</Card>			                
				                </Col>
		                  	</Row>

		                  	<Row>
		                  		<Col sm="6">
				                  	<Card>
				                    	<h3>CPU Load % Usage</h3>
				                  	</Card>      
				                  	<Card>
					              	  	<Speedometer data={cpuLoad.cpu} />
				                  	</Card>    
				                  	<Card>
					                  	<Row>
					                  		<Col>
							                  	<p>
							                  		Thanks For Visting
							                  	</p>
							                  	<p>
							                  		Click The Link Below For The Source Code
							                  	</p>

        										<Button outline color="primary" href={url}>Source Code</Button>
			                  				</Col>
			                  			</Row>
				                  	</Card>
			                  	</Col>

		                  		<Col sm="6">
				                  	<Card>
				                    	<h3>Data Table</h3>
				                  	</Card>      
				                  	<Card>
					              	  	<Table title="Current System Load" data={cpuLoad} coreCount={Object.keys(cpuLoad).length-2}/>
				                  	</Card>
			                  	</Col>
			              	</Row>

		              	</Container>

		          	: 	<Container>
			          		<Row>
			          			<Col>
			          				<div style={{marginTop: '20%'}}>
		                  				<h1>Please Wait As We Are Gathering The Data...</h1>
		                  			</div>
		                  		</Col>
		                	</Row>
		              	</Container>
		        }

	        </div>
    	);
  	}
}

export default Main;