import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
// The Axios library is a popular JavaScript library used for making HTTP requests from both the browser and Node.js environments.

const Login = () => {
    const [values,setValues] = useState({
        email : '',
        password : ''
    })

    const[error,setError] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials=true;

    const handleSubmit = (event) =>{
        event.preventDefault();
        //To prevent the default submission
        axios.post("http://localhost:3000/auth/adminlogin",values)
        .then(result => {
            if(result.data.loginStatus){
                localStorage.setItem("valid",true);
                navigate('/dashboard');
            }
            else{
                setError(result.data.Error);
            }
            
        }

        ) //the result will be having the response that is returned by the server.
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className="text-warning">
                {error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit = {handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' placeholder='Enter Email:' autoComplete='off' className='form-control rounded-10'
                    onChange={(e)=>setValues({...values,email : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password:' className='form-control rounded-10'
                    onChange={(e)=>setValues({...values,password : e.target.value})}/>
                </div>
                <button className='btn btn-success w-100 rounded-20 mb-2'>Log In</button>
                <div className="mb-1">
                    <input type="checkbox" name='tick' id='tick' className='me-2'/>  
                    <label htmlFor="password">Agree with Terms & Conditions</label>

                </div>
            </form>
        </div>
    </div>
  )
}  

export default Login
