import axios from 'axios'
import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Add_dept = () => {
    const [dept ,setDept] = useState({
        dept_name: '',
        dept_head: '',
        num_employee:''
    })

    const navigate = useNavigate();

    const handleSubmit= (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_dept',dept)
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard/departments')
            }
            else{
                alert(result.data.error);
            }
        })
        .catch(err => console.log(err))
    }

    const handleClose = () => {
        setDept({
          dept_name: '',
          dept_head: '',
          num_employee: ''
        });
        navigate('/dashboard/departments');
      };
      
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='mb-3'>Add Department</h2>
                <form>
                    <div className='mb-2'>
                        {/* <label htmlFor="dept_name"><strong>Department</strong></label> */}
                        <input type="text" name='dept_name' placeholder='Department Name'
                        onChange={(e) => setDept({...dept,dept_name: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-2'>
                        <input type="text" name='dept_head' placeholder='Department Head'
                        onChange={(e) => setDept({...dept,dept_head: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-2'>
                        <input type="number" name='num_employee' placeholder='Number of Exployee'
                        onChange={(e) => setDept({...dept,num_employee: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button className='light w-auto rounded-2 mb-2 p-2 pe-3 ps-3' onClick={handleSubmit}>Add</button>
                    <button className='dark w-auto rounded-2 mb-2 p-2 pe-3 ps-3' onClick={handleClose}>Close</button>
                </form>
            </div>
    </div>
  )
}

export default Add_dept
