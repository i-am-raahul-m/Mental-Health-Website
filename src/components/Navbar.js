import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Mental Health Hub</Link>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/music" activeclassname="active">
            Music
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" activeclassname="active">
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/guided-meditation" activeclassname="active">
            Guided Meditation
          </NavLink>
        </li>
        <li>
          <NavLink to="/sleep" activeclassname="active">
            Sleep
          </NavLink>
        </li>
        <li>
          <NavLink to="/therapy" activeclassname="active">
            Therapy
          </NavLink>
        </li>
        <li>
          <NavLink to="/selfcare" activeclassname="active">
            Self-Care
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
