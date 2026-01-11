import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5005/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4 text-center">Registered Users</h2>

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div className="table-responsive shadow-lg rounded-4 overflow-hidden">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-danger text-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Favorite Club</th>
                <th>Favorite Player</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>{user.favoriteClub}</td>
                  <td>{user.favoritePlayer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
