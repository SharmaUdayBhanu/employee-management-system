import React from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';

const CreateTask = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset  
  } = useForm();

  const onSubmit = (data) => {
    // Format the new task according to your structure
    const newTask = {
      active: true,
      newTask: true,
      completed: false,
      failed: false,
      taskTitle: data.title,
      taskDescription: data.description,
      taskDate: data.date,
      category: data.category
    };

    // Get current employees from localStorage
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    // Find the employee being assigned the task
    const employeeIndex = employees.findIndex(emp => 
      emp.firstName.toLowerCase() === data.assignee.toLowerCase()
    );

    if (employeeIndex !== -1) {
      // Update the employee's tasks and taskCounts
      const updatedEmployee = {
        ...employees[employeeIndex],
        tasks: [...employees[employeeIndex].tasks, newTask],
        taskCounts: {
          ...employees[employeeIndex].taskCounts,
          active: employees[employeeIndex].taskCounts.active + 1,
          newTask: employees[employeeIndex].taskCounts.newTask + 1
        }
      };

      // Update the employees array
      const updatedEmployees = [...employees];
      updatedEmployees[employeeIndex] = updatedEmployee;

      // Save back to localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      alert('Task created successfully!');
      reset();
    } else {
      alert('Employee not found!');
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <button className="rounded-full bg-black p-2 mr-2">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Task</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1">Task Title*</label>
            <input
              {...register("title", { required: "Task title is required" })}
              type="text"
              placeholder="Make a UI design"
              className="w-full bg-transparent border border-gray-400 rounded px-3 py-2 placeholder-gray-400"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Date*</label>
            <input
              {...register("date", { required: "Date is required" })}
              type="date"
              className="w-full bg-transparent border border-gray-400 rounded px-3 py-2 text-white"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Assign to*</label>
            <input
              {...register("assignee", { required: "Assignee is required" })}
              type="text"
              placeholder="employee name"
              className="w-full bg-transparent border border-gray-400 rounded px-3 py-2 placeholder-gray-400"
            />
            {errors.assignee && <p className="text-red-500 text-sm mt-1">{errors.assignee.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Category*</label>
            <input
              {...register("category", { required: "Category is required" })}
              type="text"
              placeholder="design, dev, etc"
              className="w-full bg-transparent border border-gray-400 rounded px-3 py-2 placeholder-gray-400"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="Detailed description of task"
              className="w-full h-40 bg-transparent border border-gray-400 rounded px-3 py-2 placeholder-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded mt-6 hover:bg-green-600 transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTask;