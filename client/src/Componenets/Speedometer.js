import React, { Component } from 'react';

import ReactSpeedometer from "react-d3-speedometer";


/* Component for Speedometer */
class Speedometer extends Component {
  
  	render() {

        const { data } = this.props;

	    return (

			<ReactSpeedometer
                maxValue={100}
                value={parseFloat(data)}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
                height={170}
            />

    	);
  	}
}

export default Speedometer;

