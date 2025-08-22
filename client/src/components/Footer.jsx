import React from 'react'
import Yt from '../assets/yticon.svg'
import X from '../assets/xicon.svg'
import Ins from '../assets/insta.svg'
import Fb from '../assets/fb.svg'
import Tel from '../assets/telegram.svg'
import Git from '../assets/github.svg'




const Footer = () => {
  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 ">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 
                        border-b border-gray-500/30 border-t border-gray-500/30 pb-6 pt-6 ">
          <div className="md:max-w-96 ">
            <img src="navlogo.png" alt="logo" className="h-10 mb-4 filter grayscale" />
            <p className="mt-6 text-sm">
              PickMyLap helps you choose the perfect laptop based on your needs,
               whether it's for gaming, coding, or casual use. Our AI-powered suggestions
                and comparisons make decision-making fast and easy. Explore top-rated models 
                and stay updated with the latest releases — all in one place.
            </p>
          </div>

          {/* NEW SECTION ADDED HERE */}
          <div className="flex flex-col gap-3 justify-center items-start">
            <h2 className="font-semibold mb-4 text-gray-800">Connect with us</h2>
            <div className="flex gap-4">
              <a href="#"><img src={Yt} alt="Youtube" className="h-6 hover:scale-110 transition" /></a>
              <a href="#"><img src={X} alt="Twitter" className="h-6 hover:scale-110 transition" /></a>
              <a href="#"><img src={Ins} alt="Instagram" className="h-6 hover:scale-110 transition" /></a>
              <a href="#"><img src={Fb} alt="Facebook" className="h-6 hover:scale-110 transition" /></a>
              <a href="#"><img src={Tel} alt="Telegram" className="h-6 hover:scale-110 transition" /></a>
              <a href="#"><img src={Git} alt="GitHub" className="h-6 hover:scale-110 transition" /></a>
            </div>
          </div>

          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p>+91 9994814266</p>
                <p>pickmylapco@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © <a href="http://localhost:5174/">PickMyLap</a>. All Right Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
