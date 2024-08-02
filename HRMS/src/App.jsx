import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import Dash from './Components/Dash'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './Components/Home'
import Users from './Components/Users'
import Accounts from './Components/Accounts'
import Activities from './Components/Activities'
import Department from './Components/Department'
import Employee from './Components/Employee'
import Events from './Components/Events'
import Holidays from './Components/Holidays'
import Payroll from './Components/Payroll'
import Report from './Components/Report'
import AddDept from './Components/AddDept'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import SuperAdminLogin from './Components/SuperAdminLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import UserProfile from './Components/UserProfile'
import LeaveRqstForm from './Components/LeaveRqstForm'
import TrackRqstForm from './Components/TrackRqstForm'
import ManageRqsts from './Components/ManageRqsts'
import AddPayroll from './Components/AddPayroll';
import { useEffect, useState } from 'react'
import axios from 'axios'
import UserPayrollList from './Components/UserPayrollList'

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/checkAdmin')
      .then(response => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route> 
        <Route path='/employeelogin' element={<EmployeeLogin/>}></Route> 
        <Route path='/superAdminlogin' element={<SuperAdminLogin/>}></Route>
        <Route path='/employee_detail/:id' element={<EmployeeDetail />}>
          <Route path='' element={<UserProfile />} ></Route>
          <Route path='/employee_detail/:id/leave_request/:employeeId' element={<LeaveRqstForm />} ></Route>
          <Route path='/employee_detail/:id/track_request/:employeeId' element={<TrackRqstForm/>} ></Route>
          <Route path='/employee_detail/:id/pay_slip/:employeeId' element={<UserPayrollList/>} ></Route>
          <Route path='/employee_detail/:id/events' element={<Events isAdmin={isAdmin}/>} ></Route>
        </Route> 
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dash />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />} ></Route>
          <Route path='/dashboard/users' element={<Users />} ></Route>
          <Route path='/dashboard/departments' element={<Department />} ></Route>
          <Route path='/dashboard/employee' element={<Employee />} ></Route>
          <Route path='/dashboard/activities' element={<Activities />} ></Route>
          <Route path='/dashboard/holidays' element={<Holidays />} ></Route>
          <Route path='/dashboard/events' element={<Events isAdmin={isAdmin} />} ></Route>
          <Route path='/dashboard/payroll' element={<Payroll/>} ></Route>
          <Route path='/dashboard/add_payroll' element={<AddPayroll />} />
          <Route path='/dashboard/accounts' element={<Accounts />} ></Route>
          <Route path='/dashboard/reports' element={<Report />} ></Route>
          <Route path='/dashboard/add_dept' element={<AddDept />} ></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee/>} ></Route>
          <Route path='/dashboard/manage_req' element={<ManageRqsts/>} ></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>
        </Route> 
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
