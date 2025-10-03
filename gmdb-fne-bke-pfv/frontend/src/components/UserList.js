import React from "react";
import "./../App.css";

function UserList({ users, setEditingUser, deleteUser }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id} className="card">
          <div>
            <p>
              <b>{user.name}</b> ({user.email})
            </p>
            <p>Age: {user.age}</p>
          </div>
          <div>
            <button className="edit" onClick={() => setEditingUser(user)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteUser(user._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
