import React, { useState } from "react";
import axios from "axios";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [error, setError] = useState("");

  // Fetch all users
  const getUsers = () => {
    axios.get("https://localhost:7267/api/User")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setError("Error fetching users.");
        console.error(err);
      });
  };

  // Create a new user
  const createUser = (e) => {
    e.preventDefault();

    const newUser = { name, email };

    axios.post("https://localhost:7267/api/User", newUser)
      .then((response) => {
        setUsers([...users, response.data]); // Add new user to the list
        alert("User created successfully!");
      })
      .catch((err) => {
        setError("Error creating user.");
        console.error(err);
      });
  };

  // Delete a user by ID
  const deleteUser = (e) => {
    e.preventDefault();

    axios.delete(`https://localhost:7267/api/User/${userIdToDelete}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== parseInt(userIdToDelete)));
        alert("User deleted successfully!");
      })
      .catch((err) => {
        setError("Error deleting user.");
        console.error(err);
      });
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Get Users Button */}
      <button onClick={getUsers}>Get Users</button>
      
      {/* Create User Form */}
      <h2>Create User</h2>
      <form onSubmit={createUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      {/* Delete User Form */}
      <h2>Delete User</h2>
      <form onSubmit={deleteUser}>
        <div>
          <label>User ID to Delete:</label>
          <input
            type="number"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete User</button>
      </form>

      {/* Display Users */}
      <h2>Users List</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>No users available. Click "Get Users" to fetch.</p>
        )}
      </ul>
    </div>
  );
};

export default UserManager;
