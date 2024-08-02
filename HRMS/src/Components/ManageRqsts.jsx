import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    

const ManageRqsts = () => {
      const [leaveRequests, setLeaveRequests] = useState([]);
    
      useEffect(() => {
        axios.get('http://localhost:3000/auth/getLeave_rqst')
          .then((result) => {
            if (result.data.Status) {
              setLeaveRequests(result.data.results);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);
    
      const handleApprove = (requestId) => {
        axios.post('http://localhost:3000/auth/approve_leave_request', { requestId })
          .then((result) => {
            if (result.data.Status) {
              setLeaveRequests(leaveRequests.map(request =>
                request.id === requestId ? { ...request, status: 'Approved' } : request
              ));
              alert(result.data.message);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
    
      const handleReject = (requestId) => {
        axios.post('http://localhost:3000/auth/reject_leave_request', { requestId })
          .then((result) => {
            if (result.data.Status) {
              setLeaveRequests(leaveRequests.map(request =>
                request.id === requestId ? { ...request, status: 'Rejected' } : request
              ));
              alert(result.data.message);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
    
      return (
        <div className="container mt-3">
          <h3 className="text-center">Manage Leave Requests</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeId}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(request.id)}
                      disabled={request.status !== 'Pending'}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(request.id)}
                      disabled={request.status !== 'Pending'}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
export default ManageRqsts
