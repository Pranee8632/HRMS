import express from "express";
import cors from 'cors';
import {adminRouter} from './routes/AdminRoute.js';
import { employeeRouter } from "./routes/EmployeeRoute.js";
import { eventRouter } from "./routes/EventRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { payrollRouter } from "./routes/Payroll.js";



const app = express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));
app.use(express.json()) //This is used to convert the data into the json format when passed from the frontend
app.use(cookieParser())
app.use('/auth',adminRouter);
app.use('/employee',employeeRouter);
app.use('/api',eventRouter);
app.use('/api',payrollRouter);



app.get('/api/checkAdmin', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ isAdmin: false });
  
    Jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
      if (err) return res.json({ isAdmin: false });
      if (decoded.role === 'admin') return res.json({ isAdmin: true });
      return res.json({ isAdmin: false });
    });
  });

app.use(express.static('Public'))

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    if(token){
        Jwt.verify(token,"jwt_secret_key",(err,decoded) =>{
            if(err) return res.json({Status:flase , Error:"Wrong Token"});
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    }
    else{
        res.json({Status:false,Error: "Not Authenticated"})
    }
}

app.get('/verify',verifyUser,(req,res)=>{
    return res.json({Status:true ,role:req.role,id:req.id})
})


app.listen(3000,()=>{
    console.log("Server is running!!");
})

// npm start