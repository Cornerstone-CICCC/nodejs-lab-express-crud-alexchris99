"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
// create an instance 
const employeeRouter = (0, express_1.Router)();
const employees = [
    { id: (0, uuid_1.v4)(), fname: "Christian", lname: "Jimenez", age: 25, isMarried: false }
];
// Home route # Get employee list
employeeRouter.get("/", (req, res) => {
    res.status(200).json(employees);
});
// Add employee
employeeRouter.post("/", (req, res) => {
    const { fname, lname, age, isMarried } = req.body;
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        fname,
        lname,
        age,
        isMarried,
    };
    employees.push(newEmployee);
    res.status(201).send("Employee added succesfully");
});
// Search  # Search employees by firstname using query parameter
employeeRouter.get("/search", (req, res) => {
    const { name } = req.query;
    const personsFound = employees.filter(employee => employee.fname.toLowerCase().includes(name.toLowerCase()));
    if (personsFound.length === 0) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).json(personsFound);
});
//  # Get one employee by ID
employeeRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const indexFound = employees.findIndex(employee => employee.id === id);
    if (indexFound === -1) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).json(employees[indexFound]);
});
// # Update employee by ID
employeeRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const findIndex = employees.findIndex(employee => employee.id === id);
    if (findIndex === -1) {
        res.status(404).send("Employee not found");
        return;
    }
    const updatedEmployee = Object.assign(Object.assign({}, employees[findIndex]), { fname: (_a = req.body.fname) !== null && _a !== void 0 ? _a : employees[findIndex].fname, lname: (_b = req.body.lname) !== null && _b !== void 0 ? _b : employees[findIndex].lname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[findIndex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[findIndex].isMarried });
    employees[findIndex] = updatedEmployee;
    res.status(200).send("Employee updated");
});
//  # Delete employee by ID
employeeRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const findIndex = employees.findIndex(employee => employee.id === id);
    if (findIndex === -1) {
        res.status(404).send("Employee not found");
        return;
    }
    employees.splice(findIndex, 1);
    res.status(200).send("Employee deleted");
});
exports.default = employeeRouter;
