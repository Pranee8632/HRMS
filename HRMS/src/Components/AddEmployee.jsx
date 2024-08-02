import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    employeeId:"",
    email: "",
    password: "",
    salary: "",
    address: "",
    deptId:"",
    image:null
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();


//   To fetch the categories from the database
useEffect(() => {
axios.get("http://localhost:3000/auth/departments")
    .then((result) => {
    if (result.data.Status) {
        setCategory(result.data.result);
    } else {
        alert(result.data.Error);
    }
    })
    .catch((err) => console.log(err));
}, []);

const handleEnter = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',employee.name);
    formData.append('employeeId',employee.employeeId);
    formData.append('email',employee.email);
    formData.append('password',employee.password);
    formData.append('address',employee.address);
    formData.append('salary',employee.salary);
    formData.append('image',employee.image);
    formData.append('deptId',employee.deptId);


    axios.post("http://localhost:3000/auth/add_employee",formData)
    .then((result) => {
    if (result.data.Status) {
        navigate("/dashboard/employee");
    } else {
        alert(result.data.Error);
    }
    })
    .catch((err) => console.log(err));
};


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleEnter}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control rounded-0" id="inputName" placeholder="Enter Name" name='name'
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              } />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmpId" className="form-label">Employee Id</label>
            <input type="text" className="form-control rounded-0" id="inputEmpId" placeholder="Enter Employee Id" autoComplete="off" name='employeeId'
              onChange={(e) =>
                setEmployee({ ...employee, employeeId: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control rounded-0" id="inputEmail4"  placeholder="Enter Email" autoComplete="off" name='email'
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input type="password" className="form-control rounded-0" id="inputPassword4"  placeholder="Enter Password" name='password'
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }/>
            <label htmlFor="inputSalary" className="form-label">Salary</label>
            <input type="number" className="form-control rounded-0" id="inputSalary"  placeholder="Enter Salary" autoComplete="off" name='salary'
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control rounded-0" id="inputAddress"  placeholder="1234 Main St" autoComplete="off" name='address'
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Department</label>
            <select  name="deptId" className="form-select" onChange={(e) =>
                setEmployee({ ...employee, deptId: e.target.value })
              }>
                <option value="" disabled selected>Select Department</option>
                {category.map((c) => (
                  <option key={c.id} value={c.id}>{c.Dept_Name}</option>
                ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
            <input type="file" className="form-control rounded-0" id="inputGroupFile01" name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }/>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
