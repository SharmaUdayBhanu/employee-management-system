const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data (replace with DB in production)
let employees = [
  // Paste your employees array from localStorage.jsx here
];
let admin = [
  // Paste your admin array from localStorage.jsx here
];

// Get all employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// Get single employee by email
app.get("/api/employees/:email", (req, res) => {
  const emp = employees.find((e) => e.email === req.params.email);
  if (emp) res.json(emp);
  else res.status(404).json({ error: "Not found" });
});

// Update employee (tasks, counts, etc)
app.put("/api/employees/:email", (req, res) => {
  const idx = employees.findIndex((e) => e.email === req.params.email);
  if (idx !== -1) {
    employees[idx] = { ...employees[idx], ...req.body };
    res.json(employees[idx]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Add new task to employee
app.post("/api/employees/:email/tasks", (req, res) => {
  const idx = employees.findIndex((e) => e.email === req.params.email);
  if (idx !== -1) {
    employees[idx].tasks.push(req.body);
    res.json(employees[idx]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Admin login (simple)
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const found = admin.find((a) => a.email === email && a.password === password);
  if (found) res.json({ success: true });
  else res.status(401).json({ error: "Invalid credentials" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
