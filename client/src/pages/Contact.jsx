import React from 'react'
import Footer from '../components/Footer'
import LongCard from '../components/LongCard.jsx'
import { laptops } from '../components/LaptopData.jsx'
import Contactcomp from '../components/Contactcomp.jsx'
const Contact = () => {
  return (
    <div>
      <div className='flex w-full mt-4 gap-15'>
          <div className="relative">
  <img
    src="https://images.unsplash.com/photo-1622118757715-90fc40a1d68f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
    alt=""
    className="h-[35rem] w-[47rem] rounded-lg object-cover"
  />

  <h1 className="absolute top-1/3 left-1/3 text-pink-300 text-6xl font-bold drop-shadow-lg">
    Find Your <br /> Own PC.
  </h1>
</div>

          
        
        <div><Contactcomp/></div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Contact
