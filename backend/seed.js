import mongoose from "mongoose";

// Simple connection without deprecated options
await mongoose.connect("mongodb://localhost:27017/jobportal");

// Your schema and model definitions
const taskSchema = new mongoose.Schema({ /* ... */ });
const employeeSchema = new mongoose.Schema({ /* ... */ });
const adminSchema = new mongoose.Schema({ /* ... */ });

const Employee = mongoose.model("Employee", employeeSchema);
const Admin = mongoose.model("Admin", adminSchema);

// Seed data
try {
  await Employee.deleteMany({});
  await Admin.deleteMany({});
  
  await Employee.insertMany([ /* your employee data */ ]);
  await Admin.insertMany([ /* your admin data */ ]);
  
  console.log("Database seeded successfully!");
} catch (error) {
  console.error("Seeding failed:", error);
} finally {
  await mongoose.disconnect();
  process.exit();
}