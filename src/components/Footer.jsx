import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='w-32 mb-5' alt=''/>
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur inventore excepturi eligendi suscipit ad. Veritatis ipsam atque, at molestias amet saepe quibusdam. Iusto ea, quia quo earum maxime vero suscipit.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+923164881288</li>
                    <li>bilalkhan2107007@gmail.com</li>
                    
                </ul>
            </div>
        </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
            Copyright 2026@ Bilal khan - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer

