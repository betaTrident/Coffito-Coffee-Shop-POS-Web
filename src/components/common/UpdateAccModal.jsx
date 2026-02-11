import axios from "axios";
import React, { useState, useEffect } from "react";

function UpdateAccModal({ onClose, user, onUpdate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/api/users/${user.user_id}`, {
        username,
        password,
      });

      console.log("Update user data: ", response.data);
      onUpdate(response.data);
      onClose();
    } catch (err) {
      console.log("Error updating user: ", err);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`w-full z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-[300px] text-center transform ${
          isVisible ? "translate-y-0" : "-translate-y-10"
        } transition-transform duration-300`}
      >
        <div>
          <h3 className="text-lg font-semibold mb-4">Update Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <label className="block text-left font-medium mb-1">Username</label>
            <input
              type="text"
              className="input-fields"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <br />
            <label className="block text-left font-medium mb-1">Password</label>
            <input
              type="password"
              className="input-fields pr-2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />

          <div className="btn-div">
            <button type="submit" className="btn-confirm bg-blue-500 text-white py-1 px-4 rounded mr-4">
              Save
            </button>
            <button type="button" onClick={onClose} className="btn-cancel bg-gray-300 py-1 px-4 rounded">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAccModal;
