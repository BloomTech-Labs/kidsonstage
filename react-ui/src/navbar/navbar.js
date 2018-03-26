import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<div>
				<ul>
					<button>
						<Link to="/"> Home </Link>
					</button>
				</ul>
			</div>
		);
	}
}
export default Navbar;
