import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPayroll = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [bonus, setBonus] = useState('');
  const [deductions, setDeductions] = useState('');
  const [netPay, setNetPay] = useState('');
  const [payPeriodStart, setPayPeriodStart] = useState('');
  const [payPeriodEnd, setPayPeriodEnd] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        if (response.data.Status) {
          setEmployees(response.data.result);
        }
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    calculateNetPay();
  }, [salaryAmount, bonus, deductions]);

  const handleEmployeeChange = (e) => {
    const selectedEmployeeId = e.target.value;
    setEmployeeId(selectedEmployeeId);
    
    const selectedEmployee = employees.find(emp => emp.employeeId === selectedEmployeeId);
    if (selectedEmployee) {
      setSalaryAmount(selectedEmployee.salary);
      setNetPay(selectedEmployee.salary); // Optionally set netPay to salaryAmount initially
    }
  };

  const calculateNetPay = () => {
    const salary = parseFloat(salaryAmount) || 0;
    const bonusAmount = parseFloat(bonus) || 0;
    const deductionAmount = parseFloat(deductions) || 0;

    const calculatedNetPay = salary + bonusAmount - deductionAmount;
    setNetPay(calculatedNetPay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payrollData = { employeeId, salaryAmount, bonus, deductions, netPay, payPeriodStart, payPeriodEnd };

    axios.post('http://localhost:3000/api/add_payroll', payrollData)
      .then(response => {
        if (response.data.Status) {
          alert('Payroll added successfully');
          window.location.reload();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
      <form onSubmit={handleSubmit} className="w-50 p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">Employee ID:</label>
          <select id="employeeId" className="form-select" value={employeeId} onChange={handleEmployeeChange} required>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.employeeId} value={emp.employeeId}>{emp.employeeId}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salaryAmount" className="form-label">Salary Amount:</label>
          <input type="number" id="salaryAmount" className="form-control" value={salaryAmount} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="bonus" className="form-label">Bonus:</label>
          <input type="number" id="bonus" className="form-control" value={bonus} onChange={(e) => setBonus(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="deductions" className="form-label">Deductions:</label>
          <input type="number" id="deductions" className="form-control" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="netPay" className="form-label">Net Pay:</label>
          <input type="number" id="netPay" className="form-control" value={netPay} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="payPeriodStart" className="form-label">Pay Period Start:</label>
          <input type="date" id="payPeriodStart" className="form-control" value={payPeriodStart} onChange={(e) => setPayPeriodStart(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="payPeriodEnd" className="form-label">Pay Period End:</label>
          <input type="date" id="payPeriodEnd" className="form-control" value={payPeriodEnd} onChange={(e) => setPayPeriodEnd(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '20px' }}>Add Payroll</button>
      </form>
    </div>
  );
};

export default AddPayroll;
