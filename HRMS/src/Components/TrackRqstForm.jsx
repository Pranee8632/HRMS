import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const TrackRqstForm = () => {
    const { employeeId } = useParams();
    const [leaveRequests, setLeaveRequests] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:3000/employee/leave_requests/${employeeId}`)
        .then((result) => {
          if (result.data.Status) {
            setLeaveRequests(result.data.results);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }, [employeeId]);
  
    return (
      <div className="container mt-3">
        <h3 className="text-center">Track Leaves</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.leaveType}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default TrackRqstForm;
