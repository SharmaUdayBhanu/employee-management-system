import React from 'react'

const Header = () => {
  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-3xl font-bold text-white'>Hello,<br /><span className='text-4xl'>Bhanu Uday</span> 👋</h1>
      <button className='bg-red-500 rounded-2xl p-3 font-bold'>Log Out</button>
    </div>
  )
}

export default Header