import React from 'react';
import verveLogo from '../../../images/verve_fire_logo_1.svg'
import { Navbar, Nav, GuestNavIcon } from '../..';
import { Link } from 'react-router-dom';

const GuestNavbar = (props) => {
	return (
		<Navbar>
			<Link to="/" css={`margin: 1rem 0;`}>
				<img src={verveLogo} alt="React Logo" width="45px" />
			</Link>
			<Nav justify="right">
			</Nav>
			<GuestNavIcon name="V"/>
		</Navbar>
	);
};

export default GuestNavbar;
