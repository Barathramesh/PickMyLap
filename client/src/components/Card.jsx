import React from 'react';
import laptop from '../assets/laptop.png';

const Card = ({ name, rating, price, image }) => {
  return (
    <div className="p-2 w-100 active:scale-95">
      <div className="max-w-[250px] h-[300px] bg-white border border-gray-300 rounded-lg
                      transform transition duration-300 
                      hover:scale-105 hover:cursor-pointer shadow-md"> 
        <div className='h-45 flex justify-center items-center'> <img 
          src={image || laptop}  // fallback to default image
          alt={name} 
          className="w-60 h-40 rounded-t-lg" 
        />                                                  </div>
        

        <div className="p-3 pb-1 font-semibold text-lg">{name}</div>
        <div className="px-3 pb-1 text-gray-600">★{rating}</div>
        <div className="px-3 pb-3 text-gray-800">
          <span className="font-bold">₹{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
