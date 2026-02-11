import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import { RiAddCircleLine, RiLogoutCircleLine, RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/CoffitoLogo (40 x 40 px).png";

function Sidebar({ onLogout }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownClick = (route) => {
    navigate(route);
  };

  return (
    <div className="nav-con">
      <ul>
        <li className="pl-5 mb-1 mt-3 ml-[-10px]">
          <Link to="/" className="flex items-center">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <h5>CoFFito Cafe</h5>
          </Link>
        </li>

        <li className="nav-li-hover">
          <Link to="/dashboard" className="nav-a">
            <span className="icon">
              <MdSpaceDashboard />
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>

        <li className="nav-li-hover">
          <Link to="/product" className="nav-a">
            <span className="icon">
              <RiAddCircleLine />
            </span>
            <span className="title">Product</span>
          </Link>
        </li>

        <li className="cursor-pointer nav-li-hover-sales">
          <div onClick={toggleDropdown} className="nav-a">
            <span className="icon">
              <SlGraph />
            </span>
            <span className="flex items-center gap-1">
              Sales Report <IoMdArrowDropdown />
            </span>
          </div>

          {isDropdownVisible && (
            <ul className="flex flex-col ml-9 mb-2">
              <li onClick={() => handleDropdownClick("/sales-report/daily")} className="dropdown-item">
                Daily Sales
              </li>
              <li onClick={() => handleDropdownClick("/sales-report/monthly")} className="dropdown-item">
                Monthly Sales
              </li>
              <li onClick={() => handleDropdownClick("/sales-report/yearly")} className="dropdown-item">
                Yearly Sales
              </li>
              <li onClick={() => handleDropdownClick("/transaction")} className="dropdown-item">
                Transaction
              </li>
              <li onClick={() => handleDropdownClick("/item-sold")} className="dropdown-item">
                Item Sold
              </li>
            </ul>
          )}
        </li>

        <li className="nav-li-hover">
          <Link to="/accounts" className="nav-a">
            <span className="icon">
              <RiAccountCircleLine />
            </span>
            <span className="title">Account</span>
          </Link>
        </li>

        <li className="nav-li-hover">
          <Link onClick={onLogout} className="nav-a">
            <span className="icon">
              <RiLogoutCircleLine />
            </span>
            <span className="title">Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
