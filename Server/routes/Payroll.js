// Backend: routes/payroll.js
import pdf from 'pdfkit';
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import con from '../utils/db.js';

const router = express.Router();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// add payroll
router.post('/add_payroll', (req, res) => {
    console.log("Resceived"+req.body);
    const { employeeId, salaryAmount,bonus, deductions, netPay, payPeriodStart, payPeriodEnd } = req.body;

    // Validate incoming data
    if (!employeeId || !salaryAmount || !payPeriodStart || !payPeriodEnd) {
        return res.status(400).json({ Status: false, Error: "Missing required fields" });
    }

    const sql = `INSERT INTO payroll 
    (employee_Id, salary_amount,bonus, deductions, net_pay, pay_period_start, pay_period_end) 
    VALUES (?, ?, ?,?, ?, ?, ?)`;

    const values = [employeeId, salaryAmount,bonus, deductions, netPay, payPeriodStart, payPeriodEnd];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Query Error: ", err);
            return res.status(500).json({ Status: false, Error: "Query Error"+err });
        }
        return res.status(200).json({ Status: true, message: "Payroll added successfully" });
    });
});


//view all payroll records
router.get('/payroll', (req, res) => {
    const sql = "SELECT * FROM payroll";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, result });
    });
});

// view pay roll of particular id
router.get('/payroll/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM payroll WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, result });
    });
});

// Update payroll
router.put('/payroll/:id', (req, res) => {
    const id = req.params.id;
    const { salary_amount, bonus, deductions, net_pay, pay_period_start, pay_period_end, status } = req.body;

    console.log('Request Body:', req.body);  // Log request body

    let sql = `UPDATE payroll 
    SET salary_amount = ?, bonus = ?, deductions = ?, net_pay = ?, pay_period_start = ?, pay_period_end = ?, status = ?`;

    const values = [salary_amount, bonus, deductions, net_pay, pay_period_start, pay_period_end, status];

    if (status === 'Paid') {
        sql += ', payment_date = NOW()';
    }else {
    sql += ', payment_date = NULL'; 
}

    sql += ' WHERE id = ?';
    values.push(id);

    console.log("SQL Query:", sql);  // Log the SQL query
    console.log("Values:", values); // Log the values

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({ Status: false, Error: "Query Error" + err });
        }
        console.log("Update Result:", result);  // Log the update result
        return res.json({ Status: true, result });
    });
});

// Fetch all employees with their salaries
router.get('/employees', (req, res) => {
    const sql = "SELECT employeeId, salary FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, result });
    });
});

// Get payroll records for a specific employee
router.get('/payroll/employee/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const sql = "SELECT * FROM payroll WHERE employee_Id = ?";
    con.query(sql, [employeeId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, result });
    });
});


// Generate and download payroll slip
// router.get('/payroll/slip/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM payroll WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         if (result.length === 0) return res.status(404).json({ Status: false, Error: "Payroll record not found" });

//         const payroll = result[0];
//         const doc = new pdf();
//         const fileName = `payroll_slip_${payroll.id}.pdf`;
//         const tempDir = path.join(__dirname, '..', 'tmp');
//         const tempPath = path.join(tempDir, fileName);

//         // Create a temporary directory if it doesn't exist
//         if (!fs.existsSync(tempDir)) {
//             fs.mkdirSync(tempDir);
//         }

//         // Log the file paths for debugging
//         console.log(`Generating PDF at path: ${tempPath}`);

//         const writeStream = fs.createWriteStream(tempPath);

//         doc.pipe(writeStream);

//         doc.text(`Employee ID: ${payroll.employee_Id}`);
//         doc.text(`Salary Amount: &#8377; ${payroll.salary_amount}`);
//         doc.text(`Bonus: &#8377; ${payroll.bonus}`);
//         doc.text(`Deductions: &#8377; ${payroll.deductions}`);
//         doc.text(`Net Pay: &#8377;${payroll.net_pay}`);
//         doc.text(`Pay Period Start: ${payroll.pay_period_start}`);
//         doc.text(`Pay Period End: ${payroll.pay_period_end}`);
//         doc.text(`Status: ${payroll.status}`);
//         doc.text(`Payment Date: ${payroll.payment_date || 'N/A'}`);
//         doc.end();

//         writeStream.on('finish', () => {
//             console.log(`PDF generation completed: ${tempPath}`);
//             res.download(tempPath, fileName, (err) => {
//                 if (err) {
//                     console.error("Download Error: ", err);
//                     return res.status(500).json({ Status: false, Error: "Download Error" });
//                 }
//                 console.log(`Download completed, deleting file: ${tempPath}`);
//                 fs.unlinkSync(tempPath); // Remove file after download
//             });
//         });

//         writeStream.on('error', (err) => {
//             console.error("WriteStream Error: ", err);
//             return res.status(500).json({ Status: false, Error: "PDF Generation Error" });
//         });
//     });
// });

router.get('/payroll/slip/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM payroll WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        if (result.length === 0) return res.status(404).json({ Status: false, Error: "Payroll record not found" });

        const payroll = result[0];
        const doc = new pdf();
        const fileName = `payroll_slip_${payroll.id}.pdf`;
        const tempDir = path.join(__dirname, '..', 'tmp');
        const tempPath = path.join(tempDir, fileName);

        // Create a temporary directory if it doesn't exist
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Log the file paths for debugging
        console.log(`Generating PDF at path: ${tempPath}`);

        const writeStream = fs.createWriteStream(tempPath);
        doc.pipe(writeStream);

        // Set document title and metadata
        doc.fontSize(16).font('Helvetica-Bold').text('Payroll Slip', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).font('Helvetica');

        // Employee details
        doc.text(`Employee ID: ${payroll.employee_Id}`);
        doc.moveDown(0.5);

        // Payroll details
        doc.text('Salary Details:', { underline: true });
        doc.moveDown(0.5);
        doc.text(`Salary Amount: ${payroll.salary_amount}`, { continued: true, align: 'left' });
        doc.text(`Bonus: ${payroll.bonus}`, { align: 'right' });
        doc.text(`Deductions: ${payroll.deductions}`, { align: 'left' });
        doc.moveDown(0.5);
        doc.font('Helvetica-Bold').text(`Net Pay: ${payroll.net_pay}`, { align: 'left' });
        doc.font('Helvetica').moveDown(1);

        // Pay period
        doc.text('Pay Period:', { underline: true });
        doc.moveDown(0.5);
        doc.text(`Start Date: ${new Date(payroll.pay_period_start).toDateString()}`);
        doc.text(`End Date: ${new Date(payroll.pay_period_end).toDateString()}`);
        doc.moveDown(1);

        // Status
        doc.text('Payment Status:', { underline: true });
        doc.moveDown(0.5);
        doc.text(`Status: ${payroll.status}`);
        if (payroll.payment_date) {
            doc.text(`Payment Date: ${new Date(payroll.payment_date).toDateString()}`);
        }

        doc.end();

        writeStream.on('finish', () => {
            console.log(`PDF generation completed: ${tempPath}`);
            res.download(tempPath, fileName, (err) => {
                if (err) {
                    console.error("Download Error: ", err);
                    return res.status(500).json({ Status: false, Error: "Download Error" });
                }
                console.log(`Download completed, deleting file: ${tempPath}`);
                fs.unlinkSync(tempPath); // Remove file after download
            });
        });

        writeStream.on('error', (err) => {
            console.error("WriteStream Error: ", err);
            return res.status(500).json({ Status: false, Error: "PDF Generation Error" });
        });
    });
});




export { router as payrollRouter };

