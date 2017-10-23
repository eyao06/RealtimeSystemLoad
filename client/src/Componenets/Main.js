import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Table from './Table';
import Speedometer from './Speedometer';
import Card from './Card';


class Main extends Component {

  	render() {

    	const { cpuLoadData, cpuLoad, lineColors, url } = this.props;

    	return (

	        <div align="center" >
				<Container>
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
	        </div>
    	);
  	}
}

export default Main;