// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import UserList from "./components/UserList";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/users" element={<UserList />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Footer from "./components/Footer";  // Import the Footer

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
