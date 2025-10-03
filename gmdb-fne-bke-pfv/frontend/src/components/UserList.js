// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserForm from "./UserForm";

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);

//   const fetchUsers = () => {
//     axios.get("http://localhost:5000/api/users").then(res => setUsers(res.data));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:5000/api/users/${id}`);
//     fetchUsers();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-3">User Profiles</h2>
//       <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />
//       <ul className="mt-4">
//         {users.map(user => (
//           <li key={user._id} className="border p-3 mb-2 rounded flex justify-between">
//             <div>
//               <p><b>{user.name}</b> ({user.email})</p>
//               <p>Age: {user.age}</p>
//             </div>
//             <div>
//               <button onClick={() => setEditingUser(user)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
//               <button onClick={() => deleteUser(user._id)} className="bg-red-600 text-white px-2 py-1">Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default UserList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-lg text-gray-600">
            Create, edit, and manage user profiles with ease
          </p>
        </div>

        {/* User Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editingUser ? "Edit User" : "Add New User"}
          </h2>
          <UserForm 
            fetchUsers={fetchUsers} 
            editingUser={editingUser} 
            setEditingUser={setEditingUser} 
          />
        </div>

        {/* Users List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Profiles ({users.length})
            </h2>
            <div className="text-sm text-gray-500">
              Click edit to modify user details
            </div>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No users found</h3>
              <p className="text-gray-500">Start by adding your first user profile above</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {users.map((user, index) => (
                <div 
                  key={user._id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                 {/* In the UserList component, update the user display section: */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={user.avatar || "https://avatar.iran.liara.run/public/job/doctor/female"} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      onError={(e) => {
                        e.target.src = "https://avatar.iran.liara.run/public/job/doctor/female";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {user.email}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Age: {user.age}
                    </p>
                  </div>
                </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingUser(user)}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;