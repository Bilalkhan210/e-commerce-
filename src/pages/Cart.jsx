import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
const Cart = () => {

  const { products, currency, cartItems,UpdateQuantity,navigate } = useContext(ShopContext)

  // ✅ Always array
  const [cartData, setCartData] = useState([])

  // ✅ Convert object → array
  useEffect(() => {
    const tempData = []

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {

        const quantity = cartItems[productId][size]

        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: quantity
          })
        }
      }
    }

    setCartData(tempData)

  }, [cartItems])

  return (
    <div className='border-t pt-14'>

      {/* Title */}
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div>

        {cartData.length === 0 ? (
          <p className='text-gray-500'>Your cart is empty</p>
        ) : (

          cartData.map((item) => {

            const productData = products.find(
              (product) => product._id === item._id
            )

            // ✅ Safety check
            if (!productData) return null

            return (
              <div
                key={item._id}
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[4fr_2fr_1fr] items-center gap-4'
              >

                {/* Product Info */}
                <div className='flex items-start gap-6'>
                  <img
                    className='w-16 sm:w-20'
                    src={productData.image?.[0]}
                    alt={productData.name}
                  />

                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>

                    <div className='flex items-center gap-5 mt-2 text-sm text-gray-500'>
                      <p>{currency}{productData.price}</p>
                      <p >Size: {item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                
                  <input
                  onChange={(e)=>e.target.value === "" || e.target.value === "0" ? null: UpdateQuantity(item._id,item.size,Number(e.target.value))}
                  type="number" defaultValue={item.quantity} 
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  min={1} />
                  <img onClick={()=>UpdateQuantity(item._id,item.size , 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer'/>
                

               
                

              </div>
            )
          })

        )}

      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/placeorder')} className='bg-black text-white text-sm px-8 py-3 my-8'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart