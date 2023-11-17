import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ userId }) => {
  const location = useLocation();

  return (location.pathname === "/login") |
    (location.pathname === "/register") ? (
    <div></div>
  ) : (
    <div
      style={{ backgroundColor: "#262626" }}
      className="w-screen h-16 sticky bottom-0 flex flex-row justify-around items-center bg-green-500"
    >
      {/* Home */}
      <div>
        <Link to={`/`}>
          <div className="flex flex-col text-slate-50 items-center w-20">
            <img
              style={{ height: "38px", width: "auto" }}
              src="/cf_home_icon.png"
              alt="Home"
            />
            <h2 className="font-semibold text-xs">Home</h2>
          </div>
        </Link>
      </div>
      {/* Search */}
      <div>
        <Link to="/search">
          <div className="flex flex-col text-slate-50 items-center w-20">
            <img
              style={{ height: "38px", width: "auto" }}
              src="/search_icon.png"
              alt="Search"
            />
            <h2 className="font-semibold text-xs">Search</h2>
          </div>
        </Link>
      </div>
      {/* Notifications */}
      <div>
        <Link to="notifications">
          <div className="flex flex-col text-slate-50 items-center w-20">
            <img
              style={{ height: "38px", width: "auto" }}
              src="/bell_icon.png"
              alt="Notifications"
            />
            <h2 className="font-semibold text-xs">Notifications</h2>
          </div>
        </Link>
      </div>
      {/* My Account */}
      <div>
        <Link to={`/profile/${userId}`}>
          <div className="flex flex-col text-slate-50 items-center w-20">
            <img
              style={{ height: "38px", width: "auto" }}
              src="/profile_icon.png"
              alt="Profile"
            />
            <h2 className="font-semibold text-xs">My Account</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
