import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router();

// Employee Login API endpoint
router.post("/employeelogin", (req, res) => {
    // res.send("successfully done!!")
    // console.log(req.body)
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password,result[0].password ,(err,response)=>{
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response){
                const email = result[0].email; //result will be in an array format
                const token = jwt.sign(
                { role: "employee", email: email,id:result[0].id }, 
                "jwt_secret_key",
                { expiresIn: "1d" }
                );
                res.cookie('token',token)
                return res.json({loginStatus:true,id:result[0].id}); 
            }
        })
         //cookie will be expired in one day
        //this is a token and we will be storing this token in the browser cookies
      }
      else{
          return res.json({ loginStatus: false, Error: "Wrong Email or password" });
      }
    });
});


// Employee id details endpoint
router.get('/detail/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * from employee where id = ?"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json(result)
    })
});



// Add a new leave request
router.post('/leave_request', (req, res) => {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;
    const sql = 'INSERT INTO leaverequests (employeeId, leaveType, startDate, endDate, reason) VALUES (?, ?, ?, ?, ?)';
    con.query(sql, [employeeId, leaveType, startDate, endDate, reason], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error"+err });
        return res.json({ Status: true, message: 'Leave request sent successfully' });
    });
});



// Fetch leave requests for an employee
router.get('/leave_requests/:employeeId', (req, res) => {
    const { employeeId } = req.params;
    const sql = 'SELECT * FROM leaverequests WHERE employeeId = ?';
    con.query(sql, [employeeId], (err, results) => {
        if (err) return res.json({ Status: false, Error: "Query error" + err });
        return res.json({ Status: true, results });
    });
});




//logout 
router.get('/logout',(req,res) =>{
    res.clearCookie('token')
    return res.json({Status:true})
})


export { router as employeeRouter };