import React from 'react'
import Card from './Card'
import { laptops } from './LaptopData.jsx'

const LatestUpd = () => {
  return (
    <div>
      <div>
        <p className='text-center p-3 mt-5 mb-5 font-bold text-lg'>New Launches</p>
      </div>
      <div className="grid gap-10 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      xl:grid-cols-5    ">
        {laptops.slice(6, 11).map((laptop) => (
          <Card
            key={laptop.id}
            name={laptop.name}
            rating={laptop.rating.toFixed(1)}
            price={laptop.price}
            image={laptop.image}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestUpd
