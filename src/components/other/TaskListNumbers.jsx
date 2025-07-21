import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='grid grid-cols-2 md:flex md:justify-between gap-3 md:gap-5 mt-10'>
      <div className="py-4 px-4 md:py-6 md:px-9 w-full bg-red-400 rounded-xl flex flex-col items-center">
        <h2 className='text-2xl md:text-3xl font-semibold'>{data.taskCounts.newTask}</h2>
        <h3 className='text-lg md:text-xl font-medium'>New Task</h3>
      </div>
      <div className="py-4 px-4 md:py-6 md:px-9 w-full bg-blue-400 rounded-xl flex flex-col items-center">
        <h2 className='text-2xl md:text-3xl font-semibold'>{data.taskCounts.completed}</h2>
        <h3 className='text-lg md:text-xl font-medium'>Completed Task</h3>
      </div>
      <div className="py-4 px-4 md:py-6 md:px-9 w-full bg-green-400 rounded-xl flex flex-col items-center">
        <h2 className='text-2xl md:text-3xl font-semibold'>{data.taskCounts.active}</h2>
        <h3 className='text-lg md:text-xl font-medium'>Accepted Task</h3>
      </div>
      <div className="py-4 px-4 md:py-6 md:px-9 w-full bg-amber-300 rounded-xl flex flex-col items-center">
        <h2 className='text-2xl md:text-3xl font-semibold'>{data.taskCounts.failed}</h2>
        <h3 className='text-lg md:text-xl font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumbers