import React from 'react'
import Hp from '../assets/hp.png' 
import Asus from '../assets/asus.png'
import Dell from '../assets/dell.png'
import Lenovo from '../assets/lenovo.svg'
import Apple from '../assets/apple-logo.png' 
import Acer from '../assets/acer.png'
import Samsung from '../assets/samsung.png'
import msi from '../assets/msi.png' 

const Brandwise = () => {
  return (
    <div className="px-4 py-5">
      <h2 className="text-xl font-bold mb-4 text-center">Top Brands</h2>
       
      <div className="flex justify-around gap-10 overflow-x-auto scrollbar-hide  w-full py-7 ">
        {[Hp, Asus, Lenovo, Dell, Apple, Samsung, Acer, msi,msi,msi,msi].map((logo, index) => (
          <div
            key={index}
            className="min-w-[160px] h-[160px] flex-shrink-0 flex items-center justify-center bg-white rounded-lg shadow 
                       hover:scale-108 hover:cursor-pointer shadow-md transform transition duration-300 
                       border border-gray-300 hover:bg-gradient-to-tr from-gray-200 to-blue-00"
          >
            <img
              src={logo}
              alt="Brand"
              className={index === 2 ? "h-20 w-30" : "h-20 w-auto"}
            />
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brandwise
