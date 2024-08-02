import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const [employee, setEmployee] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:3000/employee/detail/" + id)
        .then((result) => {
        setEmployee(result.data[0]);
        })
        .catch((err) => console.log(err));


    }, []);
  return (
        <div class="container mt-5">
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">User Name:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">{employee.name}</h6>
              </div>
            </div>
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">Employee Id:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">{employee.employeeId}</h6>
              </div>
            </div>
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">Email:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">{employee.email}</h6>
              </div>
            </div>
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">Salary:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">&#x20B9; {employee.salary}</h6>
              </div>
            </div>
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">Department:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">{employee.deptId}</h6>
              </div>
            </div>
            <div class="row m-0 ms-5 me-5">
              <div class="col-md-6 bg-light border p-2">
                <h6 class="text-center">Address:</h6>
              </div>
              <div class="col-md-6  bg-light border p-2">
                <h6 class="text-center">{employee.address}</h6>
              </div>
            </div>
        </div>
  )
}

export default UserProfile
