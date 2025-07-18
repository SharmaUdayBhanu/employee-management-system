import React, { useContext } from 'react'
import {AuthContext} from '../../context/AuthProvider'; 
const AllTask = () => {
  const authData = useContext(AuthContext);
  console.log(authData)
  return (<>
    <div className="bg-[#1c1c1c] p-2 mt-10 h-55 rounded-xl">
    <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded-sm">
        <h2 className='w-1/5'>Employee Name</h2>
        <h3 className='w-1/5'>New Task</h3>
        <h5 className='w-1/5'>Active Task</h5>
        <h5 className='w-1/5'>completed Task</h5>
        <h5 className='w-1/5'>Failed Task</h5>
      </div>
      <div className="h-[80%] overflow-y-auto scroll-smooth snap-y snap-mandatory"> {/* ONLY CHANGED THIS LINE */}
      {authData.employees.map(function(elem , idx){
        return <div className="border-2 border-amber-100 mb-2 py-2 px-4 flex justify-between rounded-sm snap-start" key={idx}> {/* ADDED snap-start */}
        <h2 className='w-1/4 text-lg'>{elem.firstName}</h2>
        <h3 className='w-1/4 text-lg text-blue-600'>{elem.taskCounts.newTask}</h3>
        <h3 className='w-1/5 text-lg text-yellow-400'>{elem.taskCounts.active}</h3>
        <h3 className='w-1/5 text-lg'>{elem.taskCounts.completed}</h3>
        <h5 className='w-1/5 text-lg text-red-500'>{elem.taskCounts.failed}</h5>
      </div>
      })}
    </div>
    </div>
    
    </>
  )
}

export default AllTask