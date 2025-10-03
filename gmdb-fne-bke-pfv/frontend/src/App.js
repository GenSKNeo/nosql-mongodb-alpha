import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Manage Users</h2>
        <UserForm
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          users={users}
          setUsers={setUsers}
        />
        <UserList
          users={users}
          setEditingUser={setEditingUser}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
}

export default App;
