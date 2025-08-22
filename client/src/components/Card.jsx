import React from 'react'

const Card = ({name,rating,price,image}) => {
  return (
    <div className="p-2 w-full">
      <div className="max-w-[250px] h-75 bg-white border border-gray-300 rounded-lg
                      transform transition duration-300 
                      hover:scale-105 hover:cursor-pointer shadow-md hover:bg-gradient-to-tr from-gray-200 to-blue-00">
        
        <img 
          src={"laptop.png"} // adjust path if needed
          alt="Laptop" 
          className="w-full h-40 rounded-t-lg object-cover" 
        />

        <div className="p-3 pb-1 font-semibold text-lg">{name}</div>
        <div className="px-3 pb-1 text--600">★{rating}</div>
        <div className="px-3 pb-3 text-gray-800">
          <span className="font-bold">₹{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
