import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
// import './Dash.css'

const Dash = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        // navigate('/adminlogin');
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };
  return (
    <div className="container-fluid d-flex p-0">
      {/* sidebar */}
      <div className="sidebar bg-dark text-white">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
          <Link
            to="/dashboard"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 fw-bolder d-none d-sm-inline">WELCOME</span>
          </Link>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-sm-start"
            id="menu"
          >
            <li className="w-100">
              <Link
                to="/dashboard"
                className=" nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-speedometer2 ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">HR Dashboard</span>
              </Link>
            </li>
            {/* <li className="w-100">
              <Link
                to="/dashboard/users"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-person ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Users</span>
              </Link>
            </li> */}
            <li className="w-100">
              <Link
                to="/dashboard/departments"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-columns ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Departments</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/employee"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-people ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Employee</span>
              </Link>
            </li>
            {/* <li className="w-100">
              <Link
                to="/dashboard/activities"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-activity ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Activities</span>
              </Link>
            </li> */}
            <li className="w-100">
              <Link
                to="/dashboard/holidays"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-flag ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Holidays</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/events"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-book ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Events</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/payroll"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-wallet ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Payroll Records</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/add_payroll"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-plus-circle ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Add Payroll</span>
              </Link>
            </li>
            {/* <li className="w-100">
              <Link
                to="/dashboard/accounts"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-cash ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Accounts</span>
              </Link>
            </li> */}
            {/* <li className="w-100">
              <Link
                to="/dashboard/reports"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-files ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Report</span>
              </Link>
            </li> */}
            <li className="w-100" onClick={handleLogout}>
              <Link className="nav-link px-0 align-middle text-white">
                <i className="fs-4 bi-power ms-2 me-2"></i>
                <span className="ms-2 d-none d-sm-inline">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* <div className="nav">
      <div className="nav1">
        <div className="tooltip">
          <i className="fa-regular fa-envelope"></i>
          <div className="tooltip-text">
            <div>
              <p><strong>You have 4 New eMail</strong></p>
              <p>FC James Wert - Just now</p>
              <p>Update GitHub</p>
              <p>FC Folisise Chosielie - 12min ago</p>
              <p>New Messages</p>
              <p>Louis Henry - 38min ago</p>
              <p>Design bug fix</p>
              <p>Debra Stewart - 2hr ago</p>
              <p>Fix Bug</p>
            </div>
          </div>
        </div>
        <div className="tooltip">
          <i className="fa-regular fa-bell"></i>
          <div className="tooltip-text">
            <div>
              <p><strong>You have 4 New Notifications</strong></p>
              <p>Issue Fixed - 9:10 AM</p>
              <p>We have fixed all design bugs with responsive</p>
              <p>New User - 9:15 AM</p>
              <p>I feel great! Thanks team</p>
              <p>Server Warning - 9:17 AM</p>
              <p>Your connection is not private</p>
              <p>2 New Feedback - 9:22 AM</p>
              <p>It will give a smart finishing to your site</p>
            </div>
          </div>
        </div>
        <div className="tooltipp">
          <i className="fa-solid fa-language"></i>
          <div className="tooltip-textt">
            <div className="tooltip-item">
              <img
                src="https://nsdbytes.com/template/oculux/assets/images/flag/gb.svg"
                alt="UK English"
              />
              <p>UK English</p>
            </div>
            <div className="tooltip-item">
              <img
                src="https://nsdbytes.com/template/oculux/assets/images/flag/us.svg"
                alt="US English"
              />
              <p>US English</p>
            </div>
            <div className="tooltip-item">
              <img
                src="https://nsdbytes.com/template/oculux/assets/images/flag/russia.svg"
                alt="Russian"
              />
              <p>Russian</p>
            </div>
            <div className="tooltip-item">
              <img
                src="https://nsdbytes.com/template/oculux/assets/images/flag/arabia.svg"
                alt="Arabic"
              />
              <p>Arabic</p>
            </div>
            <div className="tooltip-item">
              <img
                src="https://nsdbytes.com/template/oculux/assets/images/flag/france.svg"
                alt="French"
              />
              <p>French</p>
            </div>
          </div>
        </div>
        <h2>Mega</h2>
      </div>
      <div className="nav2">
        <input placeholder="Search" className="nav-ph" />
        <div className="add-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <i className="fa-regular fa-message"></i>
      </div>
    </div> */}


      {/* content part */}
      <div className="content flex-grow-1 p-0 m-0">
        <div className="p-2 d-flex justify-content-center shadow">
          <h4>HRMS</h4>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dash;
