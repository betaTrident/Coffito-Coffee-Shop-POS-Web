import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTime from "@/components/layout/DateTime";
import { MdManageAccounts } from "react-icons/md";
import UpdateAccModal from "@/components/common/UpdateAccModal";
import Successfully from "@/components/common/Successfully";

function Accounts() {
  const [isUpdAccountModalVisible, setisUpdAccountModalVisible] = useState(false);
  const [isSuccessfullyModal, setSuccessfullyModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [adminData, setAdminData] = useState(null);
  const [staffData, setStaffData] = useState(null);

  const fetchUserData = async (user_id) => {
    try {
      const response = await axios.get(`/api/users/${user_id}`);
      console.log("Fetched user data:", response.data);
      setSelectedUser(response.data);

      if (user_id === 12134) {
        setAdminData(response.data);
      } else if (user_id === 14563) {
        setStaffData(response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchUserData(12134);
    fetchUserData(14563);
  }, []);

  const openUpdAccModal = async (user_id) => {
    setSelectedUser(null);
    fetchUserData(user_id);
    setisUpdAccountModalVisible(true);
  };

  const closeUpdAccModal = () => {
    setisUpdAccountModalVisible(false);
  };

  const handleUpdate = (updatedUserData) => {
    if (updatedUserData.user_id === 12134) {
      setAdminData(updatedUserData);
    } else if (updatedUserData.user_id === 14563) {
      setStaffData(updatedUserData);
    }
    setSuccessfullyModalVisible(true);
  };

  const maskPassword = (password) => {
    const visibleLength = 3;
    const maskedLength = password.length - visibleLength;

    if (maskedLength > 0) {
      const maskedPassword = password.slice(0, visibleLength) + "*".repeat(maskedLength);
      return maskedPassword;
    }
    return password;
  };

  const hideSuccessfullyModal = () => {
    setSuccessfullyModalVisible(false);
  };

  return (
    <div className="main">
      <div className="topbar-con">
        <h2>Account</h2>
        <DateTime />
      </div>

      <div className="accs-parent-div w-full h-full">
        <div className="acc-txt-div">
          <h3>Admin</h3>
        </div>
        <div className="acc-parent flex flex-col w-[97%] bg-sidebar-bg h-[30%] justify-center">
          <div className="acc-div flex w-full">
            <div className="acc-icon">
              <MdManageAccounts className="w-[100px] h-[100px]" />
            </div>
            {adminData ? (
              <div className="adm-acc-div pt-[4vh] pr-[30vh] w-full">
                <label>
                  Username: <label className="admin-lbl pl-[4px]">{adminData.username}</label>
                </label>
                <br />
                <label>
                  Password: <label className="admPass-lbl pl-[10px]">{maskPassword(adminData.password)}</label>
                </label>
              </div>
            ) : (
              <p>Loading Admin Data</p>
            )}
            <div className="btn-div pt-[4vh] w-full">
              <button
                onClick={() => openUpdAccModal(12134)}
                className="adm-upd-acc-btn text-white bg-accent hover:bg-slate-400 w-[50%] h-[50%] rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="acc-txt-div">
          <h3>Staff</h3>
        </div>
        <div className="acc-parent flex flex-col w-[97%] bg-sidebar-bg h-[30%] justify-center">
          <div className="acc-div flex w-full">
            <div className="acc-icon">
              <MdManageAccounts className="w-[100px] h-[100px]" />
            </div>
            {staffData ? (
              <div className="adm-acc-div pt-[4vh] pr-[30vh] w-full">
                <label>
                  Username: <label className="staff-lbl pl-[4px]">{staffData.username}</label>
                </label>
                <br />
                <label>
                  Password: <label className="stPass-lbl pl-[10px]">{maskPassword(staffData.password)}</label>
                </label>
              </div>
            ) : (
              <p>Loading Staff Data</p>
            )}
            <div className="btn-div pt-[4vh] w-full">
              <button
                onClick={() => openUpdAccModal(14563)}
                className="st-upd-acc-btn text-white bg-accent hover:bg-slate-400 w-[50%] h-[50%] rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {isUpdAccountModalVisible && selectedUser && (
        <UpdateAccModal user={selectedUser} onClose={closeUpdAccModal} onUpdate={handleUpdate} />
      )}

      {isSuccessfullyModal && <Successfully onConfirm={hideSuccessfullyModal} />}
    </div>
  );
}

export default Accounts;
