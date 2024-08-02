import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
const Employee = () => {

  const [employee,setEmployee] =useState([]);
  const navigate = useNavigate();


  const location = useLocation();
  // to manage the active state of the buttons based on the current URL. React Router provides hooks like useLocation to help with this.
  const currentPath = location.pathname;
  const isEmployeePage = currentPath === '/dashboard/employee';
  const isAddEmployeePage = currentPath === '/dashboard/add_employee';
  const isLeaveReqPage = currentPath === '/dashboard/leave_req';

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/employee')
    .then(result =>{
      if(result.data.Status){
        setEmployee(result.data.result);
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  },[])

  const handleDelete = (id) =>{
    axios.delete('http://localhost:3000/auth/delete_employee/'+ id)
    .then(result =>{
      if(result.data.Status){
        window.location.reload();
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }


  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center heading'>
        <h3>Employees</h3>
      </div>
      <Link to='/dashboard/employee' className={`butn ${isEmployeePage ? 'butn-success' : 'butn-outline-success'}`}>
        All Employee
      </Link>&nbsp;
      <Link to='/dashboard/add_employee' className={`butn ${isAddEmployeePage ? 'butn-success' : 'butn-outline-success'}`} >
        Add
      </Link>
      <Link to='/dashboard/manage_req' className={`butn ${isLeaveReqPage ? 'butn-success' : 'butn-outline-success'}`}>
        Manage Request
      </Link>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Emp Id</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.employeeId}</td>
                  <td>
                    <img className='employee_img' src={`http://localhost:3000/Images/` + e.image} alt="" />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/`+e.id}><button className='btn btn-info btn-sm me-2'>Edit</button></Link>
                    <button className='btn btn-warning btn-sm' onClick={()=>handleDelete(e.id)}>Delete</button>
                  </td>
                  
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Employee

