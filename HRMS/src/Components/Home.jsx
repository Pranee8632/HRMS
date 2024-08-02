import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';


const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [SalaryTotal, setSalaryTotal] = useState(0)
  const [admins,setAdmins] = useState([])

  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  },[])

  const adminRecords = () =>{
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result =>{
      if(result.data.Status){
        setAdmins(result.data.Result);
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err));

  }

  const adminCount = ()=>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result =>{
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin);
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err));
  }

  const employeeCount = () =>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.Status){
        setEmployeeTotal(result.data.Result[0].employee);
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err));
  }

  const salaryCount = () =>{
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result =>{
      if(result.data.Status){
        setSalaryTotal(result.data.Result[0].salary);
      }
      else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err));
  }


  // data for the charts
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div >
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{SalaryTotal}</h5>
          </div>
        </div>

      </div>

      {/* List of admin  */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* for the charts */}
      <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
          }}
          >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
              <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
          </ResponsiveContainer>
      </div>
  </div>
  )
}

export default Home
