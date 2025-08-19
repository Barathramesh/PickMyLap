import React from 'react'
import Searchbar from '../components/Searchbar'
import LatestUpd from '../components/LatestUpd'
import Footer from '../components/Footer'
import Brandwise from '../components/Brandwise'

const Home = () => {
  return (
    <div className="scrollbar-hide overflow-x-hidden">
      <Searchbar />
      <LatestUpd />  
      <Brandwise />
      <Footer />
    </div>
  )
}

export default Home