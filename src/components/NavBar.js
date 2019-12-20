import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../static/logo.png';

const NavBar = () => {

  const renderNavBar = () => {

    const navItems = [
      "ABOUT",
      "BILLS",
      "LEGISLATORS",
      "INTEREST GROUPS",
      "VISUALIZATIONS",
    ];

    const paths = [
      "/about",
      "/bills",
      "/legislators",
      "/interest-groups",
      "/visualizations"
    ];

    return (navItems.map((navItem, index) =>
      <li key={index}>
        <Link to={paths[index]}>
          {navItem}
        </Link>
      </li>
    ));
  }

  return (
    <div id="nav-bar">
      <div className="inner-nav-bar">
        <Link to="/">
          <img className="logo" src={Logo}/>
        </Link>
        <ul>{renderNavBar()}</ul>
      </div>
    </div>
  );
}

export default NavBar;