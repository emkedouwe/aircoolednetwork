import React from 'react';
import logo from './../images/logo-simple.svg';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="bg-secondary">
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-dark ">
				<Link to="/" className="navbar-brand">
	                <img src={logo} alt="" height="44" />
	            </Link>
			    
			    <button href="#mobile-menu" id="my-icon" className="navbar-toggler hamburger hamburger--collapse" type="button">
	                <span className="hamburger-box">
	                    <span className="hamburger-inner"></span>
	                </span>
	            </button>

			    <div className="collapse navbar-collapse">
	      			<ul id="menu-hoofdmenu" className="navbar-nav ml-auto">
	      				<li id="menu-item-38" className="">
	      					<Link to="/" className="nav-link">
	      						Homepage
	      					</Link>
	      				</li>
	      				<li id="menu-item-38" className="">
	      					<Link to="/cars" className="nav-link">
	      						Cars
	      					</Link>
	      				</li>
					</ul>
	      		</div>
		  	</nav>
		</div>
	</div>
  );
}

export default Header;