import React from 'react'
import Searchbar from '../components/Searchbar'
import LatestUpd from '../components/LatestUpd'
import Footer from '../components/Footer'
import Brandwise from '../components/Brandwise'
import ChatbotSpace from '../components/ChatbotSpace'
import srchbg from '../assets/srchbg.jpg'

const Home = () => {
  return (
    <div >
<div
  className="scrollbar-hide h-80 overflow-x-hidden bg-cover bg-center rounded-[50px] flex flex-col items-center justify-center space-y-6"
  style={{ backgroundImage: `url(${srchbg})` }}
>  <h1 className="text-white font-bold text-7xl text-center mix-blend-difference">
    Ask AI to get your OWN Laptop.
  </h1>
  <Searchbar />
</div>
      
      <LatestUpd />  
      <Brandwise />
      <ChatbotSpace/>
      <Footer />
    </div>
  )
}

export default Home