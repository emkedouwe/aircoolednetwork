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
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
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