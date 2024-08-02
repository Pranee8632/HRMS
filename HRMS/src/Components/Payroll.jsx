import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [editablePayroll, setEditablePayroll] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = () => {
    axios
      .get("http://localhost:3000/api/payroll")
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

  const handleEdit = (payroll) => {
    setEditablePayroll({
      ...payroll,
      pay_period_start: formatDate(payroll.pay_period_start),
      pay_period_end: formatDate(payroll.pay_period_end),
      payment_date: payroll.payment_date
        ? formatDate(payroll.payment_date)
        : "",
    });
  };

  const calculateNetPay = (salary, bonus, deductions) => {
    return (
      (parseFloat(salary) || 0) +
      (parseFloat(bonus) || 0) -
      (parseFloat(deductions) || 0)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePayroll((prev) => {
      const updatedPayroll = { ...prev, [name]: value };

      // Calculate net pay after updating the state
      const { salary_amount, bonus, deductions } = updatedPayroll;
      updatedPayroll.net_pay = calculateNetPay(
        salary_amount || 0,
        bonus || 0,
        deductions || 0
      );

      return updatedPayroll;
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Log the updated payroll data for debugging
    console.log("Updated Payroll Data:", editablePayroll);

    // Set payment_date only if status is 'Paid'
    const updatedPayroll = {
      ...editablePayroll,
      salary_amount: parseFloat(editablePayroll.salary_amount) || 0,
      bonus: parseFloat(editablePayroll.bonus) || 0,
      deductions: parseFloat(editablePayroll.deductions) || 0,
      net_pay: parseFloat(editablePayroll.net_pay) || 0,
      pay_period_start: editablePayroll.pay_period_start,
      pay_period_end: editablePayroll.pay_period_end,
      status: editablePayroll.status,
      payment_date:
        editablePayroll.status === "Paid"
          ? new Date().toISOString().split("T")[0]
          : null,
    };

    axios
      .put(
        `http://localhost:3000/api/payroll/${editablePayroll.id}`,
        updatedPayroll
      )
      .then((response) => {
        if (response.data.Status) {
          alert("Payroll updated successfully");
          fetchPayrolls();
          setEditablePayroll(null);
        } else {
          console.error("Failed to update payroll:", response.data.Error);
        }
      })
      .catch((error) => console.error("Error updating payroll:", error));
  };

  return (
    <div className="container mt-3">
      <h2>Payroll List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Employee ID</th>
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
              {/* <td>{payroll.id}</td> */}
              <td>{payroll.employee_Id}</td>
              <td>&#8377; {payroll.salary_amount}</td>
              <td>&#8377; {payroll.bonus}</td>
              <td>&#8377; {payroll.deductions}</td>
              <td>&#8377; {payroll.net_pay}</td>
              <td>{payroll.pay_period_start}</td>
              <td>{payroll.pay_period_end}</td>
              <td>{payroll.status}</td>
              <td>
                {payroll.payment_date
                  ? new Date(payroll.payment_date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(payroll)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editablePayroll && (
        <div className="mt-3">
          <h3>Edit Payroll</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="salaryAmount" className="form-label">
                Salary Amount:
              </label>
              <input
                type="number"
                id="salaryAmount"
                name="salary_amount"
                className="form-control"
                value={editablePayroll.salary_amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bonus" className="form-label">
                Bonus:
              </label>
              <input
                type="number"
                id="bonus"
                name="bonus"
                className="form-control"
                value={editablePayroll.bonus}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deductions" className="form-label">
                Deductions:
              </label>
              <input
                type="number"
                id="deductions"
                name="deductions"
                className="form-control"
                value={editablePayroll.deductions}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="netPay" className="form-label">
                Net Pay:
              </label>
              <input
                type="number"
                id="netPay"
                name="net_pay"
                className="form-control"
                value={editablePayroll.net_pay}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="payPeriodStart" className="form-label">
                Pay Period Start:
              </label>
              <input
                type="date"
                id="payPeriodStart"
                name="pay_period_start"
                className="form-control"
                value={editablePayroll.pay_period_start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="payPeriodEnd" className="form-label">
                Pay Period End:
              </label>
              <input
                type="date"
                id="payPeriodEnd"
                name="pay_period_end"
                className="form-control"
                value={editablePayroll.pay_period_end}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status:
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={editablePayroll.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Payroll
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PayrollList;
