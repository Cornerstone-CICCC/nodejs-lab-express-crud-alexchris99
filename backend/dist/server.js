"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
dotenv_1.default.config();
// create an instance fro the sever
const app = (0, express_1.default)();
// allow the app recive json 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Router
app.use("/employees", employee_routes_1.default);
// create the listen and the port
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
