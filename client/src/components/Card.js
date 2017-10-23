import React, { Component } from 'react';

var cardStyle = {
  height: 'auto',
  width: '80%',
  margin: '50 auto',
  padding: 30,
  backgroundColor: "#FFF",
  WebkitFilter: "drop-shadow(0px 0px 5px #666)",
  filter: "drop-shadow(0px 0px 5px #666)"
};

/* displays props in a card */
class Card extends Component {

 	 render() {

    	const { children } = this.props;

    	return (

    	<card style={{padding: 20}}>

	      	<div style={cardStyle}>
	        	{children}
	      	</div>

	    </card>

    	);
  	}
}


export default Card;

