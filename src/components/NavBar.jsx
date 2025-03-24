import React from 'react'
import { FaTasks } from "react-icons/fa";


const NavBar = () => {
  return (
    <div
      className=' bg-violet-400 py-5'>
      <nav className='flex justify-between mx-5'>
        <div>
          <span className='font-bold text-center'>Tasker</span>
        </div>
        <ul className='flex gap-5 mx-5'>
          <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
