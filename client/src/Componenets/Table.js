import React, { Component } from 'react';


/* Component for Table */
class Table extends Component {
  
  	render() {

  		const { data, coreCount } = this.props;

	    return (

			<table>
	    		<thead>
		            <tr>
		              	<th> </th>
		              	<th>Average Load</th>
		              	<th>Date/Time</th>
		            </tr>
	            </thead>
	            <tbody>
		            <tr>
		              	<td>Total CPU Load</td>
		              	<td>{data.cpu}%</td>
		              	<td>{data.date}</td>
		            </tr>
		        	{
		          		Array.apply(null, Array(coreCount)).map(function(item, i){                                        
		            		return (
		              			<tr key={i}>
		                        	<td>CPU Core #{i+1}</td>
		                        	<td>{data["core"+(i+1)]}%</td>
		                        	<td>{data["date"]}</td>
		              			</tr>
		            		);                
		          		}, this)
		        	} 
	        	</tbody>
	        </table>
	        
    	);
  	}
}

export default Table;

