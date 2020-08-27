import React from 'react';
import verveLogo from '../../../images/verve_fire_logo_1.svg'
import { Navbar, Nav, GuestNavIcon } from '../..';

const GuestNavbar = (props) => {
	return (
		<Navbar>
			<a
				href="/"
				css={`
         margin: 1rem 0;
       `}
			>
				<img src={verveLogo} alt="React Logo" width="45px" />
			</a>
			<Nav justify="right">
			</Nav>
			<GuestNavIcon name="V"/>
		</Navbar>
	);
};

export default GuestNavbar;
