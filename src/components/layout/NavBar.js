import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const NavBar = ({title, icon}) => {
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className={icon}/>
				{title}
			</h1>
			<ul>
				<li>
					<Link to ="/">Home</Link>
				</li>
				<li>
					<Link to ="/about">About</Link>
				</li>
			</ul>
		</nav>
	); 
};

NavBar.defaultProps = {
	title: "GitHub Finder",
	icon: "fab fa-github mx-1"
};

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default NavBar;