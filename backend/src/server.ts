import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import employeeRouter from "./routes/employee.routes";
dotenv.config()

// create an instance fro the sever
const app = express()

// allow the app recive json 
app.use(express.json())
app.use(cors())

// Router
app.use("/employees",employeeRouter)

// create the listen and the port
const PORT = process.env.PORT || 3500
app.listen(PORT, ()=>{
    console.log(`Server running in port ${PORT}`)
})