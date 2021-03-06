import React , {Fragment} from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import logo from './entypoGithub.svg'
import { motion } from "framer-motion";


const NavBar = ({title, titleTwo, icon}) => {
	return (
		<nav className="navbar bg-primary navBar">
			<div style={{
				width: "1024px",
				margin: 'auto',
				// border: "solid black",
				display: "flex",
				flexDirection: 'row',
				justifyContent: "space-between",
				alignItems: "center"
			}}>
				<motion.div
					className='logo'
					initial={{ opacity: 0, x: -90, y: 0, scale: 0 }}
					animate={{ opacity: 1, x: 0, y: 15, scale: 1 }}
					transition={{
						ease: "easeOut",
						duration: 0.44,
					}}
				>
					<img id='iconLogo' src={logo} alt=''/>
					<h1 id="title">
						{title}
					</h1>
					<h1 id="title">
						{titleTwo}
					</h1>
				</motion.div>
				<ul>
					<li>
						<Link to ="/">Home</Link>
					</li>
					<li>
						<Link to ="/about">About</Link>
					</li>
				</ul>

			</div>
		</nav>
	); 
};

NavBar.defaultProps = {
	title: "GitHub",
	titleTwo: 'Search',
	icon: "fab fa-github mx-1"
};

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	titleTwo: PropTypes.string.isRequired,
};

export default NavBar;
