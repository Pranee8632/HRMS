import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from 'path';


const router = express.Router(); //Using express.Router allows you to organize your routes and middleware in a more modular and maintainable way.


// Admin Login API endpoint
router.post("/adminlogin", (req, res) => {
  // res.send("successfully done!!")
  // console.log(req.body)
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email; //result will be in an array format
      const token = jwt.sign(
        { role: "admin", email: email , id:result[0].id }, 
        "jwt_secret_key",
        { expiresIn: "1d" }
      ); //cookie will be expired in one day
      //this is a token and we will be storing this token in the browser cookies
      res.cookie('token',token)
      return res.json({loginStatus:true}); 
    }
    else{
        return res.json({ loginStatus: false, Error: "Wrong Email or password" });
    }
  });
});


// Adding department API endpoint
router.post('/add_dept',(req,res)=>{
  const sql = "INSERT INTO department (`Dept_Name`,`Dept_Head`,`Num_Emp`) VALUES (?,?,?)"
  con.query(sql,[req.body.dept_name,req.body.dept_head,req.body.num_employee],(err,result)=>{
    if(err) return res.json({Status:false,Error:"Query Error"})
    return res.json({Status:true})
  })
})


// List of the Dept API endpoint
router.get('/departments',(req,res)=>{
  const sql = "SELECT * from department";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:"Query Error"})
    return res.json({Status:true,result})
  })
})


// Image Upload
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,'public/Images')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage:storage
})

//Adding an employee API endpoint
router.post('/add_employee',upload.single('image'),(req,res)=>{
  const sql = `INSERT INTO employee 
  (name,employeeId,email,password,salary,address,image,deptId) 
  VALUES (?)`;
  // multiline query

  // To hash the password and save it in the database we use this bcrypt
  // 10 is the salt number , that is that many unique characters will be added
  bcrypt.hash(req.body.password, 10, (err,hash) => {
    if(err) return res.json({Status:false,Error:"Hashing Error"});
    const values = [
      req.body.name,
      req.body.employeeId,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.file.filename,
      req.body.deptId
    ]
    con.query(sql,[values],(err,result)=>{
      if(err) return res.json({Status:false,Error:err.message});
      return res.json({Status:true});
    })
  })
})

// List of the Employees API endpoint
router.get('/employee',(req,res)=>{
  const sql = "SELECT * from employee";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:"Query Error"})
    return res.json({Status:true,result})
  })
})


// Fetching the details of the employee with particular id
router.get('/employee/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * from employee WHERE id = ?";
    con.query(sql,[id],(err,result)=>{
      if(err) return res.json({Status:false,Error:"Query Error"})
      return res.json({Status:true,Result:result})
    })
})

//restoring the details of employee with particular id after editing the details
router.put('/edit_employee/:id', (req,res)=>{
  const id = req.params.id;
  const sql = `UPDATE employee 
  set name= ?, employeeId =?,email= ?,salary= ?,address= ?,deptId= ?
  WHERE id = ?`;
  const values = [
    req.body.name,
    req.body.employeeId,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.deptId
  ]
  con.query(sql,[...values,id],(err,result)=>{
    if(err) return res.json({Status:false,Error:"Query Error"+err})
    return res.json({Status:true,Result:result})
  })
})

// For deleting the details of an employee with particular id
router.delete('/delete_employee/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "DELETE from employee where id = ?";
  con.query(sql,[id],(err,result)=>{
    if(err) return res.json({Status:false,Error:"Query Error"+err})
    return res.json({Status:true,Result:result})
  })


})

// to get the total count of the admins 
router.get('/admin_count',(req,res)=>{
  const sql = "SELECT count(id) as admin from admin";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false , Error :"Query Error"+err})
    return res.json({Status:true,Result:result})
  })
})

//to get the total count of the employees
router.get('/employee_count',(req,res)=>{
  const sql = "SELECT count(id) as employee from employee";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false , Error :"Query Error"+err})
    return res.json({Status:true,Result:result})
  })
})


//To get the total count
router.get('/salary_count',(req,res)=>{
  const sql = "SELECT sum(salary) as salary from employee";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false , Error :"Query Error"+err})
    return res.json({Status:true,Result:result})
  })
})


// To get the total list of the admins
router.get('/admin_records',(req,res)=>{
  const sql = "SELECT * from admin";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false , Error :"Query Error"+err})
    return res.json({Status:true,Result:result})
  })
})

// To logout
router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json({Status:true})
})


// Fetch all leave requests
router.get('/getLeave_rqst', (req, res) => {
  const sql = 'SELECT * FROM leaverequests';
  con.query(sql, (err, results) => {
      if (err) return res.json({ Status: false, Error: "Query error" + err });
      return res.json({ Status: true, results });
  });
});


// Approve a leave request
router.post('/approve_leave_request', (req, res) => {
  const { requestId } = req.body;
  const sql = 'UPDATE leaverequests SET status = ? WHERE id = ?';
  con.query(sql, ['Approved', requestId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query error" + err });
      return res.json({ Status: true, message: 'Leave request approved successfully' });
  });
});

// Reject a leave request
router.post('/reject_leave_request', (req, res) => {
  const { requestId } = req.body;
  const sql = 'UPDATE leaverequests SET status = ? WHERE id = ?';
  con.query(sql, ['Rejected', requestId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query error" + err });
      return res.json({ Status: true, message: 'Leave request rejected successfully' });
  });
});



export { router as adminRouter };
