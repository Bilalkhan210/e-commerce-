import React from 'react'
import { useContext } from 'react'  
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
const CartTotal = () => {
    const { currency, getCountAmount,delivery_fee } = useContext(ShopContext)
  return (
    <div className="w-full">
        <div className='text-2xl '>
            <Title text1={'CART'} text2={'TOTAL'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{getCountAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Shipping</b>
                <b>{currency}{getCountAmount() === 0 ? 0 :getCountAmount() + delivery_fee}.00</b>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal
