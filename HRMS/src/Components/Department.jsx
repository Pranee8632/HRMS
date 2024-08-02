import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Department = () => {
  const location = useLocation();
  // to manage the active state of the buttons based on the current URL. React Router provides hooks like useLocation to help with this.
  const isDepartmentsPage = location.pathname === '/dashboard/departments';
  const isAddDeptPage = location.pathname === '/dashboard/add_dept';

  const [dept,setDept] = useState({})
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/departments')
    .then(result =>{
      if(result.data.Status){
        setDept(result.data.result);
      }
      else{
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err))
  },[]);

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:3000/auth/departments/${id}`)
  //     .then(result => {
  //       if (result.data.Status) {
  //         setDept(dept.filter(department => department.id !== id));
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center heading'>
        <h3>Departments</h3>
      </div>
      <Link to='/dashboard/departments' className={`butn ${isDepartmentsPage ? 'butn-success' : 'butn-outline-success'}`}>
        Departments
      </Link>&nbsp;
      <Link to='/dashboard/add_dept' className={`butn ${isAddDeptPage ? 'butn-success' : 'butn-outline-success'}`}>
        Add Departments
      </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Department Name</th>
              <th>Department Head</th>
              <th>Number of Employees</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {dept.length > 0 ? (
              dept.map((department, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{department.Dept_Name}</td>
                  <td>{department.Dept_Head}</td>
                  <td>{department.Num_Emp}</td>
                  {/* <td>
                    <button 
                      className='btn btn-danger' 
                      onClick={() => handleDelete(department.id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No departments available</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>


    </div>
  );
};

export default Department;



