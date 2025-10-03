import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function Navbar() {
  return (
    <nav>
      <h1>Profile Viewer</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>
    </nav>
  );
}
export default Navbar;
