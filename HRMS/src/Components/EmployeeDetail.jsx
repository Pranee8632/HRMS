import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/checkAdmin")
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container-fluid d-flex p-0">
        {/* sidebar */}
        <div className="sidebar bg-dark text-white">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <div className="mt-3 ">
              <span className="fs-5 fw-bolder d-none d-sm-inline">WELCOME</span>
              <img
                src={`http://localhost:3000/Images/` + employee.image}
                className="emp_det_image ms-3"
              />
            </div>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={`/employee_detail/${id}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/employee_detail/${id}/leave_request/${employee.employeeId}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave Request</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/employee_detail/${id}/track_request/${employee.employeeId}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Track Leaves</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/employee_detail/${id}/events`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-book ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Events</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/employee_detail/${id}/pay_slip/${employee.employeeId}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-wallet ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Pay Slip</span>
                </Link>
              </li>
              {/* here i need to add the payment slips */}
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* content part */}
        <div className="content flex-grow-1 p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>User Profile</h4>
          </div>

          <Outlet context={{ isAdmin }} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
