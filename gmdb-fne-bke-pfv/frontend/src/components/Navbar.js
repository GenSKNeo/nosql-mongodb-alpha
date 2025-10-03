// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4 text-white flex justify-between">
//       <h1 className="text-lg font-bold">Profile Viewer</h1>
//       <div>
//         <Link to="/" className="px-3">Home</Link>
//         <Link to="/users" className="px-3">Users</Link>
//       </div>
//     </nav>
//   );
// }
// export default Navbar;
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-white text-xl font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              🚀 Profile Viewer
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive("/") 
                  ? "text-white bg-white/20 backdrop-blur-sm shadow-lg" 
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white"></span>
              )}
            </Link>
            
            <Link 
              to="/users" 
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive("/users") 
                  ? "text-white bg-white/20 backdrop-blur-sm shadow-lg" 
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Users
              {isActive("/users") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white"></span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;