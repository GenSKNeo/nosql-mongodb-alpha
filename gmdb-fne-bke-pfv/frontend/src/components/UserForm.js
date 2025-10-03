// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function UserForm({ fetchUsers, editingUser, setEditingUser }) {
//   const [form, setForm] = useState({ name: "", email: "", age: "" });

//   useEffect(() => {
//     if (editingUser) setForm(editingUser);
//   }, [editingUser]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingUser) {
//       await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, form);
//       setEditingUser(null);
//     } else {
//       await axios.post("http://localhost:5000/api/users", form);
//     }
//     setForm({ name: "", email: "", age: "" });
//     fetchUsers();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4">
//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 mr-2" />
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 mr-2" />
//       <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} className="border p-2 mr-2" />
//       <button type="submit" className="bg-green-600 text-white px-3 py-1">
//         {editingUser ? "Update" : "Add"}
//       </button>
//     </form>
//   );
// }
// export default UserForm;


// ==================================================================

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function UserForm({ fetchUsers, editingUser, setEditingUser }) {
//   const [form, setForm] = useState({ name: "", email: "", age: "" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editingUser) {
//       setForm(editingUser);
//     } else {
//       setForm({ name: "", email: "", age: "" });
//     }
//   }, [editingUser]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editingUser) {
//         await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, form);
//         setEditingUser(null);
//       } else {
//         await axios.post("http://localhost:5000/api/users", form);
//       }
//       setForm({ name: "", email: "", age: "" });
//       fetchUsers();
//     } catch (error) {
//       console.error("Error saving user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setEditingUser(null);
//     setForm({ name: "", email: "", age: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Name Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Full Name
//           </label>
//           <input
//             name="name"
//             placeholder="John Doe"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
//           />
//         </div>

//         {/* Email Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             name="email"
//             type="email"
//             placeholder="john@example.com"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
//           />
//         </div>

//         {/* Age Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Age
//           </label>
//           <input
//             name="age"
//             type="number"
//             placeholder="25"
//             value={form.age}
//             onChange={handleChange}
//             required
//             min="1"
//             max="120"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex space-x-3 pt-2">
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               {editingUser ? "Updating..." : "Adding..."}
//             </>
//           ) : (
//             <>
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingUser ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
//               </svg>
//               {editingUser ? "Update User" : "Add User"}
//             </>
//           )}
//         </button>

//         {editingUser && (
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// export default UserForm;

import React, { useEffect, useState } from "react";
import axios from "axios";

function UserForm({ fetchUsers, editingUser, setEditingUser }) {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    age: "", 
    avatar: "https://avatar.iran.liara.run/public/job/doctor/female" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      setForm({ 
        name: "", 
        email: "", 
        age: "", 
        avatar: "https://avatar.iran.liara.run/public/job/doctor/female" 
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, form);
        setEditingUser(null);
      } else {
        await axios.post("http://localhost:5000/api/users", form);
      }
      setForm({ 
        name: "", 
        email: "", 
        age: "", 
        avatar: "https://avatar.iran.liara.run/public/job/doctor/female" 
      });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setForm({ 
      name: "", 
      email: "", 
      age: "", 
      avatar: "https://avatar.iran.liara.run/public/job/doctor/female" 
    });
  };

  // Quick avatar options for different jobs
  const quickAvatars = [
    { label: "👩‍⚕️ Doctor", url: "https://avatar.iran.liara.run/public/job/doctor/female" },
    { label: "👨‍⚕️ Doctor", url: "https://avatar.iran.liara.run/public/job/doctor/male" },
    { label: "👩‍💼 Manager", url: "https://avatar.iran.liara.run/public/job/manager/female" },
    { label: "👨‍💼 Manager", url: "https://avatar.iran.liara.run/public/job/manager/male" },
    { label: "👩‍💻 Developer", url: "https://avatar.iran.liara.run/public/job/developer/female" },
    { label: "👨‍💻 Developer", url: "https://avatar.iran.liara.run/public/job/developer/male" },
    { label: "👩‍🏫 Teacher", url: "https://avatar.iran.liara.run/public/job/teacher/female" },
    { label: "👨‍🏫 Teacher", url: "https://avatar.iran.liara.run/public/job/teacher/male" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
          />
        </div>

        {/* Age Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="25"
            value={form.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
          />
        </div>

        {/* Avatar URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar URL
          </label>
          <input
            name="avatar"
            type="url"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Quick Avatar Selection */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Avatar Selection:
        </label>
        <div className="flex flex-wrap gap-2">
          {quickAvatars.map((avatar, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setForm({ ...form, avatar: avatar.url })}
              className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                form.avatar === avatar.url 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
              }`}
            >
              {avatar.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editingUser ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingUser ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
              </svg>
              {editingUser ? "Update User" : "Add User"}
            </>
          )}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;