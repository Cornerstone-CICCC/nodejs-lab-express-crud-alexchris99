import { Router, Response, Request } from "express";
import {v4 as uuidv4} from "uuid"
import { Employee } from "../types/employee.I";
import { deflate } from "zlib";

// create an instance 
const employeeRouter = Router()

const employees: Employee[] = [
    {id: uuidv4(), fname: "Christian", lname: "Jimenez", age: 25, isMarried: false}
]

// Home route # Get employee list
employeeRouter.get("/",(req:Request,res: Response)=>{
    res.status(200).json(employees)
})

// Add employee
employeeRouter.post("/",(req: Request, res: Response)=>{
    const {fname, lname, age, isMarried} = req.body
    const newEmployee: Employee = {
        id: uuidv4(),
        fname,
        lname,
        age,
        isMarried,
    }
    employees.push(newEmployee)
    res.status(201).send("Employee added succesfully")
}) 

// Search  # Search employees by firstname using query parameter
employeeRouter.get("/search",(req: Request<{},{},{},{name: string}>, res: Response)=>{
    const {name} = req.query
    const personsFound = employees.filter(employee => employee.fname.toLowerCase().includes(name.toLowerCase()))
    if(personsFound.length === 0){
        res.status(404).send("Employee not found")
        return
    }
    res.status(200).json(personsFound)
})



//  # Get one employee by ID
employeeRouter.get("/:id",(req:Request<{id: string}>, res:Response)=>{
    const {id} = req.params
    const indexFound = employees.findIndex(employee => employee.id === id)
    if(indexFound === -1){
        res.status(404).send("Employee not found")
        return
    }
    res.status(200).json(employees[indexFound])
})

// # Update employee by ID
employeeRouter.put("/:id",(req: Request<{id: string},{},Partial<Employee>>, res: Response)=>{
    const {id} = req.params
    const findIndex = employees.findIndex(employee => employee.id === id)
    if(findIndex === -1){
        res.status(404).send("Employee not found")
        return
    }
    const updatedEmployee: Employee = {
            ...employees[findIndex],
            fname: req.body.fname ?? employees[findIndex].fname,
            lname: req.body.lname ?? employees[findIndex].lname,
            age: req.body.age ?? employees[findIndex].age,
            isMarried: req.body.isMarried ?? employees[findIndex].isMarried
        }
    
    employees[findIndex] = updatedEmployee
    res.status(200).send("Employee updated")
})

//  # Delete employee by ID
employeeRouter.delete("/:id",(req: Request<{id: string}>, res: Response)=>{
    const {id} = req.params
    const findIndex = employees.findIndex(employee => employee.id === id)
    if(findIndex === -1){
        res.status(404).send("Employee not found")
        return
    }
    employees.splice(findIndex,1)
    res.status(200).send("Employee deleted")
})

export default employeeRouter