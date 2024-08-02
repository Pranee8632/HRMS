import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    // useParams ->take the info of the particular id from the url given
    const {id} = useParams()

    const [employee, setEmployee] = useState({
      name: "",
      employeeId:"",
      email: "",
      salary: "",
      address: "",
      deptId:""
    });

    const [category,setCategory] = useState({})

    const navigate = useNavigate();
    
    useEffect(()=>{

      // To fetch the departments
      axios.get('http://localhost:3000/auth/departments')
      .then(result =>{
        if(result.data.Status){
          setCategory(result.data.result);
        }
        else{
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err))

      // to fetch the details of that id
      axios.get('http://localhost:3000/auth/employee/' + id)
      .then(result =>{
          setEmployee({
            ...employee,
            name:result.data.Result[0].name,
            employeeId:result.data.Result[0].employeeId,
            email:result.data.Result[0].email, 
            salary:result.data.Result[0].salary,
            address:result.data.Result[0].address,
           deptId:result.data.Result[0].deptId
          })
          
      })
      .catch(err => console.log(err))
    },[]);


    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
      .then(result =>{
        if(result.data.Status){
            navigate('/dashboard/employee')
        }
        else{
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
    }


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control rounded-0" id="inputName" placeholder="Enter Name" value={employee.name} 
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Employee Id</label>
            <input type="text" className="form-control rounded-0" id="inputName" placeholder="Enter Name" value={employee.employeeId} 
              onChange={(e) =>
                setEmployee({ ...employee, employeeId: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control rounded-0" id="inputEmail4"  placeholder="Enter Email" autoComplete="off" value={employee.email} 
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }/>
          </div>
          <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">Salary</label>
            <input type="number" className="form-control rounded-0" id="inputSalary"  placeholder="Enter Salary" autoComplete="off" value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control rounded-0" id="inputAddress"  placeholder="1234 Main St" autoComplete="off" value={employee.address} 
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }/>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Department</label>
            <select  name="deptId" className="form-select" onChange={(e) =>
                setEmployee({ ...employee, deptId: e.target.value })
              }>
                <option value="" disabled>Select Department</option>
              {category && category.length > 0 ? (
                category.map((c) => (
                  <option value={c.id}>{c.Dept_Name}</option>
                ))
              ) : (
                <option value="" disabled>No categories available</option>
              )}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Edit Employee</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee
