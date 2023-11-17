import React from 'react'
import '../navbar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ userId }) => {
  const location = useLocation();

  return (
    (location.pathname === '/login' | location.pathname === '/register') ? (<div></div>) : (
      <div>
        <input id="hamburger" className="hamburger" type="checkbox" />
        <label htmlFor="hamburger" className="hamburger">
          <i></i>
          <text>
            <close>close</close>
            <open>menu</open>
          </text>
        </label>
        <nav className="leftnav">
          <ul>
            {/* Home */}
            <li>
              <Link to={`/home/${userId}`}>
                <img className="icon" src="/cf_home_icon.png" alt="Home" />
                Home
              </Link>
            </li>
            {/* Search */}
            <li>
              <Link to='/search'>
                <img className="icon" src="/search_icon.png" alt="Search" />
                Search
              </Link>
            </li>
            {/* Notifications */}
            <li>
              <Link to='/notifications'>
                <img className="icon" src="/bell_icon.png" alt="Notifications" />
                Notifications
                {/* <div className="tag">1</div> */}
              </Link>
            </li>
            {/* My Account */}
            <li>
              <Link to={`/profile/${userId}`}>
                <img className="icon" src="/profile_icon.png" alt="My Account" />
                My Account
              </Link>
            </li>
            {/* Logout */}
            <li>
              <Link to='/'>
                <img className="icon" src="/logout_icon.png" alt="Logout" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  )
}

export default Sidebar;
