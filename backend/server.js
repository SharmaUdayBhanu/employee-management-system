import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jobportal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// 2. Define Schemas and Models
const taskSchema = new mongoose.Schema({
  active: Boolean,
  newTask: Boolean,
  completed: Boolean,
  failed: Boolean,
  taskTitle: String,
  taskDescription: String,
  taskDate: String,
  category: String,
});

const employeeSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  taskCounts: {
    active: Number,
    newTask: Number,
    completed: Number,
    failed: Number,
  },
  tasks: [taskSchema],
});

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Employee = mongoose.model("Employee", employeeSchema);
const Admin = mongoose.model("Admin", adminSchema);

// 3. API Endpoints

// Get all employees
app.get("/api/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Get single employee by email
app.get("/api/employees/:email", async (req, res) => {
  const emp = await Employee.findOne({ email: req.params.email });
  if (emp) res.json(emp);
  else res.status(404).json({ error: "Not found" });
});

// Update employee (tasks, counts, etc)
app.put("/api/employees/:email", async (req, res) => {
  const emp = await Employee.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true }
  );
  if (emp) res.json(emp);
  else res.status(404).json({ error: "Not found" });
});

// Add new task to employee
app.post("/api/employees/:email/tasks", async (req, res) => {
  const emp = await Employee.findOne({ email: req.params.email });
  if (emp) {
    emp.tasks.push(req.body);
    await emp.save();
    res.json(emp);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const found = await Admin.findOne({ email, password });
  if (found) res.json({ success: true });
  else res.status(401).json({ error: "Invalid credentials" });
});

// 4. Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));