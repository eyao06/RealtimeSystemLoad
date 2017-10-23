import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {

  	render() {

    	const { title, url } = this.props;

    	return (

			<Navbar style={{backgroundColor: 'gray'}} light expand="md">
	          	<NavbarBrand style={{color: 'white'}}> 
	          		{title} 
	          	</NavbarBrand>
	            <Nav className="ml-auto" navbar>
	              	<NavItem>
	                	<NavLink style={{color: 'white'}} href={url}>
	                		Source Code
	                	</NavLink>
	              	</NavItem>
	            </Nav>
	        </Navbar>

    	);
  	}
}

export default Header;
