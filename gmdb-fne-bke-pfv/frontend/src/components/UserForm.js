import React, { useEffect, useState } from "react";
import axios from "axios";

function UserForm({ fetchUsers, editingUser, setEditingUser }) {
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, form);
      setEditingUser(null);
    } else {
      await axios.post("http://localhost:5000/api/users", form);
    }
    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  return (
<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
  <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
  <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
  <button type="submit" className="add">{editingUser ? "Update" : "Add"}</button>
</form>
  );
}
export default UserForm;
