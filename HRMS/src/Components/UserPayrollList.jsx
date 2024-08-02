import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPayrollList = () => {
  const { employeeId } = useParams();
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, [employeeId]);

  const fetchPayrolls = () => {
    axios
      .get(`http://localhost:3000/api/payroll/employee/${employeeId}`)
      .then((response) => {
        if (response.data.Status) {
          // Convert date format for display
          const formattedPayrolls = response.data.result.map((payroll) => ({
            ...payroll,
            pay_period_start: formatDate(payroll.pay_period_start),
            pay_period_end: formatDate(payroll.pay_period_end),
            payment_date: payroll.payment_date
              ? formatDate(payroll.payment_date)
              : "",
          }));
          setPayrolls(formattedPayrolls);
        } else {
          console.error("Failed to fetch payrolls:", response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching payrolls:", error));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:3000/api/payroll/slip/${id}`, '_blank');
  };

  return (
    <div className="container mt-3">
      <h2>My Payroll</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salary Amount</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Pay Period Start</th>
            <th>Pay Period End</th>
            <th>Status</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.id}>
              <td>&#8377;{payroll.salary_amount}</td>
              <td>&#8377;{payroll.bonus}</td>
              <td>&#8377;{payroll.deductions}</td>
              <td>&#8377;{payroll.net_pay}</td>
              <td>{payroll.pay_period_start}</td>
              <td>{payroll.pay_period_end}</td>
              <td>{payroll.status}</td>
              <td>
                {payroll.payment_date
                  ? new Date(payroll.payment_date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {payroll.status === 'Paid' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(payroll.id)}
                  >
                    Download Slip
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPayrollList;
