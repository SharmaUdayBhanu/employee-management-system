import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS and Body Parser
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/jobportal")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schemas
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

// API Routes

// Get all employees
app.get("/api/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Get employee by email
app.get("/api/employees/:email", async (req, res) => {
  const emp = await Employee.findOne({ email: req.params.email });
  if (emp) res.json(emp);
  else res.status(404).json({ error: "Not found" });
});

// Update employee
app.put("/api/employees/:email", async (req, res) => {
  const emp = await Employee.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true }
  );
  if (emp) res.json(emp);
  else res.status(404).json({ error: "Not found" });
});

// Add task
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


// ---------------------- SERVE FRONTEND BUILD ----------------------

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, "..", "dist")));

// Fallback route to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// ---------------------- START SERVER ----------------------

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
