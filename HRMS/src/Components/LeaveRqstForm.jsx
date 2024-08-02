import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const LeaveRqstForm = () => {
  const { employeeId } = useParams();
  const {id} = useParams();
  const navigate = useNavigate();

    const [leaveDetails, setLeaveDetails] = useState({
        employeeId:employeeId,
        leaveType: "",
        startDate:"",
        endDate:"",
        reason:""
      });

      const handleEnter = (e) => {
        e.preventDefault();
        console.log(leaveDetails);
        axios.post("http://localhost:3000/employee/leave_request",leaveDetails)
        .then((result) => {
        if (result.data.Status) {
            alert(result.data.message);
            navigate(`/employee_detail/${id}`);

        } else {
            alert(result.data.Error);
        }
        })
        .catch((err) => console.log(err));
    };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Leave Type:</label>
    //     <input 
    //       type="text" 
    //       value={leaveType} 
    //       onChange={(e) => setLeaveType(e.target.value)} 
    //     />
    //   </div>
    //   <div>
    //     <label>Start Date:</label>
    //     <input 
    //       type="date" 
    //       value={startDate} 
    //       onChange={(e) => setStartDate(e.target.value)} 
    //     />
    //   </div>
    //   <div>
    //     <label>End Date:</label>
    //     <input 
    //       type="date" 
    //       value={endDate} 
    //       onChange={(e) => setEndDate(e.target.value)} 
    //     />
    //   </div>
    //   <div>
    //     <label>Reason:</label>
    //     <textarea 
    //       value={reason} 
    //       onChange={(e) => setReason(e.target.value)} 
    //     ></textarea>
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Leave Request</h3>
      <form className="row g-1" onSubmit={handleEnter}>
        <div className="col-12">
            <label htmlFor="Leavetype" className="form-label">Leave Type:</label>
            <select class="form-select" name='leaveType' id='LeaveType'
            onChange={(e) =>
              setLeaveDetails({ ...leaveDetails, leaveType: e.target.value })
            } >
                <option value="" disabled selected>Select Leave Type:</option>
                <option value="Casual">Casual Leave</option>
                <option value="Medical">Medical Leave</option>
            </select>
        </div>
        <div className="col-12">
          <label htmlFor="StartDate" className="form-label">Start date:</label>
          <input type="date" className="form-control rounded-0" id="StartDate"  placeholder="Start Date" autoComplete="off" name='startDate' 
          onChange={(e) =>
            setLeaveDetails({ ...leaveDetails, startDate: e.target.value })
          } />
        </div>
        <div className="col-12">
          <label htmlFor="EndDate" className="form-label">End date:</label>
          <input type="date" className="form-control rounded-0" id="EndDate"  placeholder="End Date" autoComplete="off" name='endDate'
          onChange={(e) =>
            setLeaveDetails({ ...leaveDetails, endDate: e.target.value })
          }/>
        </div>
        <div className="col-12">
          <label htmlFor="inputReason" className="form-label">Reason</label>
          <input type="text" className="form-control rounded-0" id="inputReason"  placeholder="reason" autoComplete="off" name='reason' onChange={(e) =>
            setLeaveDetails({ ...leaveDetails, reason: e.target.value })
          }/>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Send Request</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default LeaveRqstForm;

