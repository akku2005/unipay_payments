import React, { useState } from "react";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/index";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
  // Sample data
  const [users, setUsers] = useState([
    { id: 1, username: "johndoe", email: "johndoe@example.com", role: "Admin" },
    { id: 2, username: "janedoe", email: "janedoe@example.com", role: "User" },
    { id: 3, username: "alice", email: "alice@example.com", role: "User" },
    // Add more sample users
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter and search users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
      handleCloseEditModal();
    }
  };

  const handleDeleteUser = (userToDelete) => {
    setUsers(users.filter((user) => user !== userToDelete));
  };

  return (
    <div className="users flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Header />
        <main className="content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>

          {/* Search and Filter */}
          <div className="search-filter-section flex items-center justify-between mb-6">
            <div className="search-bar flex items-center border border-gray-300 rounded-lg p-2 bg-white w-1/3">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>

            <div className="filter-section flex items-center ml-4">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 bg-white"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table bg-white shadow-md rounded-lg p-6 mb-6">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          user.role === "Admin" ? "bg-blue-500" : "bg-green-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex items-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleOpenEditModal(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit User Modal */}
          {showEditModal && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Role</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        role: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                    onClick={handleUpdateUser}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Users;
