import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend build
import path from "path";
app.use(express.static(path.join(process.cwd(), "backend", "dist")));

// Fallback to index.html for SPA routes (after API routes)

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI, fallback to localhost for local dev
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/jobportal"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Schemas
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

// Models
const Employee = mongoose.model("Employee", employeeSchema);
const Admin = mongoose.model("Admin", adminSchema);

// API Endpoints

// Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single employee by email
app.get("/api/employees/:email", async (req, res) => {
  try {
    const emp = await Employee.findOne({ email: req.params.email });
    if (emp) {
      res.json(emp);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update employee
app.put("/api/employees/:email", async (req, res) => {
  try {
    const emp = await Employee.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (emp) {
      res.json(emp);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new task to employee
app.post("/api/employees/:email/tasks", async (req, res) => {
  try {
    const emp = await Employee.findOne({ email: req.params.email });
    if (emp) {
      emp.tasks.push(req.body);
      await emp.save();
      res.json(emp);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const found = await Admin.findOne({ email, password });
    if (found) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
